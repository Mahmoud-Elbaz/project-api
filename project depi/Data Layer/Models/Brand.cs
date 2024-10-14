using System.ComponentModel.DataAnnotations;

namespace project_depi.Data_Layer.Models
{
    public class Brand : EntityBase
    {
        [Required]
        public string name { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        [Url]
        public string image { get; set; }

        public virtual ICollection<Product> products { get; set; } 
    }
}
