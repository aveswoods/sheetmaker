import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './TableRow.module.css';

const TableRow3Col = (props) => {
  const editCtx = useContext(EditorContext);
  const textInitial = (props.content || ['', '', '']);

  const [text1, text1InputHandler,
    text2, text2InputHandler,
    text3, text3InputHandler] = useAutoUpdateElement(props.id, props.onUpdate, ...textInitial);

  const widthStyle = {
    width: '100%'
  };

  if (editCtx.isEditing) {
    return (
      <span className={classes.tablerow}>
        <input
          style={widthStyle}
          onChange={text1InputHandler}
          value={text1}
        />
        <input
          style={widthStyle}
          onChange={text2InputHandler}
          value={text2}
        />
        <input
          style={widthStyle}
          onChange={text3InputHandler}
          value={text3}
        />
      </span>
    );
  }

  else {
    return (
      <span className={classes.tablerow}>
        <p style={widthStyle}>{text1}</p>
        <p style={widthStyle}>{text2}</p>
        <p style={widthStyle}>{text3}</p>
      </span>
    );
  }
}

export default TableRow3Col;