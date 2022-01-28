using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class PublicIdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "821494b2-91f2-43ec-a33d-f8f892221eb0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c79a8511-a87b-412d-9932-eaa28f9bffb0");

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Products",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "f32411e8-c242-4810-9689-fed3ad9b8cd2", "958b1dcc-cd4e-4bb8-8865-8621642b02eb", "Member", "MEMBER" },
                    { "3cc5716c-df01-4024-b74f-15b881d7d02e", "a32e96c4-c150-460d-a385-def2d8abecf4", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3cc5716c-df01-4024-b74f-15b881d7d02e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f32411e8-c242-4810-9689-fed3ad9b8cd2");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "821494b2-91f2-43ec-a33d-f8f892221eb0", "241c9d01-b3f8-4146-974a-f038184fb6a3", "Member", "MEMBER" },
                    { "c79a8511-a87b-412d-9932-eaa28f9bffb0", "764da672-4b3b-4905-8fc6-458d7d4733e8", "Admin", "ADMIN" }
                });
        }
    }
}
