import React from 'react';

// View to provide some indication to the user that an operation 
// is in progress on saving/deleting appointment

export default function Show (props) {

console.log(props)
  return (
    <main className="appointment__card appointment__card--status" >
      <img 
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>        
    </main>
  )
}