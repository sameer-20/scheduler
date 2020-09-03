
export default function useVisualMode (intial) {
  
    const [mode, setMode] = useState(intial);
    
    return { mode};
  
}
