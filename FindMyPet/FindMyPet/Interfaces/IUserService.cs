using FindMyPet.Models;

namespace FindMyPet.Interfaces;

public interface IUserService
{
    List<User> GetUsers();
    User GetUser(string id);
    User Create(User user);
}