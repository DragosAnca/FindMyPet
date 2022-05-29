using FindMyPet.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FindMyPet
{
    public class FormService 
    {
        private readonly IMongoCollection<FormModel> formCollection;

        public FormService(
            IOptions<FindMyPetDatabaseSettings> findMyPetDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                findMyPetDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                findMyPetDatabaseSettings.Value.DatabaseName);

            formCollection = mongoDatabase.GetCollection<FormModel>(
                findMyPetDatabaseSettings.Value.FormCollectionName);
        }

        public async Task<List<FormModel>> GetAsync() =>
            await formCollection.Find(_ => true).ToListAsync();

        public async Task<FormModel?> GetAsync(string id) =>
            await formCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(FormModel newForm) =>
            await formCollection.InsertOneAsync(newForm);

        public async Task UpdateAsync(string id, FormModel updatedForm) =>
            await formCollection.ReplaceOneAsync(x => x.Id == id, updatedForm);

        public async Task RemoveAsync(string id) =>
            await formCollection.DeleteOneAsync(x => x.Id == id);
    }
}
