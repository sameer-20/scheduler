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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {

  const { id, time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
   
    props.bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
    
  }

  function onEdit() {
    transition(EDIT);
  }
    
  function onDelete() {
    transition(CONFIRM);
  }

  function onCancel() {
    back();
  }

  function onConfirm() {
    transition(DELETING, true);
  
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
    
  console.log("Displaying props", props)
  
  return (
  <article className="appointment" data-testid="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === DELETING && <Status message={"Deleting.."} />}
    {mode === SAVING && <Status message={"Saving.."} />}
    {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={onCancel} onConfirm={onConfirm} />}
    {mode === ERROR_SAVE && <Error message={"Could not book appointment"} onClose={onCancel} />}
    {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={onCancel} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}

    {mode === CREATE && (
        <Form 
          interviewers={interviewers} 
          onCancel={onCancel} 
          onSave={onSave}
        />
    )}

    {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={onSave}
          onCancel={onCancel}
        />
    )}
    
  </article>
  );
}