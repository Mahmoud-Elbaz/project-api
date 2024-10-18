using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_depi.Data_Layer;
using project_depi.Data_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_depi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly AppContextDB _context;

        public CartController(AppContextDB context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.Include(x => x.Cart_Products).ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(Guid id)
        {
            var cart = await _context.Carts.Where(x => x._id == id).Include(x => x.Cart_Products).FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart), new { id = cart._id }, cart);
        }

        // PUT: api/Cart/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(Guid id, Cart cart)
        {
            if (id != cart._id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(Guid id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            Console.WriteLine($"AddToCart: userId={request.UserId}, productId={request.ProductId}, quantity={request.Quantity}");
            try
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null) return NotFound("User not found");

                var product = await _context.Products.FindAsync(request.ProductId);
                if (product == null) return NotFound("Product not found");

                var cart = await _context.Carts.Include(c => c.Cart_Products)
                                    .FirstOrDefaultAsync(c => c.cartOwner == request.UserId);
                if (cart == null)
                {
                    cart = new Cart
                    {
                        cartOwner = request.UserId,
                        totalCartPrice = 0,
                        numOfCartItemt = 0,
                        createdAt = DateTime.UtcNow,
                        updatedAt = DateTime.UtcNow,
                        Cart_Products = new List<Cart_Product>()
                    };
                    _context.Carts.Add(cart);
                }

                if (cart.Cart_Products == null)
                {
                    cart.Cart_Products = new List<Cart_Product>();
                }

                var cartProduct = cart.Cart_Products.FirstOrDefault(cp => cp.productId == request.ProductId);
                if (cartProduct == null)
                {
                    cartProduct = new Cart_Product
                    {
                        cartId = cart._id,
                        productId = request.ProductId,
                        count = request.Quantity,
                        price = product.price * request.Quantity
                    };
                    cart.Cart_Products.Add(cartProduct);
                }
                else
                {
                    cartProduct.count += request.Quantity;
                    cartProduct.price += product.price * request.Quantity;
                }
                cart.totalCartPrice += product.price * request.Quantity;
                cart.numOfCartItemt += request.Quantity;
                cart.updatedAt = DateTime.UtcNow;

                // Add log before saving
                Console.WriteLine("Saving cart changes...");
                await _context.SaveChangesAsync();
                Console.WriteLine("Cart changes saved.");

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool CartExists(Guid id)
        {
            return _context.Carts.Any(e => e._id == id);
        }
    }
}
