using Microsoft.AspNetCore.Mvc;

namespace project_depi.Data_Layer.Models
{
    public class AddToCartRequest
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

}
