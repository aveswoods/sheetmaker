import React, { useState } from "react";
import ReactDOM from "react-dom";
import Item from "../../UI/Item";
import Button from "../../UI/Button";
import PopupItemSubSettings from "./PopupItemSubSettings";

import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { /*faBars,*/ faTrash } from "@fortawesome/free-solid-svg-icons";

import classes from './PopupItemSettings.module.css';

const SettingSelector = (props) => {
  const [subSettings, setSubSettings] = useState([]);

  // location of the main setting selector
  const location = {
    top: props.y,
    left: props.x,
  }

  // location of the sub-settings selector
  const subLocation = {
    top: (props.y + 18),
    left: (props.x)
  }

  let extraOptions = [];
  if (props.options) {
    extraOptions = props.options.map(option => {

      // Do different things on click if the option has sub-settings:
      // If it does, open a new modal
      // If it doesn't, simply do the option's onClick.
      let onClick = () => { };
      if (option.subSettings) {
        onClick = () => {
          setSubSettings(option.subSettings.map(subSetting => (
            <Button
              key={uuid()}
              onClick={subSetting.onClick}
              styleType="inline"
              color="light"
              shadowed
            >{subSetting.text}</Button>
          )));
          props.onOpenSubSettings();
        }
      }
      else {
        onClick = () => {
          option.onClick();
        }
      }

      return <Button
        key={uuid()}
        onClick={onClick}
        styleType="inline"
        color="light"
        shadowed
      >{option.text}</Button>
    });
  }

  return (
    <React.Fragment>
      {props.isSubSettingsOpen &&
        <PopupItemSubSettings
          options={subSettings}
          x={subLocation.left}
          y={subLocation.top}
        />}
      <div style={location} className={classes.modal}>
        <span className={classes['settings__default']}>
          {/* <Button
          styleType="icon"
          color="light"
          shadowed
        ><FontAwesomeIcon icon={faBars} /></Button> */}
          <Button
            onClick={props.onDelete}
            styleType="icon"
            color="dark"
            shadowed
          ><FontAwesomeIcon icon={faTrash} /></Button>
        </span>
        <Item className={classes.settings}>
          {extraOptions}
        </Item>
      </div>
    </React.Fragment>
  );
};

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />
}

/**
 * Popup window for settings pertaining to a `SheetItem`.
 * 
 * Props Required:
 * - `onHide`: Function that stops rendering of this modal.
 * - `onMove`: Function that allows the parent sheet item to be moved to a new location. **NOT YET IMPLEMENTED**
 * - `onDelete`: Function that deletes the sheet item that is rendering this modal.
 * - `options`: An array of extra button options, each given as an object with 'text', 'onClick',
 * and 'subOptions' attributes.
 * - `x`: The x-coordinate where this modal is rendered.
 * - `y`: The y-coordinate where this modal is rendered.
 */
const PopupItemSettings = (props) => {
  const [isSubSettingsOpen, setIsSubSettingsOpen] = useState(false);

  const hideHandler = () => {
    if (isSubSettingsOpen) {
      setIsSubSettingsOpen(false);
    }
    else {
      props.onHide();
    }
  }

  const openSubSettingsHandler = () => {
    setIsSubSettingsOpen(true);
  }

  return <React.Fragment>
    {ReactDOM.createPortal(<Backdrop onClick={hideHandler} />, document.getElementById('modal-root'))}
    {ReactDOM.createPortal(<SettingSelector
      x={props.x}
      y={props.y}
      options={props.options}
      onDelete={props.onDelete}
      isSubSettingsOpen={isSubSettingsOpen}
      onOpenSubSettings={openSubSettingsHandler}
    />, document.getElementById('modal-root'))}
  </React.Fragment>
}

export default PopupItemSettings;