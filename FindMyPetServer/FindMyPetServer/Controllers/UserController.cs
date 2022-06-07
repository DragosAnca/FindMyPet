using System.Collections.Generic;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPetServer.Controllers
{
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

        [Authorize]
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

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            userService.Create(user);

            return Json(user);
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login( [FromBody] User user)
        {
            var token = userService.Authenticate(user.Email, user.Password);

            if (token == null)
                return Unauthorized();
            return Ok(new {token, user});
        }
    }
}
