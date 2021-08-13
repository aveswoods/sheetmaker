import { useState } from "react";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import classes from './ModalAdd.module.css'

/**
 * Renders a modal window that displays items to add to the sheet.
 * 
 * Required Props:
 * - `onAdd`: Function reference that adds a new item to the `items` array in `EditorContext`.
 * - `onCancel`: Function reference that sets `isAdding` to false (i.e. stops rendering this component).
 */
const ModalAdd = (props) => {
  const [selection, setSelection] = useState('small');

  const selectionChangeHandler = (event) => {
    setSelection(event.target.value);
  }

  const addHandler = () => {
    props.onAdd(selection);
  }

  return (
    <Modal className={classes.selector}>
      <label htmlFor="items">Choose item to add</label>
      <select value={selection} id="items" onChange={selectionChangeHandler}>
        <option value="small">Small Field</option>
        <option value="medium">Medium Field</option>
        <option value="large">Large Field</option>
        <option value="stat">Stat Field</option>
        <option value="top-info">Top Info Field</option>
      </select>
      <span>
        <Button
          type="submit"
          onClick={addHandler}
          styleType="inline"
          color="primary"
        >Add Item</Button>
        <Button
          onClick={props.onCancel}
          styleType="inline"
          color="dark"
        >Cancel</Button>
      </span>
    </Modal>
  );
};

export default ModalAdd;