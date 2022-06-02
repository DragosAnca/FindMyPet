using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FindMyPet.Models

{
    public class FormModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement(elementName: "lostOrFoundPet")]
        public string LostOrFoundPet { get; set; }

        [BsonElement(elementName:"species")]
        public string Species { get; set; }

        [BsonElement(elementName:"breed")]
        public string Breed { get; set; }

        [BsonElement(elementName:"name")]
        public string Name { get; set; }

        [BsonElement(elementName: "accessories")]
        public string Accessories { get; set; }

        [BsonElement(elementName: "color")]
        public string Color { get; set; }

        [BsonElement(elementName: "sized")]
        public string Sized { get; set; }

        [BsonElement(elementName: "chip")]
        public string Chip { get; set; }

        [BsonElement(elementName: "marks")]
        public string Marks { get; set; }

        [BsonElement(elementName: "pic")]
        public string Pic { get; set; }

        [BsonElement(elementName: "coordonates")]
        public string Coordonates { get; set; }


        [BsonElement(elementName: "emailContact")]
        public string EmailContact { get; set; }

        [BsonElement(elementName: "phone")]
        public int Phone { get; set; }

    }
}