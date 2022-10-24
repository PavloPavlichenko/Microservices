import React from "react";
import ListItem from "./ListItem";

export default function CarList({ cars, remove, edit }) {
  console.log(cars);
  return (
    <div className="HotelList">
      {cars.map(function (car, index) {
        return (
          <ListItem
            key={index}
            car={car}
            number={index + 1}
            remove={remove}
            edit={edit}
          />
        );
      })}
    </div>
  );
}
