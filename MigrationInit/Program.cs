var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<HotelDb>(options =>
{
  var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
  options.UseNpgsql(connectionString!);
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<HotelDb>();
db.Database.Migrate();
