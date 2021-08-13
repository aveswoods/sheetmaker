import { useContext } from 'react';
import EditorContext from '../../../Editor/editor-context';
import useAutoUpdateElement from '../../../hooks/use-auto-update-element';

import classes from './Subtitle.module.css'

const Subtitle = (props) => {
  const editCtx = useContext(EditorContext);

  const [subtitle, subtitleInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || ''));

  if(editCtx.isEditing) {
    return (
      <input
        type="text"
        className={classes.subtitle}
        value={subtitle}
        onChange={subtitleInputHandler}
      />
    );
  }

  else {
    return (
      <p className={classes.subtitle}>{subtitle}</p>
    );
  }
};

export default Subtitle;