import Modal from '../../UI/Modal';
import Button from '../../UI/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './ModalDeleteConfirm.module.css';

/**
 * Confirmation screen that user wants to delete the current sheet.
 * 
 * Required Props:
 * - `onHide`
 * - `onDelete`
 */
const ModalDeleteConfirm = (props) => {
  return (
    <Modal className={classes.confirm} onHide={props.onHide}>
      <p>
        Are you sure you want to delete this sheet?<br />
        This cannot be undone.
      </p>
      <Button
        styleType="float"
        color="dark"
        onClick={props.onDelete}
      ><FontAwesomeIcon icon={faTrash} /></Button>
    </Modal>
  );
}

export default ModalDeleteConfirm;