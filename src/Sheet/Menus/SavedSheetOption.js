import Button from "../../UI/Button"
import Item from "../../UI/Item"

import classes from './SavedSheetOption.module.css';

/**
 * Renders a menu option for a saved character sheet, based on props. 
 * 
 * Required Props:
 * - `name`
 * - `onOpen`: Function to be called when the Open button is pressed.
 */
const SavedSheetOption = (props) => {
  return (
    <Item className={classes.option}>
      <p>{props.name}</p>
      <Button
        styleType="inline"
        color="dark"
        onClick={props.onOpen}
      >Open</Button>
    </Item>
  );
}

export default SavedSheetOption;