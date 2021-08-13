import React, { useContext, useReducer } from "react";
import Field from "./Elements/Field/Field";
import { SMALL_FIELD_OPTIONS, MEDIUM_FIELD_OPTIONS, LARGE_FIELD_OPTIONS } from "./Elements/Field/field-elements";
import Stat from "./Elements/Stat/Stat";
import { MAIN_STAT_OPTIONS } from "./Elements/Stat/stat-elements";
import TopInfo from "./Elements/TopInfo/TopInfo";
import { MAIN_INFO_OPTIONS } from "./Elements/TopInfo/top-info-elements";
import EditorContext from "../Editor/editor-context";

const defaultSettingsMenuState = {
  isOpen: false,
  mouseX: 0,
  mouseY: 0
}

const settingsMenuReducer = (state, action) => {
  if (action.type === 'OPEN') {
    let modalX = action.mouseX - 30;
    let modalY = action.mouseY - 50;

    // Adjust the position of the modal to keep it within the viewport
    const overflowLeft = -modalX;
    const adjustLeft = (overflowLeft > 0 ? overflowLeft : 0);

    const overflowRight = (modalX + 180) // width of modal is 180 CSS pixels
      - (window.innerWidth);
    const adjustRight = (overflowRight > 0 ? overflowRight : 0);

    const viewHeight = Math.max(document.body.clientHeight, window.innerHeight);
    const overflowBottom = (modalY + 240) // max height of modal is 240 CSS pixels
      - (viewHeight);
    const adjustBottom = (overflowBottom > 0 ? overflowBottom : 0);

    modalX += adjustLeft - adjustRight;
    modalY += -adjustBottom;

    return {
      isOpen: true,
      mouseX: modalX,
      mouseY: modalY
    }
  }

  else if (action.type === 'CLOSE') {
    return defaultSettingsMenuState;
  }

  return defaultSettingsMenuState;
}

/**
 * Renders an item to go in the body of the sheet.
 * 
 * Required Props:
 * - `type`: Can be 'small', 'medium', 'large', or 'stat'. Specifies what is rendered (i.e. `Field`
 * or `Stat`. The former is rendered when `type` is *not* 'stat').
 * - `id` and `key`: Both are the unique identifier for this item. They are both required since
 * they are used for separate parts of rendering.
 */
const SheetItem = (props) => {
  const [settingsMenuState, settingsMenuDispatch] = useReducer(settingsMenuReducer, defaultSettingsMenuState)
  const editCtx = useContext(EditorContext);

  const openSettingsHandler = (event) => {
    settingsMenuDispatch({
      type: 'OPEN',
      mouseX: event.pageX,
      mouseY: event.pageY
    });
  }

  const closeSettingsHandler = () => {
    settingsMenuDispatch({
      type: 'CLOSE'
    });
  }

  const deleteHandler = () => {
    editCtx.deleteItem(props.id);
  }

  const createModalOptions = (optionsArray) => (
    optionsArray.map(option => {

      // If there are sub-settings, make onClick's for each one
      if (option.subSettings) {
        return {
          text: option.text,
          subSettings: option.subSettings.map(subSetting => ({
            text: subSetting.text,
            onClick: () => {
              editCtx.addItemElement(props.id, subSetting.type);
              settingsMenuDispatch({
                type: 'CLOSE'
              });
            }
          }))
        }
      }

      // if not, simply make an onClick for the button
      else {
        return {
          text: option.text,
          onClick: () => {
            editCtx.addItemElement(props.id, option.type);
            settingsMenuDispatch({
              type: 'CLOSE'
            });
          }
        }
      }
    })
  );

  let item = '';
  let modalOptions = null;

  switch (props.type) {
    case 'small':
      modalOptions = createModalOptions(SMALL_FIELD_OPTIONS);
      item = <Field
        id={props.id}
        key={props.id}
        size="small"
        isModalOpen={settingsMenuState.isOpen}
        onOpenModal={openSettingsHandler}
        onCloseModal={closeSettingsHandler}
        modalX={settingsMenuState.mouseX}
        modalY={settingsMenuState.mouseY}
        onDelete={deleteHandler}
        modalOptions={modalOptions}
      />;
      break;

    case 'medium':
      modalOptions = createModalOptions(MEDIUM_FIELD_OPTIONS);
      item = <Field
        id={props.id}
        key={props.id}
        size="medium"
        isModalOpen={settingsMenuState.isOpen}
        onOpenModal={openSettingsHandler}
        onCloseModal={closeSettingsHandler}
        modalX={settingsMenuState.mouseX}
        modalY={settingsMenuState.mouseY}
        onDelete={deleteHandler}
        modalOptions={modalOptions}
      />;
      break;

    case 'large':
      modalOptions = createModalOptions(LARGE_FIELD_OPTIONS);
      item = <Field
        id={props.id}
        key={props.id}
        size="large"
        isModalOpen={settingsMenuState.isOpen}
        onOpenModal={openSettingsHandler}
        onCloseModal={closeSettingsHandler}
        modalX={settingsMenuState.mouseX}
        modalY={settingsMenuState.mouseY}
        onDelete={deleteHandler}
        modalOptions={modalOptions}
      />;
      break;

    case 'stat':
      modalOptions = createModalOptions(MAIN_STAT_OPTIONS);
      item = <Stat
        id={props.id}
        key={props.id}
        isModalOpen={settingsMenuState.isOpen}
        onOpenModal={openSettingsHandler}
        onCloseModal={closeSettingsHandler}
        modalX={settingsMenuState.mouseX}
        modalY={settingsMenuState.mouseY}
        onDelete={deleteHandler}
        modalOptions={modalOptions}
      />
      break;

    case 'top-info':
      modalOptions = createModalOptions(MAIN_INFO_OPTIONS);
      item = <TopInfo
        id={props.id}
        key={props.id}
        isModalOpen={settingsMenuState.isOpen}
        onOpenModal={openSettingsHandler}
        onCloseModal={closeSettingsHandler}
        modalX={settingsMenuState.mouseX}
        modalY={settingsMenuState.mouseY}
        onDelete={deleteHandler}
        modalOptions={modalOptions}
      />
      break;

    default:
      item = 'missing item type';
      break;
  }
  
  return item;
};

export default SheetItem;