import { useContext } from 'react';
import EditorContext from '../../Editor/editor-context';
import useAutoUpdateElement from '../../hooks/use-auto-update-element';

import classes from './Title.module.css'

const Title = (props) => {
  const editCtx = useContext(EditorContext);
  
  const [title, titleInputHandler] = useAutoUpdateElement(props.id, props.onUpdate, (props.content || ''));
  
  if(editCtx.isEditing) {
    return (
      <input
        type="text"
        className={classes.title}
        value={title}
        onChange={titleInputHandler}
      />
    );
  }

  else {
    return (
      <p className={classes.title}>{title}</p>
    );
  }
};

export default Title;