import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    
    // drag and drop
    function handleDragStart(event){
        event.dataTransfer.setData("song", index);
        store.updateDrag(true, store.draggedTo)
        // this.setState(prevState => ({
        //     isDragging: true,
        //     draggedTo: prevState.draggedTo
        // }));
    }
    function handleDragOver(event){
        event.preventDefault();
        store.updateDrag(store.isDragging, true)
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    function handleDragEnter(event){
        event.preventDefault();
        store.updateDrag(store.isDragging, true)
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    function handleDragLeave(event){
        event.preventDefault();
        store.updateDrag(store.isDragging, false)

        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: false
        // }));
    }
    function handleDrop(event){
        event.preventDefault();
        let end = index; //
        let start = Number(event.dataTransfer.getData("song")); //
        //let songs = store.currentList.songs;
        store.updateDrag(false, false)

        // let list = store.currentList
        // // WE NEED TO UPDATE THE STATE FOR THE APP
        // if (start < end) {
        //     let temp = list.songs[start];
        //     for (let i = start; i < end; i++) {
        //         list.songs[i] = list.songs[i + 1];
        //     }
        //     list.songs[end] = temp;
        // }
        // else if (start > end) {
        //     let temp = list.songs[start];
        //     for (let i = start; i > end; i--) {
        //         list.songs[i] = list.songs[i - 1];
        //     }
        //     list.songs[end] = temp;
        // }
        // store.updateSongs(store.currentList._id, songs)
        store.dragTransaction(start,end)
        // this.setState(prevState => ({
        //     isDragging: false,
        //     draggedTo: false
        // }));

        // ASK THE MODEL TO MOVE THE DATA
        //this.props.moveCallback(sourceIndex, targetIndex);
    }

    function handleDelete() {
        store.markDeleteSong(index);
    }

    function handleDoubleClick(){
        store.setSongNameActive(index);
    }
    
    
    let songCard = 
 <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            draggable = {true}
            onDoubleClick = {handleDoubleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick ={handleDelete}
            />
        </div>
    return (
       songCard
    );
}

export default SongCard;