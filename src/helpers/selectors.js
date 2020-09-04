
// getAppointmentsForDay

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


// getInterview

export function getInterview(state, interview) {

  if (!interview)
    return null;

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;   

}


// getInterviewersForDay

export function getInterviewersForDay(state, day) {

  const appointmentsArray = [];
  const interviewersArray = [];
  const tempArray = [];
  
  state.days.map(element => {
      if (element.name === day)
        appointmentsArray.push(...element.appointments);
  });

  appointmentsArray.map(element => {
      if (element === state.appointments[element].id && state.appointments[element].interview !== null)
        tempArray.push(state.appointments[element].interview.interviewer);
  });

  for (let id of tempArray) {
    console.log("Element is", id);
    interviewersArray.push(state.interviewers[id]);
  }
  
  return interviewersArray;  
}
