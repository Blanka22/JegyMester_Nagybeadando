using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyMester.API.Models
{
    public class RegisterDto
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string Phone { get; set; }

        public string FullName { get; set; }
    }
}
