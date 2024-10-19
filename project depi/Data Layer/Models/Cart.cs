using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class Cart : EntityBase 
    {
        [Column(TypeName = "decimal(18,4)")]
        public double? totalCartPrice { get; set; } = 0;

        public int? numOfCartItems { get; set; } = 0;

        [ForeignKey("User")]
        public Guid cartOwner { get; set; }

        public virtual User? User { get; set; }

        public ICollection<Cart_Product>? Cart_Products { get; set; } = new List<Cart_Product>();

        public DateTime? createdAt { get; set; } = DateTime.UtcNow;
        public DateTime? updatedAt { get; set; } = DateTime.UtcNow;
    }
}
