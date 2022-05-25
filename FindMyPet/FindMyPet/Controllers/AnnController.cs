using FindMyPet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FindMyPet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnController : ControllerBase
    {
        private readonly AnnService annService;


        public AnnController(AnnService annService) =>
            this.annService = annService;

        [HttpGet]
        public async Task<List<Ann>> Get() =>
            await annService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Ann>> Get(string id)
        {
            var ann = await annService.GetAsync(id);

            if (ann is null)
            {
                return NotFound();
            }

            return ann;
        }

        // [HttpPost]
        // public async Task<IActionResult> Post(Ann newAnn)
        // {
        //     await annService.CreateAsync(newAnn);
        //
        //     return CreatedAtAction(nameof(Get), new {id = newAnn.Id}, newAnn);
        // }

    }
}
