import React, { useState } from "react";

export default function EditForm(props) {
  console.log(props);
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carBrand, setCarBrand] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    const editedCar = {
      name: carName,
      price: carPrice,
      brand: carBrand,
      id: props.edited.id,
    };
    props.edit(editedCar);

    setCarName("");
    setCarPrice("");
    setCarBrand("");
    props.setShowForm(!props.showForm);
  }
  return (
    <div>
      <form className="hotels-form" onSubmit={handleSumbit}>
        <div className="hotels-form__inner">
          <input
            className="hotels-form__inner__input"
            type="text"
            value={carName}
            placeholder={props.edited.name}
            onChange={(e) => setCarName(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="number"
            value={carPrice}
            placeholder={props.edited.price}
            onChange={(e) => setCarPrice(e.target.value)}
            required
          />
          <input
            className="hotels-form__inner__input"
            type="text"
            value={carBrand}
            placeholder={props.edited.brand}
            onChange={(e) => setCarBrand(e.target.value)}
            required
          />
          <button className="hotel-btn hotel-form-btn">Edit</button>
        </div>
      </form>
    </div>
  );
}
