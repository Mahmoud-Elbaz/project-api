using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_depi.Migrations
{
    public partial class cartcart_product2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategory_Categories_categoryId",
                table: "SubCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategory_Products_productId",
                table: "SubCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategory",
                table: "SubCategory");

            migrationBuilder.RenameTable(
                name: "SubCategory",
                newName: "SubCategories");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategory_categoryId",
                table: "SubCategories",
                newName: "IX_SubCategories_categoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategories",
                table: "SubCategories",
                column: "productId");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    totalCartPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    numOfCartItemt = table.Column<int>(type: "int", nullable: false),
                    cartOwner = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x._id);
                    table.ForeignKey(
                        name: "FK_Carts_Users_cartOwner",
                        column: x => x.cartOwner,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cart_Product",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    count = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    cartId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart_Product", x => x._id);
                    table.ForeignKey(
                        name: "FK_Cart_Product_Carts_cartId",
                        column: x => x.cartId,
                        principalTable: "Carts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cart_Product_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Product_cartId",
                table: "Cart_Product",
                column: "cartId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Product_productId",
                table: "Cart_Product",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_cartOwner",
                table: "Carts",
                column: "cartOwner");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategories_Categories_categoryId",
                table: "SubCategories",
                column: "categoryId",
                principalTable: "Categories",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategories_Products_productId",
                table: "SubCategories",
                column: "productId",
                principalTable: "Products",
                principalColumn: "_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategories_Categories_categoryId",
                table: "SubCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategories_Products_productId",
                table: "SubCategories");

            migrationBuilder.DropTable(
                name: "Cart_Product");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategories",
                table: "SubCategories");

            migrationBuilder.RenameTable(
                name: "SubCategories",
                newName: "SubCategory");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategories_categoryId",
                table: "SubCategory",
                newName: "IX_SubCategory_categoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategory",
                table: "SubCategory",
                column: "productId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategory_Categories_categoryId",
                table: "SubCategory",
                column: "categoryId",
                principalTable: "Categories",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategory_Products_productId",
                table: "SubCategory",
                column: "productId",
                principalTable: "Products",
                principalColumn: "_id");
        }
    }
}
