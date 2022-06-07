using FindMyPet.Interfaces;
using FindMyPet.Models;
using FindMyPet.Services;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPet.Controllers
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
    }
}
