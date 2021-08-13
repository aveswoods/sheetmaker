import { useState, useEffect } from "react";

/**
 * Custom hook that contains all state fucntionality, including auto-save, for a sheet element.
 * This is closely tied to EditorContext and EditorProvider.
 * @param {*} id Unique identifier for the element.
 * @param {*} updateFn Function that updates this element in EditorContext, takes `id` and `content`
 * as its two arguments.
 * @param  {...any} initialStates Content that is stored as state(s). Can be any number of arguments.
 * @returns An array of the following format: *(state0, changeHandler0, state1, changeHandler1, ... )*
 */
const useAutoUpdateElement = (id, updateFn, ...initialStates) => {
  const numStates = initialStates.length;
  const [states, setStates] = useState(initialStates);

  useEffect(() => {
    // Save changes after a full second of no changes occuring
    const timeout = setTimeout(() => {
      updateFn(id, (numStates === 1 ? states[0] : states));
    }, 1000);

    // Cleanup function (resets the timer)
    return () => {
      clearTimeout(timeout);
    }
  }, [id, updateFn, states, numStates]);

  const zipperedStatesAndHandlers = [];
  for (let i = 0; i < numStates; i++) {
    zipperedStatesAndHandlers.push(states[i]);
    
    zipperedStatesAndHandlers.push((event) => {
      setStates((prevStates => {
        const newStates = [...prevStates];
        newStates[i] = event.target.value;
        return newStates;
      }));
    });
  }

  return zipperedStatesAndHandlers;
}

export default useAutoUpdateElement;