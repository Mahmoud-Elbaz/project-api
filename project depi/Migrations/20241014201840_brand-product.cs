using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_depi.Migrations
{
    public partial class brandproduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Brand");

            migrationBuilder.AlterColumn<DateTime>(
                name: "updatedAt",
                table: "Brand",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "createdAt",
                table: "Brand",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Brand",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "_id");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    barndId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    categoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    priceAfterDiscount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    ratingsAverage = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    ratingsQuantity = table.Column<int>(type: "int", nullable: false),
                    slug = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imageCover = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    availableColors = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sold = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x._id);
                    table.ForeignKey(
                        name: "FK_Products_Brand_barndId",
                        column: x => x.barndId,
                        principalTable: "Brand",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_barndId",
                table: "Products",
                column: "barndId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Brand");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Categories");

            migrationBuilder.AlterColumn<DateTime>(
                name: "updatedAt",
                table: "Categories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "createdAt",
                table: "Categories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "_id");
        }
    }
}
