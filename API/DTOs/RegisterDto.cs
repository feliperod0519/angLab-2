using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [MaxLength(20),MinLength(5)]
        public string password { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string profilePhoto { get; set; }

    }
}