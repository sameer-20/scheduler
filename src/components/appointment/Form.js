import React, { useState } from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const[name, setName] = useState(props.name || "");
  console.log(name)

  const reset= function() {
    setName("");
    setInterviewer(null);
  }
  const cancel = function() {
    reset();
    props.onCancel();
  }

  const save = function () {
    props.onSave(name, interviewer)
  }
  

return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input onChange={(event) => setName(event.target.value) }
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={name}
        placeholder="Enter Student Name"

       /* onSubmit={} */
        />
      </form>
      <InterviewerList
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={save} confirm>Save</Button>
      </section>
    </section>
  </main>
)

}