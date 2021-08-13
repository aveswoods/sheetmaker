import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './SubStat.module.css';

const SubStat = (props) => {
  const editCtx = useContext(EditorContext);

  const [subStat, subStatInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || 0));

  if (editCtx.isEditing) {
    return (
      <input
        className={classes['sub-stat']}
        type="number"
        onChange={subStatInputHandler}
        value={subStat}
      />
    );
  }

  else {
    return (
      <p className={classes['sub-stat']}>{subStat}</p>
    );
  }
}

export default SubStat;