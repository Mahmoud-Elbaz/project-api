using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class SubCategory
    {
        [Key]
        [ForeignKey("Product")]
        public Guid productId { get; set; }

        public virtual Product? Product { get; set; }

        [ForeignKey("Category")]
        public Guid categoryId { get; set; }

        public virtual Category? Category { get; set; }

    }
}
