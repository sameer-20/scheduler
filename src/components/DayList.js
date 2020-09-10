import React from 'react';
import DayListItem from 'components/DayListItem'

// DayList component renders a list of DayListItem components

export default function DayList(props) {
 
 const dayList = props.days.map(day => {
   return (
     <DayListItem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected= {day.name===props.day}            
        setDay={props.setDay}
      />
    )
  })
 
  return (
    <ul>
      {dayList}
    </ul>
  );
}