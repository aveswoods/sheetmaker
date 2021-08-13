import { useState, useEffect } from 'react';

import classes from './Button.module.css'

/**
 * Renders a stylized button. Style can be customized with props.
 * 
 * Optional Props:
 * - `type`: Standard HTML button types. If omited, the type is `button`.
 * - `onClick`: Function to be executed when this button is clicked
 * - `styleType`: Can be `float`, `icon`, or `inline`. `float` is for text content and for
 * "floating" on the screen. Includes a grow animation when hovered and a bump animation when
 * clicked. `inline` is a more subdued style, better for inline or smaller buttons. `inline` is
 * also the default style type if none is provided. `icon` is the same as `inline`, but optimized
 * for FontAwesome icons.
 * - `shadowed`: Indicates that there should be a shadow under the button.
 * - `color`: Can be `primary`, `dark`, or `light`. If omitted, `light` is default.
 */
const Button = (props) => {
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    const bumpTimer = setTimeout(() => {
      setIsBumping(false);
    }, 200);

    return () => {
      clearTimeout(bumpTimer);
    }
  }, [isBumping]);

  const clickHandler = () => {
    setIsBumping(true);
    if (props.onClick)
      props.onClick();
  }

  // Assign style class name
  let classNameStyle = '';
  if (props.styleType === 'float') {
    classNameStyle = classes.float;
  }
  else if (props.styleType === 'icon') {
    classNameStyle = classes.icon;
  }
  else {
    classNameStyle = classes.inline;
  }

  // Assign color class name
  let classNameColor = '';
  if (props.color === 'primary') {
    classNameColor = classes['color-primary'];
  }
  else if (props.color === 'dark') {
    classNameColor = classes['color-dark'];
  }
  else {
    classNameColor = classes['color-light'];
  }

  const className = (
    `${props.className || ''} ` +
    `${classNameStyle} ` +
    `${classNameColor} ` +
    `${props.shadowed ? classes.shadowed : ''}`
  ).trim();

  return (
    <button
      type={props.type || 'button'}
      onClick={clickHandler}
      className={`${className} ${isBumping ? classes.bump : ''}`}
    >
      {props.children}
    </button>
  );
}

export default Button;