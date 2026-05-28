using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using JegyMester.API.Models;
using System.Threading.Tasks;

namespace JegyMester.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(RegisterDto model)
        {
            var user = await _userManager.GetUserAsync(User);

            user.Email = model.Email;
            user.PhoneNumber = model.Phone;
            user.FullName = model.FullName;

            await _userManager.UpdateAsync(user);

            return Ok(user);
        }
    }
}