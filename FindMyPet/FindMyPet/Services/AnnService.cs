using FindMyPet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FindMyPet.Controllers
{
    public class AnnService : ControllerBase
    {
        private readonly IMongoCollection<Ann> annCollection;

        public AnnService(
            IOptions<FindMyPetDatabaseSettings> findMyPetDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                findMyPetDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                findMyPetDatabaseSettings.Value.DatabaseName);

            annCollection = mongoDatabase.GetCollection<Ann>(
                findMyPetDatabaseSettings.Value.AnnCollectionName);
        }

        public async Task<List<Ann>> GetAsync() =>
            await annCollection.Find(_ => true).ToListAsync();

        public async Task<Ann?> GetAsync(string id) =>
            await annCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Ann newAnn) =>
            await annCollection.InsertOneAsync(newAnn);

        public async Task UpdateAsync(string id, Ann updatedBook) =>
            await annCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemoveAsync(string id) =>
            await annCollection.DeleteOneAsync(x => x.Id == id);
    }
}
