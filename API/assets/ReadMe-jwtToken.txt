nuget gallery
(don't forget to add Token Service in startup.cs as Scoped)
System.IdentityModel.Tokens.Jwt

public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

appsettings.json (Configurations)

nuget gallery
System.AspNetCore.Authentication.JwtBearer