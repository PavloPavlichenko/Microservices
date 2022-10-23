using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HotelsWebAPI.Migrations
{
    public partial class TestMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.Id);
                });
            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] {"Id", "Name", "Latitude", "Longitude"},
                values: new[]
                {
                    "1234", "First", "1.23", "1.44"
                } 
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumns: new string[] {"Id", "Name", "Latitude", "Longitude"},
                keyValues: new[]
                {
                    "1234", "First", "1.23", "1.44"
                } 
            );
            migrationBuilder.DropTable(
                name: "Hotels");
        }
    }
}
