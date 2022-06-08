using System.Collections.Generic;
using System.Linq;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPetServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        //DI
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return userService.GetUsers();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<User> GetUser(string id)
        {
            var user = userService.GetUser(id);

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
        [Route("login")]
        [HttpPost]
        public ActionResult Login( [FromBody] User user)
        {
            var token = userService.Authenticate(user.Email, user.Password);

            if (token == null)
                return Conflict("Username or password incorrect");

            // if ((userService.GetUsers().FirstOrDefault(x => x.Password.Equals(user.Password)) is null))
            // {
            //     return Conflict("password incorrect");
            // }

            return Ok(new {token, user});
        }
    }
}
