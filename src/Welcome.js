import { useState } from 'react';
import classes from './Welcome.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

/**
 * The welcome screen for the Sheetmaker app.
 * 
 * Required Props:
 * `onHidden`
 */
const Welcome = (props) => {
  const [closed, setClosed] = useState(false);

  const hideHandler = async () => {
    setClosed(true);
    setTimeout(() => {
      props.onHidden();
    }, 1000);
  }

  return (
    <div className={`${classes.overlay} ${closed ? classes.closed : ''}`}>
      <p className={classes.title}>Sheetmaker</p>
      <p className={classes.author}>by Ava Z. Beaver</p>
      <button className={classes.button} onClick={hideHandler}><FontAwesomeIcon icon={faDiceD20} /></button>
    </div>
  )
}

export default Welcome;