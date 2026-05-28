using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyMester.API.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; } 
        public int Duration { get; set; }
        public string AgeRating { get; set; }
        public ICollection<Screening> Screenings { get; set; }
    }
}
