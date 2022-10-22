var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CarDb>(options =>
{
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
    options.UseNpgsql(connectionString!);
});

builder.Services.AddScoped<ICarRepository, CarRepository>();

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
var db = scope.ServiceProvider.GetRequiredService<CarDb>();
db.Database.EnsureCreated();

app.MapGet("/cars", async (ICarRepository repository) =>
  Results.Ok(await repository.GetCarsAsync()));

app.MapGet("/cars/{id}", async (int id, ICarRepository repository) =>
  await repository.GetCarAsync(id) is Car car
  ? Results.Ok(car)
  : Results.NotFound());

app.MapPost("/cars", async ([FromBody] Car car, ICarRepository repository) =>
{
    await repository.InsertCarAsync(car);
    await repository.SaveAsync();
    return Results.Created($"/cars/{car.Id}", car.Id);
});

app.MapPut("/cars", async ([FromBody] Car car, ICarRepository repository) =>
{
    await repository.UpdateCarAsync(car);
    await repository.SaveAsync();
    return Results.NoContent();
});

app.MapDelete("/cars/{id}", async (int id, ICarRepository repository) =>
{
    await repository.DeleteCarAsync(id);
    await repository.SaveAsync();
    return Results.NoContent();
});

app.Run();
