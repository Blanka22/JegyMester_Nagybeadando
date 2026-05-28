using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyMester.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; }

    }
}
