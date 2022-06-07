namespace FindMyPetServer.Interfaces
{
    public interface IDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string FormCollectionName { get; set; }
        string UserCollectionName { get; set; }
    }
}