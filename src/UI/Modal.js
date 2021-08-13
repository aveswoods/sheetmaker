import React from "react";
import ReactDOM from 'react-dom';
import Item from "./Item";

import classes from './Modal.module.css';

/**
 * Renders a base for a Modal menu. Include content as this component's children.
 * 
 * Required Props:
 * - `onHide`: Function that is called when the backdrop is clicked, and hence the modal is hidden.
 * Do not include if this modal does not close when the backdrop is clicked.
 */
const Modal = (props) => {
  const itemClassName = `${classes.modal} ${props.className || ''}`.trim();

  return (
    <React.Fragment>
      {ReactDOM.createPortal((
        <div className={classes.backdrop} onClick={props.onHide}>
          <Item className={itemClassName}>
            {props.children}
          </Item>
        </div>
      ), document.getElementById('modal-root'))}
    </React.Fragment>
  );
}

export default Modal;