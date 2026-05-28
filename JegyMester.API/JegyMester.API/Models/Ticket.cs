using System;

namespace JegyMester.API.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public int SeatNumber { get; set; }

        public DateTime PurchaseDate { get; set; } = DateTime.Now;

        public bool IsUsed { get; set; } = false;

        public int ScreeningId { get; set; }

        public Screening Screening { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public string GuestEmail { get; set; }

        public string GuestPhone { get; set; }

        public DateTime PurchaseTime { get; set; } = DateTime.Now;

        public bool IsCancelled { get; set; } = false;
    }
}