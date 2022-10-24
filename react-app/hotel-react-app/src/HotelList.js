import React from "react";
import ListItem from "./ListItem";

export default function HotelList({ hotels, remove, edit }) {
  console.log(hotels);
  return (
    <div className="HotelList">
      {hotels.map(function (hotel, index) {
        return (
          <ListItem
            key={index}
            hotel={hotel}
            number={index + 1}
            remove={remove}
            edit={edit}
          />
        );
      })}
    </div>
  );
}
