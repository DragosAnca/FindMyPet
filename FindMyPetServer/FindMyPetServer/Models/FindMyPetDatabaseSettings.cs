﻿using FindMyPetServer.Interfaces;

namespace FindMyPetServer.Models
{
    public class FindMyPetDatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string FormCollectionName { get; set; }
        public string UserCollectionName { get; set; }

        

    }
}
