using System.Text;
using System.Configuration;
using FindMyPet;
using FindMyPet.Interfaces;
using FindMyPet.Models;
using FindMyPet.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<FindMyPetDatabaseSettings>(
    builder.Configuration.GetSection("FindMyPetDatabase"));

builder.Services.AddSingleton<FormService>();
builder.Services.AddSingleton<UserService>();
//Injecting Services DI
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
// builder.Services.AddAuthentication(x =>
// {
//     x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(x =>
// {
//     x.RequireHttpsMetadata = false;
//     x.SaveToken = true;
//     x.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuerSigningKey = true,
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("Secret")).ToString()),
//         ValidateIssuer = false,
//         ValidateAudience = false,
//     };
// });

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
