using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_depi.Data_Layer;
using project_depi.Data_Layer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace project_depi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Cart_ProductController : ControllerBase
    {
        private readonly AppContextDB _context;

        public Cart_ProductController(AppContextDB context)
        {
            _context = context;
        }

        // GET: api/Cart_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_Product>>> GetCart_Products()
        {
            return await _context.Cart_Product.Include(x=>x.Product).ToListAsync();
        }

        // GET: api/Cart_Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart_Product>> GetCart_Product(Guid id)
        {
            var cart_Product = await _context.Cart_Product.Where(x => x._id == id).Include(x => x.Product).FirstOrDefaultAsync();

            if (cart_Product == null)
            {
                return NotFound();
            }

            return cart_Product;
        }

        // POST: api/Cart_Product
        [HttpPost]
        public async Task<ActionResult<Cart_Product>> PostCart_Product(Cart_Product cart_Product)
        {
            _context.Cart_Product.Add(cart_Product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart_Product), new { id = cart_Product._id }, cart_Product);
        }

        // PUT: api/Cart_Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart_Product(Guid id, Cart_Product cart_Product)
        {
            if (id != cart_Product._id)
            {
                return BadRequest();
            }

            _context.Entry(cart_Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Cart_ProductExists(id))
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

        // DELETE: api/Cart_Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart_Product(Guid id)
        {
            var cart_Product = await _context.Cart_Product.FindAsync(id);
            if (cart_Product == null)
            {
                return NotFound();
            }

            _context.Cart_Product.Remove(cart_Product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Cart_ProductExists(Guid id)
        {
            return _context.Cart_Product.Any(e => e._id == id);
        }
    }
}