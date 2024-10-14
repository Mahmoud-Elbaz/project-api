using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class Cart_Product : EntityBase
    {
        public int count {  get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public double price { get; set; }

        [ForeignKey("Product")]
        public Guid productId { get; set; }

        public virtual Product Product { get; set; }

        [ForeignKey("Cart")]
        public Guid cartId { get; set; }

        public virtual Cart Cart { get; set; }

    }
}
