
export function getAppointmentsForDay(state, day) {

    const appointmentsArray = [];
    const tempArray = [];
    
    state.days.map(element => {
      if (element.name === day)
        appointmentsArray.push(...element.appointments);
    });

    appointmentsArray.forEach(element => {
      if (element === state.appointments[element].id) 
        tempArray.push(state.appointments[element]);
    });

    return tempArray;  
}



export function getInterview(state, interview) {

  if (!interview)
    return null;

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;   

}

