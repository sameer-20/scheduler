import React from 'react';

import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";

import 'components/appointment/styles.scss'

import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  console.log(props)
  
  return <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}

    {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    
  </article>
}