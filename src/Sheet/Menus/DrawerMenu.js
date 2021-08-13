import React from 'react';
import Button from '../../UI/Button';
import SavedSheetOption from './SavedSheetOption';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import classes from './DrawerMenu.module.css';

/**
 * Renders a menu that slides open from the left.
 * 
 * Required Props:
 * - `isOpen`
 * - `onOpenSheet`
 * - `onNewSheet`
 * - `onClose`
 */
const DrawerMenu = (props) => {
  const className = `${classes.drawer} ${props.isOpen ? classes.open : ''}`.trim();

  const savedSheetOptions = props.savedSheets.map(sheet => {
    const openHandler = () => {
      props.onOpenSheet(sheet.id);
      props.onClose();
    }

    return <SavedSheetOption
      key={sheet.id}
      name={sheet.name}
      onOpen={openHandler}
    />
  })

  return (
    <React.Fragment>
      {props.isOpen && <div className={classes.backdrop} onClick={props.onClose} />}
      <div className={className}>
        <div>
          <p className={classes.title}>Saved Character Sheets</p>
          <div className={classes.options}>
            <Button
              styleType="inline"
              color="primary"
              shadowed
              onClick={props.onNewSheet}
            >New <FontAwesomeIcon icon={faPen} /></Button>
            {savedSheetOptions}
          </div>
        </div>
        <p className={classes.disclaimer}>
          <b>Disclaimer:</b> Sheets are stored in your browser's cache. Be sure to back up your sheets
          before clearing it!
        </p>
      </div>
    </React.Fragment>
  );
}

export default DrawerMenu;