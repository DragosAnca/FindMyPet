namespace FindMyPet.Models
{
    public class FindMyPetDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string FormCollectionName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;

    }
}

