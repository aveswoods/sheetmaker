import React, { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './Label.module.css';

const Label = (props) => {
  const editCtx = useContext(EditorContext);

  const [label, labelInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || 'Label'));

  if (editCtx.isEditing) {
    return (
      <React.Fragment>
        <input
          className={classes.label}
          onChange={labelInputHandler}
          value={label}
        />
        <p className={classes.label}>:</p>
      </React.Fragment>
    );
  }

  else {
    return (
      <p className={classes.label}>{label}:</p>
    );
  }
}

export default Label;