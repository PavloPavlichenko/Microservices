var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var cars = new List<Car>();
var id = 1;


app.MapGet("/cars", () => cars);
app.MapGet("/cars/{id}", (int id) => cars.FirstOrDefault(c => c.Id == id));
app.MapPost("/cars", (Car car) => {
  car.Id = id;
  id++;
  cars.Add(car);
  return Results.Created($"/cars/{car.Id}", car.Id);
});
app.MapPut("/cars", (Car car) => {
  var index = cars.FindIndex(c => c.Id == car.Id);
  if (index < 0){
    throw new Exception("Car not found");
  }
  cars[index] = car;
  return Results.NoContent();
});
app.MapDelete("/cars/{id}", (int id) => {
  var index = cars.FindIndex(c => c.Id == id);
  if (index < 0){
    throw new Exception("Car not found");
  }
  cars.RemoveAt(index);
  return Results.NoContent();
});

app.Run();


public class Car
{
  public int Id { get; set; }
  public string Brand { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public decimal Price { get; set; }
}
