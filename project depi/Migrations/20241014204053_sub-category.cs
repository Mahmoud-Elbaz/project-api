using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_depi.Migrations
{
    public partial class subcategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubCategory",
                columns: table => new
                {
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    categoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategory", x => x.productId);
                    table.ForeignKey(
                        name: "FK_SubCategory_Categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "Categories",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubCategory_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubCategory_categoryId",
                table: "SubCategory",
                column: "categoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubCategory");
        }
    }
}
