import { useState } from "react";

// Custom hook to change between the modes on interacting with the application

export default function useVisualMode (initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // The transition function is used to advance to any other mode. For example, from the 
  // "EMPTY" component to the "CREATE" component when a user creates a new appointment 
  // in a currently empty time slot.

  function transition(mode, replace = false) {
    if (replace) {
      history[history.length - 1] = mode;
    } else {
      history.push(mode); //To be replaced with an spread operator to avoid side-effect
    }
    setMode(mode);
  }

  // The back function is used to pop back to the most recent component. For example,  
  // backing out of the "CONFIRM" component by clicking "Cancel" to go back to 
  // the "SHOW" component.

  function back() {
    history.pop(); //To be replaced with an spread operator to avoid side-effect
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
};

