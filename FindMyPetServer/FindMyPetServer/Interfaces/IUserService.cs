using System.Collections.Generic;
using FindMyPetServer.Models;

namespace FindMyPetServer.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(string id);
        User Create(User user);
        string Authenticate(string email, string password);
    }
}
