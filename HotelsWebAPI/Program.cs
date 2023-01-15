using Microsoft.AspNetCore.WebUtilities;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<HotelDb>(options =>
{
  var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
  options.UseNpgsql(connectionString!);
});

builder.Services.AddScoped<IHotelRepository, HotelRepository>();

builder.Services.AddCors(p => 
  p.AddDefaultPolicy(
    builder =>
    {
        builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
    }));

var client = new HttpClient();
client.BaseAddress = new Uri("http://local-cars-backend.application.svc.cluster.local:80/cars/");

var app = builder.Build();

app.UseCors();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<HotelDb>();
db.Database.EnsureCreated();

app.MapGet("/hotels", async (IHotelRepository repository) => 
  Results.Ok(await repository.GetHotelsAsync()));

app.MapGet("/hotels/{id}", async (int id, IHotelRepository repository) => 
  await repository.GetHotelAsync(id) is Hotel hotel
  ? Results.Ok(hotel)
  : Results.NotFound());

app.MapPost("/hotels", async ([FromBody]Hotel hotel, IHotelRepository repository) => 
{
  await repository.InsertHotelAsync(hotel);
  await repository.SaveAsync();

  var queryString = new Dictionary<string, string>()
  {
      { "hotel", hotel.Name }
  };

  var requestUri = QueryHelpers.AddQueryString("hotel", queryString);

  var request = new HttpRequestMessage(HttpMethod.Post, requestUri);
  request.Headers.Add("Accept", "application/json");
  await client.SendAsync(request);

  return Results.Created($"/hotels/{hotel.Id}", hotel.Id);
});

app.MapPut("/hotels", async ([FromBody] Hotel hotel, IHotelRepository repository) => 
{
  await repository.UpdateHotelAsync(hotel);
  await repository.SaveAsync();
  return Results.NoContent();
});

app.MapDelete("/hotels/{id}", async (int id, IHotelRepository repository) => 
{
  await repository.DeleteHotelAsync(id);
  await repository.SaveAsync();

  return Results.NoContent();
});

app.Run();
