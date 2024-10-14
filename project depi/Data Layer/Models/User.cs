using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_depi.Data_Layer.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid user_id { get; set; }

        [Required]
        public string name { get; set; }

        [EmailAddress]
        [Required]
        public string email { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "'Password' minimum length is 8")]
        public string password { get; set; }

        [Required]
        [Phone]
        public string phone { get; set; }

        public DateTime createdAt { get; set; } = new DateTime();
        public DateTime updatedAt { get; set; } = new DateTime();


    }
}
