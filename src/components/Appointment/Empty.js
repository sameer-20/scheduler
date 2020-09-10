import React from 'react';

// View to show an empty slot with no appointment

export default function Empty (props) {

console.log(props)
  return (
    <main className="appointment__add" >
      <img className="appointment__add-button"
      src="images/add.png"
      alt="add"
      onClick = {props.onAdd}
      />
    </main>
  )
}