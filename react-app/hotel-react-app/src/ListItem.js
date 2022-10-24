import React, { useState } from "react";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

export default function ListItem(props) {
  console.log(props);
  const [showForm, setShowForm] = useState(false);
  const [edited, setEdited] = useState(null);
  function editHotel() {
    setShowForm(!showForm);
    setEdited(props.hotel);
  }
  function deleteHotel() {
    props.remove(props.hotel);
  }

  return (
    <div className="ListItem">
      <div className="ListItem__inner">
        <div className="hotel-name">
          {props.number}
          {"."} {props.hotel.name}
        </div>
        <div className="hotel-btns">
          <button className="hotel-btn" onClick={editHotel}>
            edit
          </button>
          <button className="hotel-btn" onClick={deleteHotel}>
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
