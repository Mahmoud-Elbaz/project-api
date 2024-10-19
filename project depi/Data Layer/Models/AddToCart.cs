using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace project_depi.Data_Layer.Models
{
    public class AddToCartRequest
    {
        public Guid ProductId { get; set; }

        [Range(1, Int32.MaxValue)]
        public int Quantity { get; set; } = 1;
    }

}
