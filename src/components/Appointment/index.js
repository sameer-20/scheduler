import React from 'react';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import 'components/Appointment/styles.scss'

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment (props) {

  const { id, time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


   
    props.bookInterview(id, interview)
    .then(() => transition(SHOW));
    
  }
    
  console.log("Displaying props", props)
  
  return (
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
      />
    )}

    {mode === CREATE && (<Form interviewers={interviewers} onCancel={back} onSave={save} />)}
    
  </article>
  );
}