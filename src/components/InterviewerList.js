import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  console.log('props', props);

 const { interviewers, value, onChange }= props
 console.log('interviewer', value);

 // To check that interviewers prop is an Array and that it is required.
 InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
 };

 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
         return (
          <InterviewerListItem
           key={interviewer.id}
           name={interviewer.name} 
           avatar={interviewer.avatar} 
           selected={interviewer.id === props.value}
           setInterviewer={event => props.onChange(interviewer.id)}  
          />
         );
        })
        }
      </ul>
    </section>
  );
}