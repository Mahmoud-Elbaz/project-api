using Microsoft.EntityFrameworkCore;
using project_depi.Data_Layer.Models;

namespace project_depi.Data_Layer
{
    public class AppContextDB : DbContext
    {
        public AppContextDB(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(x => x.availableColors).HasConversion(
                 v => string.Join(',', v),
                 v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                );

            modelBuilder.Entity<Product>().HasOne(x=>x.Brand).WithMany(y => y.products).HasForeignKey(x => x.barndId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Product>().HasOne(x => x.Category).WithMany(y => y.products).HasForeignKey(x => x.categoryId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Product>().HasMany(x => x.subCategories).WithOne(y => y.Product).HasForeignKey(x => x.productId).OnDelete(DeleteBehavior.NoAction);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Brand> Brands { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<SubCategory> SubCategories { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<Cart_Product> Cart_Product { get; set; }


    }
}
