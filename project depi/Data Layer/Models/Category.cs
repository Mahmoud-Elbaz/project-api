using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using project_depi.Data_Layer.DTOs;

namespace project_depi.Data_Layer.Models
{
    public class Category : EntityBase
    {
        public Category()
        {

        }
        public Category(CategoryDto dto)
        {
            name = dto.name;
            slug = dto.slug;
            image = dto.image;
        }

        [Required]
        public string name { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        [Url]
        public string image { get; set; }

        public virtual ICollection<Product>? products { get; set; } = new List<Product>();
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    }
}
