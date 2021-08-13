import { useState, useReducer, useEffect } from "react";
import EditorContext from "./editor-context";

import uuid from "react-uuid";

/*
SEE SCHEMA.JS
Here is an example of an items array that fits the sheet JSON schema
---
const itemsExample = [
  {
    type: 'small',
    id: abc,
    content: [
      {
        type: 'paragraph',
        id: def,
        content: 'Example text'
      },

      ...more element content...

    ]
  },

  ...more content...

];

*/

const itemsDefault = [];

const itemsReducer = (state, action) => {
  if (action.type === 'SET_ITEMS') {
    return action.items;
  }

  if (action.type === 'ADD') {
    const newItem = {
      type: action.selection,
      id: uuid(),
      content: []
    }
    return [...state, newItem];
  }

  if (action.type === 'ADD_ELEMENT') {
    const newElement = {
      type: action.selection,
      id: uuid(),
      content: action.content
    }
    const itemIndex = state.findIndex(item => item.id === action.itemId);
    state[itemIndex].content = [...state[itemIndex].content, newElement];
    return state;
  }

  if (action.type === 'UPDATE_ELEMENT') {
    const itemIndex = state.findIndex(item => item.id === action.itemId);
    if (state[itemIndex].content !== undefined) {
      const elementIndex = state[itemIndex].content.findIndex(element => element.id === action.elementId);
      if (elementIndex > -1) {
        state[itemIndex].content[elementIndex].content = action.content;
      }
    }
    return state;
  }

  if (action.type === 'DELETE') {
    return state.filter(item => item.id !== action.itemId);
  }

  if (action.type === 'DELETE_ELEMENT') {
    const itemIndex = state.findIndex(item => item.id === action.itemId);
    const updatedElements = state[itemIndex].content;

    const newState = [...state];

    if (updatedElements !== undefined) {
      updatedElements.pop();
      newState[itemIndex].content = updatedElements;
    }
    
    return newState;
  }

  return itemsDefault;
}

/**
 * Provides functions to allow for accessing and editing of items.
 * 
 * No props required.
 */
const EditorProvider = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemsState, dispatchItemsAction] = useReducer(itemsReducer, (props.items || itemsDefault));

  // Update items when this is rerendered.
  useEffect(() => {
    dispatchItemsAction({
      type: 'SET_ITEMS',
      items: props.items
    });
  }, [props.items]);

  // Editing related functions
  const startEditingHandler = () => {
    setIsEditing(true);
  }

  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  // Item related functions

  const addItemHandler = (selection) => {
    dispatchItemsAction({
      type: 'ADD',
      selection: selection
    });
  }

  const addItemElementHandler = (itemId, selection) => {
    dispatchItemsAction({
      type: 'ADD_ELEMENT',
      itemId: itemId,
      selection: selection
    });
  }

  const updateItemElementHandler = (itemId, elementId, content) => {
    dispatchItemsAction({
      type: 'UPDATE_ELEMENT',
      itemId: itemId,
      elementId: elementId,
      content: content
    });
  }

  const deleteItemHandler = (itemId) => {
    dispatchItemsAction({
      type: 'DELETE',
      itemId: itemId
    });
  }

  const deleteItemLastElementHandler = (itemId) => {
    dispatchItemsAction({
      type: 'DELETE_ELEMENT',
      itemId: itemId
    });
  }

  const value = {
    isEditing: isEditing,
    startEditing: startEditingHandler,
    stopEditing: stopEditingHandler,
    items: itemsState,
    addItem: addItemHandler,
    addItemElement: addItemElementHandler,
    updateItemElement: updateItemElementHandler,
    deleteItem: deleteItemHandler,
    deleteItemLastElement: deleteItemLastElementHandler
  }

  return (
    <EditorContext.Provider value={value}>
      {props.children}
    </EditorContext.Provider>
  );
}

export default EditorProvider;