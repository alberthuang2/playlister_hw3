import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    let disabledButtonClass = "playlister-button-disabled";
    let addClass = enabledButtonClass;
    let redoClass = disabledButtonClass;
    let undoClass = disabledButtonClass;
    let exitClass = enabledButtonClass;
    if(store.currentModal!=="NONE"){
        addClass = disabledButtonClass;
        redoClass = disabledButtonClass;
        undoClass = disabledButtonClass;
        exitClass = disabledButtonClass;
    }
    if(store.currentList===null){
        addClass = disabledButtonClass;
        exitClass = disabledButtonClass;
    }
    //store.updateTransactions();
    let hasRedo = store.tps.hasTransactionToRedo();
    let hasUndo = store.tps.hasTransactionToUndo();
    if(hasRedo)
        redoClass = enabledButtonClass
    if(hasUndo)
        undoClass = enabledButtonClass
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong() {
        // let id = store.currentList._id;
        // let songs = store.currentList.songs;
        // songs.push({title: "untitled", artist:"untitled", youTubeId: "dQw4w9WgXcQ"})
        // store.updateSongs(id, songs);
        store.addSongTransaction();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={addClass}
                onClick = {handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={exitClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;