import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";

import classes from './ModalEditorSettings.module.css';

/**
 * Renders the editor settings. Options include save as JSON, delete, and potentionally more later.
 * 
 * Required Props:
 * - `onHide`
 * - `onSave`
 * - `onUpload`
 * - `onDelete`
 */
const ModalEditorSettings = (props) => {
  return (
    <Modal className={classes.settings} onHide={props.onHide}>
      <div className={classes.option}>
        <p>Save backup</p>
        <Button
          styleType="icon"
          color="primary"
          onClick={props.onSave}
        ><FontAwesomeIcon icon={faDownload} /></Button>
      </div>

      <div className={classes.option}>
        <p>Restore backup</p>
        <Button
          styleType="icon"
          color="primary"
          onClick={props.onUpload}
        ><FontAwesomeIcon icon={faUpload} /></Button>
      </div>

      <div className={classes.option}>
        <p>Delete this sheet</p>
        <Button
          styleType="icon"
          color="dark"
          onClick={props.onDelete}
        ><FontAwesomeIcon icon={faTrash} /></Button>
      </div>
    </Modal>
  );
}

export default ModalEditorSettings;