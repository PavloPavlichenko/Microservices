var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

app.UseCors();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<HotelDb>();
db.Database.EnsureCreated();

IConfiguration configuration = new ConfigurationBuilder()
          .AddIniFile("/app/config.properties")
          .Build();
using var producer = new ProducerBuilder<string, string>(configuration.AsEnumerable()).Build();
const string topic = "hotels";

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

  producer.Produce(topic, new Message<string, string> { Key = hotel.Id.ToString(), Value = hotel.Name },
    (deliveryReport) => {
      if (deliveryReport.Error.Code != ErrorCode.NoError) {
          Console.WriteLine($"Failed to deliver message: {deliveryReport.Error.Reason}");
      }
      else {
          Console.WriteLine($"Produced event to topic {topic}: key = {hotel.Id} value = {hotel.Name}");
      }
    });

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
