import React, { useContext } from "react";
import EditorContext from "../../Editor/editor-context";
import FieldElement from "./Field/field-elements";
import StatElement from "./Stat/stat-elements";
import TopInfoElement from "./TopInfo/top-info-elements";
import Button from '../../UI/Button';

import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders all elements for a specific item in the form of an array.
 * 
 * Props Required:
 * - `parentKey`
 * - `parentType`
 * @returns An array of rendered element components.
 */
const RenderElements = (props) => {
  const editCtx = useContext(EditorContext);

  const item = editCtx.items.find(item => item.id === props.parentId);
  const hasElements = item.content.length !== 0;

  const updateElementHandler = (elementId, content) => {
    editCtx.updateItemElement(props.parentId, elementId, content);
  }

  const deleteHandler = () => {
    editCtx.deleteItemLastElement(props.parentId);
  }

  if (props.parentType === 'field') {
    return (
      <React.Fragment>
        {item.content.map(element =>
          <FieldElement
            type={element.type}
            id={element.id}
            key={element.id}
            content={element.content}
            onUpdate={updateElementHandler}
          />)}
        {editCtx.isEditing && hasElements &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={deleteHandler}
              styleType="icon"
              color="dark"
            ><FontAwesomeIcon icon={faMinus} /></Button>
          </div>}
      </React.Fragment>
    );
  }
  else if (props.parentType === 'stat') {
    return (
      <React.Fragment>
        {item.content.map(element =>
          <StatElement
            type={element.type}
            id={element.id}
            key={element.id}
            content={element.content}
            onUpdate={updateElementHandler}
          />)}
        {editCtx.isEditing && hasElements &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={deleteHandler}
              styleType="icon"
              color="dark"
            ><FontAwesomeIcon icon={faMinus} /></Button>
          </div>}
      </React.Fragment>
    );
  }
  else { // if (parentType === 'top-info')
    return (
      <React.Fragment>
        {item.content.map(element =>
          <TopInfoElement
            type={element.type}
            id={element.id}
            key={element.id}
            content={element.content}
            onUpdate={updateElementHandler}
          />)}
        {editCtx.isEditing && hasElements &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={deleteHandler}
              styleType="icon"
              color="dark"
            ><FontAwesomeIcon icon={faMinus} /></Button>
          </div>}
      </React.Fragment>
    );
  }
}

export default RenderElements;