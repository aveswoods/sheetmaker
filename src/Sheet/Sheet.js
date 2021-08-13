import React, { useState, useEffect, useContext } from "react";
import SheetHeader from "./SheetHeader";
import SheetBody from "./SheetBody";
import EditorContext from "../Editor/editor-context";
import ModalAdd from "./Menus/ModalAdd";
import DrawerMenu from "./Menus/DrawerMenu";
import ModalChoosePreset from "./Menus/ModalChoosePreset";
import ModalEditorSettings from "./Menus/ModalEditorSettings";
import ModalDeleteConfirm from "./Menus/ModalDeleteConfirm";

/**
 * Entry point for the Sheetmaker. Manages basic communication between header, body, and add menu.
 * This includes managing states that indicate which menu(s) are open.
 * 
 * Required Props:
 * - `savedSheets`: Array of objects with `id` and `name` attributes for each sheet saved locally
 * - `currName`: Name of the current sheet in the editor
 * - `onNew`: Function that is called when the new sheet button is pressed
 * - `onSave`: Function that is called when the save button is pressed
 * - `onOpen`: Function that loads a sheet from local storage based on its id.
 * - `onDelete`: Function that delete the current sheet.
 */
const Sheet = (props) => {
  const [isStats, setIsStats] = useState(false);
  const [isTopInfo, setIsTopInfo] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const editCtx = useContext(EditorContext);

  useEffect(() => {
    if (editCtx.items.some(item => item.type === 'stat')) {
      setIsStats(true);
    }
    else {
      setIsStats(false);
    }
    if (editCtx.items.some(item => item.type === 'top-info')) {
      setIsTopInfo(true);
    }
    else {
      setIsTopInfo(false);
    }
  }, [editCtx.items]);

  const addButtonHandler = () => {
    setIsAdding(true);
  }

  const addAddMenuHandler = (selection) => {
    editCtx.addItem(selection);
    setIsAdding(false);
  }

  const closeAddMenuHandler = () => {
    setIsAdding(false);
  };

  const openDrawerMenuHandler = () => {
    setIsDrawerMenuOpen(true);
  }

  const closeDrawerMenuHandler = () => {
    setIsDrawerMenuOpen(false);
  }

  const openPresetMenuHandler = () => {
    setIsDrawerMenuOpen(false);
    setIsPresetMenuOpen(true);
  }

  const closePresetMenuHandler = () => {
    setIsPresetMenuOpen(false);
  }

  const newSheetHandler = (name, items) => {
    props.onNew(name, items);
    setIsPresetMenuOpen(false);
  }

  const openSettingsMenuHandler = () => {
    setIsSettingsMenuOpen(true);
  }

  const closeSettingsMenuHandler = () => {
    setIsSettingsMenuOpen(false);
  }

  const openDeleteConfirmHandler = () => {
    setIsSettingsMenuOpen(false);
    setIsDeleteConfirmOpen(true);
  }

  const closeDeleteConfirmHandler = () => {
    setIsDeleteConfirmOpen(false);
  }

  const deleteHandler = () => {
    setIsDeleteConfirmOpen(false);
    props.onDelete();
  }

  return (
    <React.Fragment>
      {isAdding && <ModalAdd
        onAdd={addAddMenuHandler}
        onCancel={closeAddMenuHandler} />}
      {isPresetMenuOpen && <ModalChoosePreset
        onCreate={newSheetHandler}
        onCancel={closePresetMenuHandler}
      />
      }
      {isSettingsMenuOpen && <ModalEditorSettings
        onHide={closeSettingsMenuHandler}
        onSave={props.onSaveBackup}
        onUpload={props.onUploadBackup}
        onDelete={openDeleteConfirmHandler}/>}
      {isDeleteConfirmOpen && <ModalDeleteConfirm
        onHide={closeDeleteConfirmHandler}
        onDelete={deleteHandler}
      />}
      <DrawerMenu
        savedSheets={props.savedSheets}
        isOpen={isDrawerMenuOpen}
        onOpenSheet={props.onOpen}
        onNewSheet={openPresetMenuHandler}
        onClose={closeDrawerMenuHandler}
      />
      <SheetHeader
        sheetName={props.currName}
        isAdding={isAdding}
        onAdd={addButtonHandler}
        onSave={props.onSave}
        onShare={props.onShare}
        onOpenDrawerMenu={openDrawerMenuHandler}
        onOpenSettingsMenu={openSettingsMenuHandler}
        cueText={props.cueText}
      />
      <SheetBody isStats={isStats} isTopInfo={isTopInfo} />

      {/* App version and Signature */}
      <p
        style={{
          color: 'white',
          textShadow: '0.5px 0 4px #34343456',
          position: 'fixed',
          top: '90vh',
          left: '0',
          width: '100vw',
          height: 'fit-content',
          margin: '0',
          padding: '0',
          fontSize: '9px',
          textAlign: 'center',
          zIndex: '-1'
        }}
      >
        Sheetmaker v0.1<br />
        Made by Ava Z. Beaver
      </p>
    </React.Fragment>
  );
};

export default Sheet;