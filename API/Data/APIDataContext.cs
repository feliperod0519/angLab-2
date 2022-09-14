using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data{
    public class APIDataContext : DbContext
    {
        public APIDataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}