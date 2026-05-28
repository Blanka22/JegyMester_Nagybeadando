using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyMester.API.DTOs
{
    public class BuyTicketDto
    {
        public int ScreeningId { get; set; }

        public int SeatNumber { get; set; }

        public string GuestEmail { get; set; }

        public string GuestPhone { get; set; }
    }
}
