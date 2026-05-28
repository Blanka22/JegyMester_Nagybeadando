using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JegyMester.API.Data;
using JegyMester.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using JegyMester.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace JegyMester.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public TicketController(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("buy")]
        public async Task<IActionResult> BuyTicket(BuyTicketDto dto)
        {
            var screening = await _context.Screenings
                .Include(s => s.Tickets)
                .FirstOrDefaultAsync(s => s.Id == dto.ScreeningId);

            if (screening == null)
                return NotFound("Screening not found");

            // ülés foglalt?
            if (screening.Tickets.Any(t => t.SeatNumber == dto.SeatNumber))
                return BadRequest("Seat already taken");

            var user = await _userManager.GetUserAsync(User);

            var ticket = new Ticket
            {
                ScreeningId = dto.ScreeningId,
                SeatNumber = dto.SeatNumber,
                PurchaseDate = DateTime.Now,
                PurchaseTime = DateTime.Now,
                IsCancelled = false,
                UserId = user?.Id,
                GuestEmail = user == null ? dto.GuestEmail : "",
                GuestPhone = user == null ? dto.GuestPhone : ""
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                ticket.Id,
                ticket.ScreeningId,
                ticket.SeatNumber,
                ticket.PurchaseDate,
                ticket.UserId,
                ticket.GuestEmail,
                ticket.GuestPhone
            });
        }
        [Authorize]
        [HttpGet("mytickets")]
        public async Task<IActionResult> MyTickets()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized("Nincs bejelentkezett felhasználó.");

            var tickets = await _context.Tickets
                .Include(t => t.Screening)
                .ThenInclude(s => s.Movie)
                .Where(t => t.UserId == user.Id)
                .ToListAsync();

            return Ok(tickets.Select(t => new
            {
                t.Id,
                t.SeatNumber,
                t.PurchaseDate,
                Screening = new
                {
                    t.Screening.Id,
                    t.Screening.StartTime,
                    t.Screening.Hall,
                    Movie = new
                    {
                        t.Screening.Movie.Id,
                        t.Screening.Movie.Title,
                        t.Screening.Movie.Description
                    }
                }
            }));
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Screening)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
                return NotFound("Ticket not found");

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized("Nincs bejelentkezett felhasználó.");

            if (ticket.UserId != user.Id)
                return Unauthorized("Ez nem a te jegyed.");

            var hoursLeft = ticket.Screening.StartTime - DateTime.Now;

            if (hoursLeft.TotalHours < 4)
                return BadRequest("A jegy már nem törölhető, mert kevesebb mint 4 óra van a vetítésig.");

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok("Jegy sikeresen törölve.");
        }
        [Authorize(Roles = "Cashier")]
        [HttpPost("validate/{id}")]
        public async Task<IActionResult> ValidateTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
                return NotFound();

            if (ticket.IsUsed)
                return BadRequest("Already used");

            ticket.IsUsed = true;

            await _context.SaveChangesAsync();

            return Ok("Ticket validated");
        }
    }
}
