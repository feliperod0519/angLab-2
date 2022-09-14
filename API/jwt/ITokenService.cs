using API.Entities;

namespace API.jwt
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
    }
}