using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JegyMester.API.Migrations
{
    public partial class TicketSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_UserId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "GuestEmail",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GuestPhone",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsUsed",
                table: "Tickets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PurchaseDate",
                table: "Tickets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "SeatNumber",
                table: "Tickets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hall",
                table: "Screenings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalSeats",
                table: "Screenings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId1",
                table: "Tickets",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_UserId1",
                table: "Tickets",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_UserId1",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_UserId1",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "GuestEmail",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "GuestPhone",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "IsUsed",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "PurchaseDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "SeatNumber",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Hall",
                table: "Screenings");

            migrationBuilder.DropColumn(
                name: "TotalSeats",
                table: "Screenings");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_UserId",
                table: "Tickets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
