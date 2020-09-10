import { useState, useEffect } from "react";

import axios from "axios";

// Custom hook that will return an object with four keys: 
// set day, set state, cancel interview and book interview

export default function useApplicationData() {

  // The state object will maintain the same structure
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // The setDay action is used to set the current day
  const setDay = day => setState({...state, day });

  // To run multiple promises concurrently and update the state when all the promises
  // are resolved
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []); 


  useEffect(() => {
    setState(prev => ({...prev, days: prev.days.map(day => ({ ...day, spots: calculateRemainingSpots(prev, day.name)}))}));
  },[state.appointments])

  
  // To update and display the number of available spots remaining after
  // adding or deleting an appointment

  const calculateRemainingSpots = function (state, dayName) {
    
    const dayElement = state.days.find(day => (day.name === dayName));
    const appointmentArray = dayElement.appointments.map(app =>(state.appointments[app]));
    
    let counter = 0;

    for (let app of appointmentArray) {
      if (!app.interview) {
        counter++;
      }
    }
    return counter;
  };

  // To make an HTTP request and update the local state with a newly booked appointment

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
    })
  }

  // To make an HTTP request and update the state after deleting an appointment

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      }
    )
  };

  return { state, setDay, bookInterview, cancelInterview };
}

