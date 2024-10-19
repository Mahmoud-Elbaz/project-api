using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

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


        [NotMapped]
        [Compare("password", ErrorMessage = "'ConfirmPassword' and 'Password' do not match.")]
        public string rePassword { get; set; }

        [Required]
        [Phone]
        public string phone { get; set; }

        public DateTime? createdAt { get; set; } = DateTime.UtcNow;
        public DateTime? updatedAt { get; set; } = DateTime.UtcNow;


    }
}
