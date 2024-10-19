using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_depi.Data_Layer;
using project_depi.Data_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            var userId = new Guid(User.FindFirst("id").Value);

            var cart = await _context.Carts.
                Where(x => x.cartOwner == userId).
                Include(x => x.Cart_Products)
                .ThenInclude(x=>x.Product).FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // DELETE: api/Cart/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart([FromRoute]Guid id)
        {
            var userId = new Guid(User.FindFirst("id").Value);

            var cart = await _context.Carts.Where(x=>x.cartOwner == userId).Include(x => x.Cart_Products).FirstAsync();
            if (cart == null)
            {
                return NotFound();
            }
            var cart_product = cart.Cart_Products.Where(x => x.productId == id).FirstOrDefault();
            if (cart_product == null) return NotFound();

            cart.totalCartPrice -= cart_product.price;
            cart.numOfCartItems -= cart_product.count;

            cart.Cart_Products.Remove(cart_product);    

            _context.Carts.Update(cart);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> PostCart([FromBody] AddToCartRequest request)
        {
            try
            {
                var userId = new Guid(User.FindFirst("id").Value);


                var product = await _context.Products.FindAsync(request.ProductId);
                if (product == null) return NotFound("Product not found");

                var cart = await _context.Carts.Include(c => c.Cart_Products)
                                    .FirstOrDefaultAsync(c => c.cartOwner == userId);

                if (cart == null)
                {
                    cart = new Cart
                    {
                        cartOwner = userId,
                        totalCartPrice = 0,
                        numOfCartItems = 0,
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
                    cart.numOfCartItems -= cartProduct.count;
                    cart.totalCartPrice -= cartProduct.price;

                    cartProduct.count = request.Quantity;

                    cartProduct.price = product.price * request.Quantity;
                }
                cart.numOfCartItems += cartProduct.count;
                cart.totalCartPrice += cartProduct.price;
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
