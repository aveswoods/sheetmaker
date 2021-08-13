import React, { useState } from 'react';
import Welcome from './Welcome';
import Editor from './Editor/Editor';

const SheetmakerApp = () => {
  const [welcome, setWelcome] = useState(true);

  const welcomeHiddenHandler = () => {
    setWelcome(false);
  }

  return (
    <React.Fragment>
      {welcome && <Welcome onHidden={welcomeHiddenHandler} />}
      <Editor />
    </React.Fragment>
  );
}

export default SheetmakerApp;