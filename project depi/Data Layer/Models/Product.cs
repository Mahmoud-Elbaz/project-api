using project_depi.Data_Layer.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class Product : EntityBase
    {

        public Product() { }

        public Product(ProductDto p)
        {
            this.title = p.title;
            this.barndId = p.barndId;
            this.categoryId = p.categoryId;
            this.price = p.price;
            this.priceAfterDiscount = p.priceAfterDiscount;
            this.quantity = p.quantity;
            this.ratingsAverage = p.ratingsAverage;
            this.ratingsQuantity = p.ratingsQuantity;
            this.slug = p.slug;
            this.imageCover = p.imageCover;
            this.description = p.description;
            this.availableColors = p.availableColors;
            this.sold = p.sold;
        }

        public string title { get; set; }

        [ForeignKey("Brand")]
        public virtual Guid barndId { get; set; }

        public virtual Brand? Brand { get; set; }

        [ForeignKey("Category")]
        public virtual Guid categoryId { get; set; }
        public virtual Category? Category { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public double price { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public double priceAfterDiscount { get; set; }
        public int quantity { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public double ratingsAverage { get; set; }
        public int ratingsQuantity { get; set; }

        public string slug { get; set; }

        [Url]
        public string imageCover { get; set; }

        public string description { get; set; }

        public string[] availableColors { get; set; }

        public int sold { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<SubCategory>? subCategories { get; set; } = new List<SubCategory>();
    }
}
