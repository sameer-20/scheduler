import React, { useState, useEffect }  from "react";

import axios from "axios";

import DayList from "components/DayList"
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';
import "components/Application.scss";

import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 

  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then((all) => {
				setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
			});
  }, []);


  // console.log("Appointments @@", state.appointments);
  // console.log("Interviewers @@", state.interviewers);

  const appointments = getAppointmentsForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);        
          return (
            <Appointment 
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview} 
            />
          );
         })
        }
      </section>
    </main>
  );
}


