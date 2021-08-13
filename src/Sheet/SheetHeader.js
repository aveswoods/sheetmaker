import React, { useContext, useState, useEffect } from "react";
import EditorContext from "../Editor/editor-context";
import Button from "../UI/Button";
import Cue from "../UI/Cue";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faCheck, faArrowRight, faSave, faCog, faShareSquare } from "@fortawesome/free-solid-svg-icons";

import classes from './SheetHeader.module.css';

/**
 * Renderer for the header of the sheet. Includes the title and edit/add buttons.
 * 
 * Required Props:
 * - `sheetName`
 * - `onAdd`
 * - `onSave`
 * - `onShare`
 * - `onOpenDrawerMenu`
 * - `onOpenSettingsMenu`
 * - `cueText`
 */
const SheetHeader = (props) => {
  const editCtx = useContext(EditorContext);

  const [sheetName, setSheetName] = useState(props.sheetName || '');

  // Update sheet name when this component is rerendered
  useEffect(() => {
    setSheetName(props.sheetName);
  }, [props.sheetName]);

  const nameInputHandler = (event) => {
    setSheetName(event.target.value);
  }

  const saveHandler = () => {
    props.onSave(sheetName, editCtx.items);
  }

  const editButtonContent = !editCtx.isEditing ? <FontAwesomeIcon icon={faEdit} /> : <FontAwesomeIcon icon={faCheck} />;
  const editButtonHandler = !editCtx.isEditing ? editCtx.startEditing : editCtx.stopEditing;

  const sheetNameElement = !editCtx.isEditing ? <p>{sheetName}</p>
    : <input onChange={nameInputHandler} value={sheetName} />;

  return (
    <React.Fragment>
      <header className={classes.header}>
        <span className={classes.left}>
          <Button
            styleType="icon"
            color="light"
            onClick={props.onOpenDrawerMenu}
          ><FontAwesomeIcon icon={faArrowRight} /></Button>
          {sheetNameElement}
        </span>
        <span className={classes.right}>
          {/* Share Button */}
          {!editCtx.isEditing &&
            <Button
              styleType="icon"
              color="light"
              onClick={props.onShare}
            ><FontAwesomeIcon icon={faShareSquare} /></Button>
          }
          {/* Settings Button */}
          {!editCtx.isEditing &&
            <Button
              styleType="icon"
              color="light"
              onClick={props.onOpenSettingsMenu}
            ><FontAwesomeIcon icon={faCog} /></Button>
          }
          {/* Save Button */}
          <Button
            styleType="icon"
            color="dark"
            onClick={saveHandler}
          ><FontAwesomeIcon icon={faSave} /></Button>
          <Cue text={props.cueText} />
        </span>
      </header>
      <div className={classes.buttons}>
        <Button
          type="button"
          onClick={editButtonHandler}
          styleType="float"
          color="dark"
          shadowed
        >{editButtonContent}</Button>
        {editCtx.isEditing &&
          <Button
            type="button"
            onClick={props.onAdd}
            styleType="float"
            color="primary"
            shadowed
          ><FontAwesomeIcon icon={faPlus} /></Button>}
      </div>
    </React.Fragment>
  );
}

export default SheetHeader;