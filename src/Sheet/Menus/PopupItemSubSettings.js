import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../../UI/Item';

import classes from './PopupItemSettings.module.css';

const SubSettingSelector = (props) => {
  const location = {
    top: props.y,
    left: props.x,
  }

  return (
    <div style={location} className={classes.modal}>
      <Item className={classes.settings}>
        {props.options}
      </Item>
    </div>
  );
}

/**
 * Modal window for sub-settings of an item setting option.
 *  
 * Props Required:
 * - `options`: An array of Button elements
 * - `x`: The x-coordinate where this modal is rendered.
 * - `y`: The y-coordinate where this modal is rendered.
 */
const PopupItemSubSettings = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<SubSettingSelector
        options={props.options}
        x={props.x}
        y={props.y}
      />, document.getElementById('modal-root'))}
    </React.Fragment>
  );
}

export default PopupItemSubSettings;