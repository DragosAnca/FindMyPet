using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FindMyPet.Interfaces;
using FindMyPet.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace FindMyPet.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> userCollection;

        private readonly string key;

        public UserService(
            IOptions<FindMyPetDatabaseSettings> findMyPetDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                findMyPetDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                findMyPetDatabaseSettings.Value.DatabaseName);

            userCollection = mongoDatabase.GetCollection<User>(
                findMyPetDatabaseSettings.Value.UserCollectionName);

        }

        public List<User> GetUsers() => userCollection.Find(userCollection => true).ToList();

        public User GetUser(string id) =>
            userCollection.Find<User>(userCollection => userCollection.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            userCollection.InsertOne(user);

            return user;
        }

        public string Authenticate(string username, string password)
        {
            var user = this.userCollection.Find(x => x.Username == username && x.Password == password).FirstOrDefault();
            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
        }
    }
}
