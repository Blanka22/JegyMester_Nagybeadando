using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JegyMester.API.Data;
using JegyMester.API.Models;
using Microsoft.AspNetCore.Authorization;


namespace JegyMester.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScreeningController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetScreenings()
        {
            return Ok(_context.Screenings.ToList());
        }
       // [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult AddScreening(Screening screening)
        {
            _context.Screenings.Add(screening);
            _context.SaveChanges();

            return Ok(screening);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateScreening(int id, Screening screening)
        {
            var existing = _context.Screenings.Find(id);

            if (existing == null)
                return NotFound();

            existing.StartTime = screening.StartTime;
            existing.Hall = screening.Hall;
            existing.TotalSeats = screening.TotalSeats;

            _context.SaveChanges();

            return Ok(existing);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteScreening(int id)
        {
            var screening = _context.Screenings.Find(id);

            if (screening == null)
                return NotFound();

            _context.Screenings.Remove(screening);

            _context.SaveChanges();

            return Ok();
        }
    }
}
