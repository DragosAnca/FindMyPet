﻿using FindMyPetServer.Models;

namespace FindMyPetServer.Utils
{
    public interface IJwtUtils
    {
        public string? ValidateToken(string token);
    }
}
