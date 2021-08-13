import React from "react";

// Context to allow editing/accessing of items to be done globally.
const EditorContext = React.createContext({
  isEditing: false,
  startEditing: () => {},
  stopEditing: () => {},
  items: [],
  addItem: () => {},
  addItemElement: () => {},
  updateItemElement: () => {},
  deleteItem: () => {},
  deleteItemElement: () => {}
});

export default EditorContext;