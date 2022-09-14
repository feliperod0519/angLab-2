namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string EMail { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime CreationDateTime { get; set; }

    }
}