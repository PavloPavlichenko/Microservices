import React, { useState } from "react";

export default function AddForm({ add, setShowForm, showForm }) {
  const [hotelName, setHotelName] = useState("");
  const [hotelLat, setHotelLat] = useState("");
  const [hotelLon, setHotelLon] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    const newHotel = {
      name: hotelName,
      lat: hotelLat,
      lon: hotelLon,
    };

    add(newHotel);
    setHotelName("");
    setHotelLat("");
    setHotelLon("");

    setShowForm(!showForm);
  }
  return (
    <div>
      <form className="hotels-form" onSubmit={handleSumbit}>
        <div className="hotels-form__inner">
          <input
            className="hotels-form__inner__input"
            type="text"
            value={hotelName}
            placeholder="Hotel name"
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="number"
            value={hotelLat}
            placeholder="Hotel lat"
            onChange={(e) => setHotelLat(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="number"
            value={hotelLon}
            placeholder="Hotel lon"
            onChange={(e) => setHotelLon(e.target.value)}
            required
          />
          <button className="hotel-btn hotel-form-btn">Add</button>
        </div>
      </form>
    </div>
  );
}
