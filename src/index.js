import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import SheetmakerApp from './SheetmakerApp';

// Schema tests

// import getParser, { testJsons } from './schema';

// const parse = getParser();

// console.log("Testing validation");
// testJsons.forEach(json => {
//   console.log(parse(json));
// });

ReactDOM.render(
  <React.StrictMode>
    <SheetmakerApp />
  </React.StrictMode>,
  document.getElementById('root')
);
