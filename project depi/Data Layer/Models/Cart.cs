using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class Cart : EntityBase 
    {
        [Column(TypeName = "decimal(18,4)")]
        public double totalCartPrice {  get; set; }

        public int numOfCartItemt { get; set; }

        [ForeignKey("User")]
        public Guid cartOwner { get; set; }

        public virtual User User { get; set; }

        public ICollection<Cart_Product> Cart_Products { get; set; }

        public DateTime createdAt { get; set; } = new DateTime();
        public DateTime updatedAt { get; set; } = new DateTime();
    }
}
