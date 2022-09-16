using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repositories
{
    public interface IUserRepository
    {
         void Update(AppUser user);

         Task<bool> SaveAllAsync();

         Task<IEnumerable<AppUser>> GetUsersAsync();

         Task<AppUser> GetUserByEmailAsync(string eMail);
    }
}