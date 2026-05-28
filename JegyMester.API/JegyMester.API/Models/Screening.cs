using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyMester.API.Models
{
    public class Screening
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public DateTime StartTime { get; set; }
        public string Hall { get; set; }
        public int TotalSeats { get; set; }
        public string Room { get; set; }
        public int AvailableSeats { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public int Capacity { get; internal set; }
    }
}
