using API.Data;
using API.Entities;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        APIDataContext _context;
        public UserRepository(APIDataContext context){
            _context = context;
        }
        public Task<AppUser> GetUserByEmailAsync(string eMail)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}