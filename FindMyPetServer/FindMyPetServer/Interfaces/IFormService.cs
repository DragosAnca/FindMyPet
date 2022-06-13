using System.Collections.Generic;
using System.Threading.Tasks;
using FindMyPetServer.DTOs;

namespace FindMyPetServer.Interfaces
{
    public interface IFormService
    {
        Task<List<FormModel>> GetAsync();
        Task<FormModel?> GetAsync(string id);
        Task<List<FormModel?>> GetAsyncByUsername(string username);
        Task CreateAsync(FormModel newForm);
        Task UpdateAsync(string id, FormModel updatedForm);
        Task RemoveAsync(string id);
    }
}