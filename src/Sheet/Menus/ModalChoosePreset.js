import { useState } from "react";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal"

import * as sheetPresets from '../sheet-presets.json';

import classes from './ModalChoosePreset.module.css';

/**
 * Modal menu that allows the user to create a new sheet based on a list of presets.
 * 
 * Required Props:
 * - `onCancel`
 * - `onCreate`
 */
const ModalChoosePreset = (props) => {
  const presets = sheetPresets.presets;
  const presetOptions = presets.map(preset => (
    <option value={preset.id} key={preset.id}>
      {preset.name}
    </option>
  ));

  const [selection, setSelection] = useState(presets[0].id);

  const selectionChangeHandler = (event) => {
    setSelection(event.target.value);
  }

  const createHandler = () => {
    const preset = presets.find(preset => preset.id === selection);
    props.onCreate(preset.name, preset.items);
  }

  return (
    <Modal className={classes.selector}>
      <label htmlFor="presets">Choose new sheet preset</label>
      <select value={selection} id="presets" onChange={selectionChangeHandler}>
        {presetOptions}
      </select>
      <span>
        <Button
          onClick={createHandler}
          styleType="inline"
          color="primary"
        >Create</Button>
        <Button
          onClick={props.onCancel}
          styleType="inline"
          color="dark"
        >Cancel</Button>
      </span>
    </Modal>
  );
}

export default ModalChoosePreset;