using System.Linq;
using System.Threading.Tasks;
using FindMyPetServer.Interfaces;
using FindMyPetServer.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace FindMyPetServer.Middleware
{
    public class JwtMiddleware
        {
            private readonly RequestDelegate _next;

            public JwtMiddleware(RequestDelegate next)
            {
                _next = next;
            }

            public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                var userEmail = jwtUtils.ValidateToken(token);
                if (userEmail != null)
                {
                    // attach user to context on successful jwt validation
                    context.Items["User"] = userService.GetUser(userEmail);
                }

                await _next(context);
            }
        }
    }