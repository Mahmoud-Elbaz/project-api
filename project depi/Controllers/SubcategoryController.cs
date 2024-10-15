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
    public class SubCategoryController : ControllerBase
    {
        private readonly AppContextDB _context;

        public SubCategoryController(AppContextDB context)
        {
            _context = context;
        }

        // GET: api/SubCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategories()
        {
            return await _context.SubCategories.Include(x=>x.Category).ToListAsync();
        }

        // GET: api/SubCategory/5/10
        [HttpGet("{productId}/{categoryId}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(Guid productId, Guid categoryId)
        {
            var subCategory = await _context.SubCategories.Include(x => x.Category)
                .FirstOrDefaultAsync(sc => sc.productId == productId && sc.categoryId == categoryId);

            //var sub2 = from a in _context.SubCategories
            //           where a.categoryId == categoryId && a.productId == productId
            //           join b in _context.Products on a.productId equals b._id  
            //           select new
            //           {
            //               a, b
            //           };

            if (subCategory == null)
            {
                return NotFound();
            }

            return subCategory;
        }

        // POST: api/SubCategory
        [HttpPost]
        public async Task<ActionResult<SubCategory>> PostSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Add(subCategory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SubCategoryExists(subCategory.productId, subCategory.categoryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetSubCategory), 
                new { productId = subCategory.productId, categoryId = subCategory.categoryId }, subCategory);
        }

        // PUT: api/SubCategory/5/10
        [HttpPut("{productId}/{categoryId}")]
        public async Task<IActionResult> PutSubCategory(Guid productId, Guid categoryId, SubCategory subCategory)
        {
            if (productId != subCategory.productId || categoryId != subCategory.categoryId)
            {
                return BadRequest();
            }

            _context.Entry(subCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubCategoryExists(productId, categoryId))
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

        // DELETE: api/SubCategory/5/10
        [HttpDelete("{productId}/{categoryId}")]
        public async Task<IActionResult> DeleteSubCategory(Guid productId, Guid categoryId)
        {
            var subCategory = await _context.SubCategories
                .FirstOrDefaultAsync(sc => sc.productId == productId && sc.categoryId == categoryId);
            if (subCategory == null)
            {
                return NotFound();
            }

            _context.SubCategories.Remove(subCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubCategoryExists(Guid productId, Guid categoryId)
        {
            return _context.SubCategories.Any(e => e.productId == productId && e.categoryId == categoryId);
        }
    }
}
