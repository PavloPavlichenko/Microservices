public class CarRepository : ICarRepository
{
    private readonly CarDb _context;

    public CarRepository(CarDb context)
    {
        _context = context;
    }

    public Task<List<Car>> GetCarsAsync() => _context.Cars.ToListAsync();

    public async Task<Car> GetCarAsync(int carId) =>
      await _context.Cars.FindAsync(new object[] { carId });

    public async Task<int> InsertCarAsync(Car car)
    {
        await _context.Cars.AddAsync(car);
        return car.Id;
    }

    public async Task UpdateCarAsync(Car car)
    {
        var carFromDb = await _context.Cars.FindAsync(new object[] { car.Id });
        if (carFromDb == null) return;
        carFromDb.Brand = car.Name;
        carFromDb.Name = car.Name;
        carFromDb.Price = car.Price;
    }

    public async Task DeleteCarAsync(int carId)
    {
        var carFromDb = await _context.Cars.FindAsync(new object[] { carId });
        if (carFromDb == null) return;
        _context.Cars.Remove(carFromDb);
    }

    public async Task SaveAsync() => await _context.SaveChangesAsync();

    private bool _disposed = false;
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
