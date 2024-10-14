using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class Product : EntityBase
    {
        public string title { get; set; }

        [ForeignKey("Brand")]
        public virtual Guid barndId { get; set; }

        public virtual Brand Brand { get; set; }

        [ForeignKey("Category")]
        public virtual Guid categoryId { get; set; }
        public virtual Category Category { get; set; }

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
        public DateTime createdAt { get; set; } = new DateTime();
        public DateTime updatedAt { get; set; } = new DateTime();

        public virtual ICollection<SubCategory> subCategories { get; set; }
    }
}
