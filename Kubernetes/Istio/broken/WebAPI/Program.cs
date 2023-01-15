var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/cars", () => {
  System.Threading.Thread.Sleep(10000);
  return Results.Ok();
});

app.Run();
