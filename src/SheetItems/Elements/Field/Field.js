import React, { useContext } from 'react';
import Item from '../../../UI/Item';
import PopupItemSettings from '../../../Sheet/Menus/PopupItemSettings';
import EditorContext from '../../../Editor/editor-context';
import RenderElements from '../RenderElements';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import classes from '../../SheetItem.module.css';

/**
 * Renders a sheet item in the Fields section. This item is text-focused, and it is more wide than
 * tall.
 * 
 * Props Required:
 * - `id` and `key`: The unique identifier for this item
 * - `content`: The content to be rendered
 * - `size`: 'small', 'medium', or 'large'. Determines what size to render this item.
 * - `onUpdate`: Function that passes this item's content and updates the content array in
 * `EditorContext`.
 * - `onDelete`: Function that removes this item from the items array in `EditorContext`.
 * - `modalOptions`: List of objects which have text and a function that is called when an option's
 * button is pressed.
 * - `isModalOpen`: Whether the settings modal is open.
 * - `onOpenModal`: Function that updates the modal's coordinates on screen.
 * - `onCloseModal`: Function that updates `isModalOpen` to false, so the modal stops rendering.
 * - `modalX`: The x-coordinate where the modal is rendered.
 * - `modalY`: The y-coordinate where the modal is rendered.
 */
const Field = (props) => {
  const editCtx = useContext(EditorContext);

  return (
    <React.Fragment>
      {props.isModalOpen &&
        <PopupItemSettings
          onHide={props.onCloseModal}
          onDelete={props.onDelete}
          options={props.modalOptions}
          x={props.modalX}
          y={props.modalY}
        />
      }

      <li className={classes[props.size]}>
        <Item>
          {editCtx.isEditing &&
            <button type="button" className={classes['ellipse-button']} onClick={props.onOpenModal}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          }
          <RenderElements parentId={props.id} parentType="field"/>
        </Item>
      </li>
    </React.Fragment>
  );
}

export default Field;