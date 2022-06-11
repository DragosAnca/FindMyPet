using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Models;
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


        public FormController(IFormService formService) =>
            this.formService = formService;

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

        [HttpGet("email/{Email}")]
        public async Task<List<FormModel>> GetByEmail(string email) => await formService.GetAsyncByEmail(email);

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
