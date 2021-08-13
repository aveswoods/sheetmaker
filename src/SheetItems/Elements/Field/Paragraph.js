import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './Paragraph.module.css'

const Paragraph = (props) => {
  const editCtx = useContext(EditorContext);

  const [paragraph, paragraphInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || ''));

  if(editCtx.isEditing) {
    return (
      <textarea
        className={classes.paragraph}
        onChange={paragraphInputHandler}
        value={paragraph}
      />
    );
  }

  else {
    return (
      <p className={classes.paragraph}>{paragraph}</p>
    );
  }
}

export default Paragraph;