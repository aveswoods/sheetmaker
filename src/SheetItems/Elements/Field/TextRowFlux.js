import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './TextRow.module.css';

const TextRowFlux = (props) => {
  const editCtx = useContext(EditorContext);

  const [text, textInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || ''));

  if(editCtx.isEditing) {
    return (
      <input
        className={classes.textrow}
        value={text}
        disabled
      />
    );
  }

  else {
    return (
      <input
        className={classes.textrow}
        onChange={textInputHandler}
        value={text}
      />
    );
  }
}

export default TextRowFlux;