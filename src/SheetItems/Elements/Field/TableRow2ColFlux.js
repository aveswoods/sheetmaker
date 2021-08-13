import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './TableRow.module.css';

const TableRow2ColFlux = (props) => {
  const editCtx = useContext(EditorContext);
  const textInitial = (props.content || ['', '']);

  const [text1, text1InputHandler,
    text2, text2InputHandler] = useAutoUpdateElement(props.id, props.onUpdate, ...textInitial);

  const widthStyle = {
    width: '100%'
  };

  if (editCtx.isEditing) {
    return (
      <span className={classes.tablerow}>
        <input
          style={widthStyle}
          value={text1}
          disabled
        />
        <input
          style={widthStyle}
          value={text2}
          disabled
        />
      </span>
    );
  }

  else {
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
      </span>
    );
  }
}

export default TableRow2ColFlux;