using System.Collections.Generic;
using FindMyPetServer.DTOs;

namespace FindMyPetServer.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(string username);
        User GetUserByEmail(string email);
        User Create(User user);
        string Authenticate(string email, string password);
    }
}
