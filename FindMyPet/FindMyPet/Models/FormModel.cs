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
        public string lostOrFoundPet { get; set; }

        [BsonElement(elementName:"species")]
        public string species { get; set; }

        [BsonElement(elementName:"breed")]
        public string breed { get; set; }

        [BsonElement(elementName:"name")]
        public string name { get; set; }

        [BsonElement(elementName: "accessories")]
        public string accessories { get; set; }

        [BsonElement(elementName: "color")]
        public string color { get; set; }

        [BsonElement(elementName: "sized")]
        public string sized { get; set; }

        [BsonElement(elementName: "chip")]
        public string chip { get; set; }

        [BsonElement(elementName: "semne")]
        public string semne { get; set; }

        [BsonElement(elementName: "poze")]
        public string poze { get; set; }

        [BsonElement(elementName: "coordonate")]
        public string coordonate { get; set; }


        [BsonElement(elementName: "emailContact")]
        public string emailContact { get; set; }

        [BsonElement(elementName: "telefon")]
        public int telefonContact { get; set; }

    }
}