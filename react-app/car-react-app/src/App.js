import { useEffect, useState } from "react";
import "./App.css";

import AddForm from "./AddForm";
import CarService from "./API/CarService";
import CarList from "./CarList";

function App() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edited, setEdited] = useState({});

  function addCar(newCar) {
    const id = CarService.createCar(newCar);
    newCar.id = id;
    setCars([...cars, newCar]);
  }
  function removeCar(removedCar) {
    CarService.deleteCar(removedCar.id);
    setCars(cars.filter((p) => p.id !== removedCar.id));
  }
  function addNewCar() {
    setShowForm(!showForm);
  }
  function editCar(editedCar) {
    CarService.updateCar(editedCar);
    let newArr = [];
    cars.map((car) => {
      if (car.id === editedCar.id) {
        car.name = editedCar.name;
        car.lat = editedCar.lat;
        car.lon = editedCar.lon;
      }
      newArr.push(car);
    });

    setCars([...newArr]);
  }

  useEffect(() => {
    getApi();
  }, []);
  async function getApi() {
    const response = await CarService.getAll();
    setCars(response);
  }

  return (
    <div className="App">
      <div className="App__inner">
        <h1 className="list-title">Cars available</h1>
        <CarList cars={cars} remove={removeCar} edit={editCar} />
        <button className="hotel-btn addHotel-btn" onClick={addNewCar}>
          Add new
        </button>

        {showForm && (
          <AddForm
            add={addCar}
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
