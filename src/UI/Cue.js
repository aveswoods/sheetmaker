import { useState, useEffect } from "react";

import classes from './Cue.module.css';

/**
 * Visual text element that gives the user visual feedback that their actions were registered.
 * E.g., when the user saves, a Cue becomes visible and fades away within 2 seconds.
 * 
 * A Cue becomes visible every time props.text is updated.
 * 
 * Required Props:
 * - `text`
 */
const Cue = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [props.text, setVisible]);

  return (
    <p className={`${classes.cue} ${visible ? classes.visible : classes.invisible}`}>
      {props.text}
    </p>
  );
}

export default Cue;