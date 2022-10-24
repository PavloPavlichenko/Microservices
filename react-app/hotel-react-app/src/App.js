import { useEffect, useState } from "react";
import "./App.css";
import HotelList from "./HotelList";
import AddForm from "./AddForm";
import axios from "axios";
import HotelService from "./API/HotelService";

function App() {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edited, setEdited] = useState({});

  function addHotel(newHotel) {
    const id = HotelService.createHotel(newHotel);
    newHotel.id = id;
    setHotels([...hotels, newHotel]);
  }
  function removeHotel(removedHotel) {
    HotelService.deleteHotel(removedHotel.id);
    setHotels(hotels.filter((p) => p.id !== removedHotel.id));
  }
  function addNewHotel() {
    setShowForm(!showForm);
  }
  function editHotel(editedHotel) {
    HotelService.updateHotel(editedHotel);
    let newArr = [];
    hotels.map((hotel) => {
      if (hotel.id === editedHotel.id) {
        hotel.name = editedHotel.name;
        hotel.lat = editedHotel.lat;
        hotel.lon = editedHotel.lon;
      }
      newArr.push(hotel);
    });

    setHotels([...newArr]);
  }

  useEffect(() => {
    getApi();
  }, []);
  async function getApi() {
    const response = await HotelService.getAll();
    setHotels(response);
  }

  return (
    <div className="App">
      <div className="App__inner">
        <h1 className="list-title">Hotels available</h1>
        <HotelList hotels={hotels} remove={removeHotel} edit={editHotel} />
        <button className="hotel-btn addHotel-btn" onClick={addNewHotel}>
          Add new
        </button>

        {showForm && (
          <AddForm
            add={addHotel}
            edited={edited}
            setShowForm={setShowForm}
            showForm={showForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
