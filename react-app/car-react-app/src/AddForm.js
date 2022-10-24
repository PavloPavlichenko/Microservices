import React, { useState } from "react";

export default function AddForm({ add, setShowForm, showForm }) {
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carBrand, setCarBrand] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    const newCar = {
      name: carName,
      price: carPrice,
      brand: carBrand,
    };

    add(newCar);
    setCarName("");
    setCarPrice("");
    setCarBrand("");

    setShowForm(!showForm);
  }
  return (
    <div>
      <form className="hotels-form" onSubmit={handleSumbit}>
        <div className="hotels-form__inner">
          <input
            className="hotels-form__inner__input"
            type="text"
            value={carName}
            placeholder="Car name"
            onChange={(e) => setCarName(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="number"
            value={carPrice}
            placeholder="Car price"
            onChange={(e) => setCarPrice(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="text"
            value={carBrand}
            placeholder="Car brand"
            onChange={(e) => setCarBrand(e.target.value)}
            required
          />
          <button className="hotel-btn hotel-form-btn">Add</button>
        </div>
      </form>
    </div>
  );
}
