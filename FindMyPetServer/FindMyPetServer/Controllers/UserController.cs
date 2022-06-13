using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailService;
using FindMyPetServer.DTOs;
using FindMyPetServer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace FindMyPetServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IEmailSender emailSender;
        //DI
        public UserController(IUserService userService, IEmailSender emailSender)
        {
            this.userService = userService;
            this.emailSender = emailSender;
        }

        
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return userService.GetUsers();
        }

        [HttpGet("{username}")]
        public ActionResult<User> GetUser(string username)
        {
            var user = userService.GetUser(username);

            return Json(user);
        }

        //TODO  Update user endpoint

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public ActionResult<User> Register(User newUser)
        {
            
                if (!(userService.GetUsers().FirstOrDefault(x => x.Equals(newUser)) is null))
                {
                    return Conflict("Email already registered");
                }
            
            userService.Create(newUser);

            return Json(newUser);
        }

        [AllowAnonymous]
        [Route("forgot/{email}")]
        [HttpGet]
        public ActionResult ForgotPassword(string email)
        {
            var message = new Message(new string[] { "anca.dragos.00@gmail.com" }, "FindMyPet Password", userService.GetUserByEmail(email).Password);
            this.emailSender.SendEmailAsync(message);

            return Conflict("done");

        }

        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public ActionResult Login( [FromBody] User user)
        {
            var token = userService.Authenticate(user.Username, user.Password);

            if (token == null)
                return Conflict("Username or password incorrect");

            // if ((userService.GetUsers().FirstOrDefault(x => x.Password.Equals(user.Password)) is null))
            // {
            //     return Conflict("password incorrect");
            // }

            return Ok(new {token, user});
        }

        // [HttpPost("ForgotPassword")]
        // public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest();
        //     var user = this.userService.GetUser(forgotPasswordDto.Email);
        //     if (user == null)
        //         return BadRequest("Invalid Request");
        //     var token = await this.userManager.GeneratePasswordResetTokenAsync(user);
        //     var param = new Dictionary<string, string?>
        //     {
        //         {"token", token },
        //         {"email", forgotPasswordDto.Email }
        //     };
        //     var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
        //     var message = new Message(new string[] { user.Email }, "Reset password token", callback);
        //     await this.emailSender.SendEmailAsync(message);
        //
        //     return Ok();
        // }
    }
}
