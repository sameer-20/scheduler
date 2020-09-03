import { useState } from "react";

export default function useVisualMode (initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      history[history.length - 1] = mode;
    } else {
      history.push(mode); //To be replaced with an spread operator to avoid side-effect
    }
    setMode(mode);
  }

  function back() {
    history.pop(); //To be replaced with an spread operator to avoid side-effect
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
};

