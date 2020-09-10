
// To find the available appointments for a given day

export function getAppointmentsForDay(state, day) {

  const appointmentsArray = [];
  const tempArray = [];
    
  state.days.map(element => {
    if (element.name === day) {
      appointmentsArray.push(...element.appointments);
    }    
  });

  appointmentsArray.forEach(element => {
    if (element === state.appointments[element].id) {
      tempArray.push(state.appointments[element]);
    }
  });

  return tempArray;  
}


// To find an interview

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;   
}


// To find the interviews for a given day

export function getInterviewersForDay(state, day) {

  const filteredDayObj = state.days.find(element => element.name === day);
  
  if (!filteredDayObj) {
    return [];
  }

  const interviewersArray = filteredDayObj.interviewers.map (
      interviewerId => state.interviewers[interviewerId]
  );
  
  return interviewersArray;
};


