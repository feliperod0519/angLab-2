using API.Data;
using API.DTOs;
using API.Entities;
using API.jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers;

public class UsersController : BaseApiController
{
    private readonly APIDataContext _context;
    private readonly ITokenService _tokenService;

    public UsersController(APIDataContext context,ITokenService tokenService){
        _context = context;
        _tokenService = tokenService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await _context.Users.ToListAsync();  
    }

    [Authorize]
    [HttpGet("{email}")]
    public async Task<ActionResult<AppUser>> GetUser(string email)
    {
        return await _context.Users.FirstOrDefaultAsync<AppUser>(u=>u.EMail==email);
    }

    [AllowAnonymous]
    [HttpPost("RegisterNew")]
    public async Task<ActionResult<TokenJWTDto>> RegisterNew(RegisterDto registration){
        if (CheckIfUserExists(registration.email))
            return BadRequest("User Name already exists!");
        using var hmac = new HMACSHA512();
        var user = new AppUser{
            EMail = registration.email.ToLower(),
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registration.password)),
            PasswordSalt = hmac.Key,
            LastName = registration.lastName.ToUpper(),
            FirstName = registration.firstName.ToUpper(),
            CreationDateTime = DateTime.Now
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new TokenJWTDto{
                                    email = user.EMail,
                                    jwtToken = _tokenService.CreateToken(user),
                                    serverTime = DateTime.Now
                                 });
    }

    private bool CheckIfUserExists(string email){
        return (_context.Users.SingleOrDefault<AppUser>(u=>u.EMail==email)!=null)?true:false;
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenJWTDto>> Login(LoginDto login){
        if (!CheckIfUserExists(login.email))
            return BadRequest(string.Format("{0} is not registered!",login.email));
        
        var user = await _context.Users
                                 .SingleOrDefaultAsync(u=>u.EMail == login.email);
        if (user==null) return Unauthorized(string.Format("Invalid username:{0}",login.email));
        
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.password));
        for(int i=0;i<hash.Length;i++){
            if (hash[i]!=user.PasswordHash[i]) 
                return Unauthorized(string.Format("{0}: Password doesn't match !",login.email));
        }
        return Ok(new TokenJWTDto{
                                    email = user.EMail,
                                    jwtToken = _tokenService.CreateToken(user),
                                    serverTime = DateTime.Now
                                 });
    }

}