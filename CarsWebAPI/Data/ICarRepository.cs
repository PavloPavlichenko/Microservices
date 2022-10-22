public interface ICarRepository : IDisposable
{
    Task<List<Car>> GetCarsAsync();
    Task<Car> GetCarAsync(int carId);
    Task<int> InsertCarAsync(Car car);
    Task UpdateCarAsync(Car car);
    Task DeleteCarAsync(int carId);
    Task SaveAsync();
}