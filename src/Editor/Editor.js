import { useState, useRef } from 'react';
import Sheet from '../Sheet/Sheet';
import EditorProvider from './EditorProvider';
import getParser from './schema';
import uuid from 'react-uuid';

const blankSheet = {
  id: uuid(),
  name: 'Blank Sheet',
  items: []
}

const Editor = () => {
  const [currSheet, setCurrSheet] = useState(blankSheet);
  const [cueText, setCueText] = useState('');

  const parse = getParser();

  const newSheetHandler = (name, items) => {
    
    // Generate unique ID's for this new sheet
    const freshItems = items.map(item => {
      const freshItem = {
        id: uuid(),
        type: item.type,
        content: item.content.map(element => ({
          id: uuid(),
          type: element.type,
          content: element.content
        }))
      }
      return freshItem;
    });

    // Set it as the new sheet
    setCurrSheet({
      id: uuid(),
      name: name,
      items: freshItems
    });

    // eslint-disable-next-line
    setCueText(new String('Created Sheet'));
  }

  const saveSheetHandler = (name, items) => {
    setCurrSheet(prevSheet => {
      const updatedSheet = {
        id: prevSheet.id,
        name: name,
        items: items
      };

      // Updated 'sheets' object
      let sheetObj = JSON.parse(localStorage.getItem('sheets'));
      sheetObj[prevSheet.id] = name;
      localStorage.setItem('sheets', JSON.stringify(sheetObj));
      // Save sheet itself
      localStorage.setItem(prevSheet.id, JSON.stringify(updatedSheet));

      return updatedSheet;
    });

    // eslint-disable-next-line
    setCueText(new String('Saved'));
  }

  const openSheetHandler = (id) => {
    const openedSheet = JSON.parse(localStorage.getItem(id));
    setCurrSheet(openedSheet);
  }

  const deleteSheetHandler = () => {
    // Remove sheet from localstorage
    localStorage.removeItem(currSheet.id);

    // Update sheets object
    let sheetObj = JSON.parse(localStorage.getItem('sheets'));
    delete sheetObj[currSheet.id];
    localStorage.setItem('sheets', JSON.stringify(sheetObj));

    // Set current sheet to a blank sheet
    setCurrSheet({
      id: uuid(),
      name: blankSheet.name,
      items: blankSheet.items
    });

    // eslint-disable-next-line
    setCueText(new String('Deleted Sheet'));
  }

  const shareSheetHandler = () => {
    // eslint-disable-next-line
    setCueText(new String('Coming Soon!'));
  }

  const saveBackupHandler = () => {
    const sheetStr = JSON.stringify(currSheet);
    const sheetBlob = new Blob([sheetStr], { type: 'application/json' });
    const href = URL.createObjectURL(sheetBlob);
    const link = document.createElement('a');
    link.href = href;
    link.download = (currSheet.name.replace(/[^a-z0-9]/gi, '')) + '_BACKUP.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const fileInput = useRef(null);

  // Called when the user clicks the upload button
  const uploadBackupHandler = () => {
    fileInput.current.click();
  }

  // Called after the file is uploaded
  const restoreBackupHandler = async (event) => {
    const sheetStr = await event.target.files[0].text();
    const sheetObj = JSON.parse(sheetStr);

    if(parse(sheetObj)) {
      setCurrSheet({
        id: uuid(),
        name: sheetObj.name,
        items: sheetObj.items
      });
      setCueText('Restored Backup');
    }
    else {
      setCueText('Restore Failed');
    }
  }
  

  // Get sheets from storage
  let sheetsObj = JSON.parse(localStorage.getItem('sheets'));
  // If it does not yet exist, store an empty object
  if (!sheetsObj) {
    sheetsObj = {}
    localStorage.setItem('sheets', JSON.stringify(sheetsObj));
  }
  // Map the object to an array without the content of the sheets
  const savedSheets = Object.keys(sheetsObj).map(key => ({
    id: key,
    name: sheetsObj[key]
  }));

  return (
    <EditorProvider items={currSheet.items}>
      <Sheet
        savedSheets={savedSheets}
        currName={currSheet.name}
        onNew={newSheetHandler}
        onSave={saveSheetHandler}
        onOpen={openSheetHandler}
        onDelete={deleteSheetHandler}
        onShare={shareSheetHandler}
        onSaveBackup={saveBackupHandler}
        onUploadBackup={uploadBackupHandler}
        cueText={cueText}
      />

      {/* File upload input */}
      <input
        type="file"
        id="file"
        accept=".json"
        ref={fileInput}
        onChange={restoreBackupHandler}
        style={{ display: 'none' }} />
    </EditorProvider>
  );
};

export default Editor;
