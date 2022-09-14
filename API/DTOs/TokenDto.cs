
namespace API.DTOs
{
    public class TokenJWTDto{
        public string email { get; set; }

        public string jwtToken { get; set; }

        public DateTime serverTime { get; set; }
    }
}