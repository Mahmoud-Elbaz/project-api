using System.ComponentModel.DataAnnotations;

public class UserLoginModel
{
    [Required]
    [EmailAddress]
    public string email { get; set; }

    [Required]
    public string password { get; set; }
}
