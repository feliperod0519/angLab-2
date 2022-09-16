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

namespace API.Controllers
{
    public class LogController: BaseApiController
    {
        private readonly APIDataContext _context;

        public LogController(APIDataContext context){
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("logentry")]
        public async Task<ActionResult<LogDto>> LogEntry(LogDto logEntry){

            _context.Logs.Add(new AppLog{ 
                                           EMail=logEntry.EMail,
                                           Type=logEntry.Type,
                                           Message=logEntry.Message,
                                           EventTime= DateTime.Now
                                        });
            await _context.SaveChangesAsync();
            return Ok(new JsonResult("Logged!"));
        }

    }
}