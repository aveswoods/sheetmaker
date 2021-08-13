import React, { useContext } from "react";
import EditorContext from "../../../Editor/editor-context";
import useAutoUpdateElement from "../../../hooks/use-auto-update-element";

import classes from './TripletStats.module.css';

const TripletStats = (props) => {
  const editCtx = useContext(EditorContext);
  const statsInitial = props.content || [0, 0, 0];

  const [firstStat, firstInputHandler,
    secondStat, secondInputHandler,
    thirdStat, thirdInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, ...statsInitial);

  if (editCtx.isEditing) {
    return (
      <span className={classes['triplet-stats']}>
        <input
          type="number"
          onChange={firstInputHandler}
          value={firstStat}
        />
        <input
          type="number"
          onChange={secondInputHandler}
          value={secondStat}
        />
        <input
          type="number"
          onChange={thirdInputHandler}
          value={thirdStat}
        />
      </span>
    );
  }

  else {
    return (
      <span className={classes['triplet-stats']}>
        <p>{firstStat}</p>
        <p>{secondStat}</p>
        <p>{thirdStat}</p>
      </span>
    )
  }
};

export default TripletStats;