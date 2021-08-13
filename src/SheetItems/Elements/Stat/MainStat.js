import { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './MainStat.module.css';

const MainStat = (props) => {
  const editCtx = useContext(EditorContext);

  const [mainStat, mainStatInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || 0));

  if (editCtx.isEditing) {
    return (
      <input
        className={classes['main-stat']}
        type="number"
        onChange={mainStatInputHandler}
        value={mainStat}
      />
    );
  }

  else {
    return (
      <p className={classes['main-stat']}>{mainStat}</p>
    )
  }
}

export default MainStat;