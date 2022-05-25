using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FindMyPet.Models

{
    public class Ann
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("AnnId")]
        public int annId { get; set; }
        [BsonElement("AnnName")]
        public string name { get; set; }
    }
}