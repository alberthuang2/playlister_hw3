import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const DeleteListModal = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);

    function handleConfirmDeleteList() {
        store.deleteMarkedList();
    }
    function handleCancelDeleteList() {
        store.removeModal(null);
    }

    let name = "";
    let modalClass = "modal";
    if(store.currentModal === "DELETE_LIST")
        modalClass +=" is-visible";
    else
        modalClass = "modal";
    console.log(modalClass);
    if (store) {
        if(store.listKeyPairMarkedForDeletion)
        name = store.listKeyPairMarkedForDeletion.name;
    }
    return (
        <div
                id="delete-list-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                    Delete the {name} playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {name} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleConfirmDeleteList} value='Confirm' />
                        <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={handleCancelDeleteList} value='Cancel' />
                    </div>
                </div>
            </div>)
}

export default DeleteListModal;