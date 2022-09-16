using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LogDto
    {
        [Required]
        [EmailAddress]
        public string EMail { get; set; }

        [Required]
        public int Type{ get; set; }

        public string Message { get; set; }
    }
}