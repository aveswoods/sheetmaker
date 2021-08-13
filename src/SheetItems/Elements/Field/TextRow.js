import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './TextRow.module.css';

const TextRow = (props) => {
  const editCtx = useContext(EditorContext);

  const [text, textInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || ''));

  if(editCtx.isEditing) {
    return (
      <input
        className={classes.textrow}
        onChange={textInputHandler}
        value={text}
      />
    );
  }

  else {
    return (
      <p className={classes.textrow}>{text}</p>
    )
  }
}

export default TextRow;