import axios from "axios";

function App() {

  const link = "http://dotnet-web-api-service.application.svc"

  // отримання усіх готелів
  async function fetchHotels() {
    await axios.get(`/hotels`).then((response) => {
      console.log(response.data);
    });
  }

  // отримання готелю по айді
  async function fetchHotel(id) {
    await axios.get(`/hotels/` + id).then((response) => {
      console.log(response.data);
    });
  }

  // видалення готелю за айді
  async function deleteHotel(id) {
    await axios.delete(`/hotels/` + id);
  }

  // оновлення готелю
  async function updateHotel(id, name, latitude, longitude) {
    const body = {
      id: id,
      name: name,
      latitude: latitude,
      longitude: longitude
    }
    await axios.put(`/hotels`, body);
  }

  async function createHotel(id, name, latitude, longitude) {
    const body = {
      id: id,
      name: name,
      latitude: latitude,
      longitude: longitude
    }
    await axios.post(`/hotels`, body).then((response => {
      console.log(response.data);
    }))
  }

  return (
    <div className="App">
      <button onClick={() => fetchHotels()}>Log hotels</button>
      <button onClick={() => fetchHotel(1)}>Log first hotel</button>
      <button onClick={() => deleteHotel(1)}>DELETE FIRST HOTEL</button>
      <button onClick={() => updateHotel(2, "New name", 2.1, 2.1)}>UPDATE SECOND HOTEL</button>
      <button onClick={() => createHotel(1, "First", 1, 1)}>CREATE FIRST HOTEL</button>
      <button onClick={() => createHotel(2, "Second", 2, 2)}>CREATE SECOND HOTEL</button>
      <button onClick={() => createHotel(3, "Third", 3, 3)}>CREATE THIRD HOTEL</button>
    </div>
  );
}

export default App;
