import classes from './Item.module.css';

/**
 * Basic stylized `<div>` that contains content. 
 */
const Item = (props) => {
  return (
    <div className={`${classes.item} ${props.className || ''}`}>
      {props.children}
    </div>
  );
}

export default Item;