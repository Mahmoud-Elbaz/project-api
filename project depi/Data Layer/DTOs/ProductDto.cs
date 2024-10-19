using project_depi.Data_Layer.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project_depi.Data_Layer.DTOs
{
    public class ProductDto
    {
        [Required]
        public string title { get; set; }

        [Required]
        public Guid barndId { get; set; }

        [Required]
        public Guid categoryId { get; set; }

        [Required]
        public double price { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public double priceAfterDiscount { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public double ratingsAverage { get; set; }

        [Required]
        public int ratingsQuantity { get; set; }

        [Required]
        public string slug { get; set; }

        [Url]
        [Required]
        public string imageCover { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public string[] availableColors { get; set; }

        [Required]
        public int sold { get; set; }
    }
}
