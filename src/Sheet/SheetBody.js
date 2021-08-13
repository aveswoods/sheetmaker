import React, { useContext } from "react";
import SheetItem from "../SheetItems/SheetItem";
import Item from "../UI/Item";
import EditorContext from "../Editor/editor-context";

import classes from './SheetBody.module.css';

/**
 * Renderer for the items in the sheet. Items split into two sections: Stats and Fields.
 * 
 * Required Props:
 * - `isStats`: Indicates whether the Stats section needs to be visible.
 * - `isTopInfo`: Indicated whether the Top Info section needs to be visible.
 */
const SheetBody = (props) => {
  const editCtx = useContext(EditorContext);

  return (
    <React.Fragment>
      {/* Character info section */}
      <Item className={props.isTopInfo ? classes['top-info-item'] : classes.hidden} >
        <ul id="top-info" className={classes['top-info']}></ul>
      </Item >
      <div className={classes.sheet}>
        {/* Stats section */}
        <Item className={props.isStats ? classes['stats-item'] : classes.hidden}>
          <ul id="stats" className={classes.stats}></ul>
        </Item>
        {/* Fields section */}
        <ul className={`${classes.fields} ${props.isStats ? classes['fields__reduced-width'] : classes['fields__full-width']}`}>
          {editCtx.items.map(item => (
            <SheetItem
              type={item.type}
              id={item.id}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default SheetBody;