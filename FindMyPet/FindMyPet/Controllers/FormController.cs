using FindMyPet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly FormService formService;


        public FormController(FormService formService) =>
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

        [HttpGet("name/{Name}")]
        public async Task<ActionResult<FormModel>> GetByName(string name)
        {
            FormModel form = await formService.GetAsyncByName(name);

            if (form is null)
            {
                return NotFound();
            }

            return form;
        }

         [HttpPost]
        public async Task<IActionResult> Post(FormModel newForm)
        {
            await formService.CreateAsync(newForm);
        
            return CreatedAtAction(nameof(Get), new {id = newForm.Id}, newForm);
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
