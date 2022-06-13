using System.Collections;
using System.Threading.Tasks;
using EmailService;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPetServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public EmailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task<Message> Get()
        {
            var message = new Message(new string[] { "anca.dragos.00@gmail.com" }, "Test email async", "This is the content from our async email.");
            await _emailSender.SendEmailAsync(message);

            return message;
        }
    }
}
