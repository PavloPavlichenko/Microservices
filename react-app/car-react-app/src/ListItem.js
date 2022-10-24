import React, { useState } from "react";
import EditForm from "./EditForm";

export default function ListItem(props) {
  console.log(props);
  const [showForm, setShowForm] = useState(false);
  const [edited, setEdited] = useState(null);
  function editCar() {
    setShowForm(!showForm);
    setEdited(props.car);
  }
  function deleteCar() {
    props.remove(props.car);
  }

  return (
    <div className="ListItem">
      <div className="ListItem__inner">
        <div className="hotel-name">
          {props.number}
          {"."} {props.car.name}
        </div>
        <div className="hotel-btns">
          <button className="hotel-btn" onClick={editCar}>
            edit
          </button>
          <button className="hotel-btn" onClick={deleteCar}>
            del
          </button>
        </div>
      </div>
      {edited && showForm && (
        <EditForm
          edited={edited}
          edit={props.edit}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}
