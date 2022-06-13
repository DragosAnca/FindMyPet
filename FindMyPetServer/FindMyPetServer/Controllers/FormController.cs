using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EmailService;
using FindMyPetServer.DTOs;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FindMyPetServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly IFormService formService;
        private readonly IEmailSender emailSender;


        public FormController(IFormService formService, IEmailSender emailSender)
        {
        
        this.formService = formService;
        this.emailSender = emailSender;
        }

        [HttpGet]
        public async Task<List<FormModel>> Get() =>
            await formService.GetAsync();


        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<FormModel>> GetById(string id)
        {
            var form = await formService.GetAsync(id);

            if (form is null)
            {
                return NotFound();
            }

            return form;
        }

        [HttpGet("username/{username}")]
        public async Task<List<FormModel>> GetByEmail(string username) => await formService.GetAsyncByUsername(username);


        [HttpPost("createform")]
        public async Task<IActionResult> Post(FormModel newForm)
        {
            Console.WriteLine("endpoint reached");
            await formService.CreateAsync(newForm);

            return CreatedAtAction(nameof(Get), new { id = newForm.Id }, newForm);

        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, FormModel updatedForm)
        {
            var form = await formService.GetAsync(id);

            if (form is null)
            {
                return NotFound();
            }

            updatedForm.Id = form.Id;

            await formService.UpdateAsync(id, updatedForm);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var form = await formService.GetAsync(id);

            if (form is null)
            {
                return NotFound();
            }

            await formService.RemoveAsync(id);

            return NoContent();
        }
    }
}
