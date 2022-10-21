public interface IHotelRepository : IDisposable
{
  Task<List<Hotel>> GetHotelsAsync();
  Task<Hotel> GetHotelAsync(int hotelId);
  Task<int> InsertHotelAsync(Hotel hotel);
  Task UpdateHotelAsync(Hotel hotel);
  Task DeleteHotelAsync(int hotelId);
  Task SaveAsync();
}