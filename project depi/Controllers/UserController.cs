using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project_depi.Data_Layer;
using project_depi.Data_Layer.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace project_depi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppContextDB _context;
        private readonly IConfiguration _config;

        public UserController(AppContextDB context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User (Registration)
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (UserExists(user.email))
            {
                return BadRequest(new { error = "Email already exist" });
            }
            _context.Users.Add(user);

            _context.Carts.Add(new Cart()
            {
                cartOwner = user.user_id,
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.user_id }, user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.user_id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Login Method
        // Login Method
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginModel loginUser)
        {
            // Check if the user exists
            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == loginUser.email);

            if (user == null || user.password != loginUser.password)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Generate JWT token if the login is successful
            var token = GenerateJwtToken(user);
            return Ok(new { token = token, message = "success" });
        }

        // Helper method to generate JWT token
        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", "user"),
                new Claim("id", user.user_id.ToString()),
                new Claim("name", user.name)
            };

    var tokenExpiryDays = int.Parse(_config["Jwt:DurationInDays"]);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(tokenExpiryDays), // Using the value from config
                signingCredentials: creds
            );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.user_id == id);
        }

        private bool UserExists(string email)
        {
            return _context.Users.Any(e => e.email == email);
        }
    }
}
