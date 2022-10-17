import React, { StrictMode, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const EditSongModal = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    function handleConfirmEditSong() {
        // let newSongs = store.currentList.songs;
        // let newSong = newSongs[store.songEditIndex]
        // newSong.title = store.editTitle;
        // newSong.artist = store.editArtist
        // newSong.youTubeId = store.editYouTubeId
        // store.updateSongs(store.currentList._id, newSongs);
        store.editSongTransaction(store.songEditIndex);
    }
    function handleCancelEditSong() {
        store.removeModal(null);
    }

    function handleUpdateTitle(event){
        store.updateTitle(event.target.value)
    }

    function handleUpdateArtist(event){
        store.updateArtist(event.target.value)
    }

     function handleUpdateYouTubeId(event){
        store.updateYouTubeId(event.target.value)
    }
  

    let modalClass = "modal";
    let song =""
    if(store.currentModal === "EDIT_SONG"){ 
        modalClass +=" is-visible";
        //reset()
        
        if (store) {
        let editIndex = store.songEditIndex;
        if(editIndex!==-1){
        song = store.currentList.songs[editIndex];
            
        }
    }
    }else{
        modalClass = "modal"
    }
    return (
         <div
                id="edit-song-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div
                    id='edit-song-root'
                    className="modal-root">
                    <div
                        id="edit-song-modal-header"
                        className="modal-north">Edit Song</div>
                    <div
                        id="edit-song-modal-content"
                        className="modal-center">
                        <div id="title-prompt" className="modal-prompt">Title:</div>
                        <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" value={store.editTitle} onChange={handleUpdateTitle}/>
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" value={store.editArtist} onChange={handleUpdateArtist} />
                        <div id="you-tube-id-prompt" className="modal-prompt">YouTube Id:</div>
                        <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" value={store.editYouTubeId} onChange={handleUpdateYouTubeId} />
                    </div>
                    <div className="modal-south">
                        <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={handleConfirmEditSong} />
                        <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={handleCancelEditSong} />
                    </div>
                </div>
            </div>
            )
}

export default EditSongModal;