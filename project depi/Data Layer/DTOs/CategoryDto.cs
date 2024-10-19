using System.ComponentModel.DataAnnotations;

namespace project_depi.Data_Layer.DTOs
{
    public class CategoryDto
    {
        [Required]
        public string name { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        [Url]
        public string image { get; set; }
    }
}
