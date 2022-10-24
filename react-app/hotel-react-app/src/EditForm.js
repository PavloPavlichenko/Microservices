import React, { useState } from "react";

export default function EditForm(props) {
  console.log(props);
  const [hotelName, setHotelName] = useState("");
  const [hotelLat, setHotelLat] = useState("");
  const [hotelLon, setHotelLon] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    const editedHotel = {
      name: hotelName,
      lat: hotelLat,
      lon: hotelLon,
      id: props.edited.id,
    };
    props.edit(editedHotel);

    setHotelName("");
    setHotelLat("");
    setHotelLon("");
    props.setShowForm(!props.showForm);
  }
  return (
    <div>
      <form className="hotels-form" onSubmit={handleSumbit}>
        <div className="hotels-form__inner">
          <input
            className="hotels-form__inner__input"
            type="text"
            value={hotelName}
            placeholder={props.edited.name}
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="number"
            value={hotelLat}
            placeholder={props.edited.lat}
            onChange={(e) => setHotelLat(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            value={hotelLon}
            placeholder={props.edited.lon}
            onChange={(e) => setHotelLon(e.target.value)}
            required
          />
          <button className="hotel-btn hotel-form-btn">Edit</button>
        </div>
      </form>
    </div>
  );
}
