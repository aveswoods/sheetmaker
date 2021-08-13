import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './Text.module.css';

const Text = (props) => {
  const editCtx = useContext(EditorContext);

  const [text, textInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || 'Text'));

  if(editCtx.isEditing) {
    return (
      <input
        className={classes.text}
        onChange={textInputHandler}
        value={text}
      />
    );
  }

  else {
    return (
      <p className={classes.text}>{text}</p>
    );
  }
}

export default Text;