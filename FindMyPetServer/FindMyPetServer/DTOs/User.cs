using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FindMyPetServer.DTOs
{
    public class User : IComparable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        public override bool Equals(object obj)
        {
            if (!(obj is User))
            {
                return false;
            }

            return (this.Email == ((User) obj).Email);
        }

        public int CompareTo(object user)
        {
            if (user is null)
            {
                return 1;
            }

            if (!(user is User))
            {
                throw new ArgumentException();
            }

            if (this.Equals(user))
            {
                return 0;
            }

            string emailToBeCompared = Email;

            return emailToBeCompared.CompareTo(((User) user).Email);

        }
    }
}
