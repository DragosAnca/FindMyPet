namespace FindMyPet.Models
{
    public class FindMyPetDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string AnnCollectionName { get; set; } = null!;
    }
}
