import React from 'react';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import 'components/Appointment/styles.scss'

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {

  const { id, time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
   
    props.bookInterview(id, interview)
    .then(() => transition(SHOW));
    
  }

  function edit() {
    transition(EDIT);
  }
    
  function deleting() {
    transition(CONFIRM);
  }


  function confirm() {
    transition(DELETING, true);
  
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY));
  }
    
  console.log("Displaying props", props)
  
  return (
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === DELETING && <Status message={"Deleting.."} />}
    {mode === SAVING && <Status message={"Saving.."} />}
    {mode === CONFIRM && <Confirm message={"Are you sure to delete?"} onConfirm={confirm} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={edit}
        onDelete={deleting}
      />
    )}

    {mode === CREATE && (
        <Form 
          interviewers={interviewers} 
          onCancel={back} 
          onSave={save}
        />
    )}

    {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
    )}
    
  </article>
  );
}