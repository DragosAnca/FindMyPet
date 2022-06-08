using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace FindMyPetServer.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> userCollection;
        private readonly string key;
        private IConfiguration config;

        public UserService(
            IOptions<FindMyPetDatabaseSettings> findMyPetDatabaseSettings, IConfiguration config)
        {
            var mongoClient = new MongoClient(
                findMyPetDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                findMyPetDatabaseSettings.Value.DatabaseName);

            userCollection = mongoDatabase.GetCollection<User>(
                findMyPetDatabaseSettings.Value.UserCollectionName);
            this.config = config;

        }

        public List<User> GetUsers() => userCollection.Find(userCollection => true).ToList();

        public User GetUser(string email) =>
            userCollection.Find<User>(userCollection => userCollection.Email == email).FirstOrDefault();

        public User Create(User user)
        {
            userCollection.InsertOne(user);

            return user;
        }
        //TODO Update user service 
        public string Authenticate(string email, string password)
        {
            var user = this.userCollection.Find(x => x.Email == email && x.Password == password).FirstOrDefault();

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, email),
                }),
            
                Expires = DateTime.UtcNow.AddHours(1),
            
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Key"])),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }
    }
}
