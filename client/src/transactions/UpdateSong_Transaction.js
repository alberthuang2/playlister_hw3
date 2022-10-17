import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, index, newSong) {
        super();
        this.app = initApp;
        this.index = index;
        this.oldSong = {"artist":this.app.currentList.songs[index].artist, "title":this.app.currentList.songs[index].title, "youTubeId":this.app.currentList.songs[index].youTubeId}
        this.newSong = newSong;
    }

    doTransaction() {
        this.app.editSong(this.index, this.newSong)

    }
    
    undoTransaction() {
        this.app.editSong(this.index, this.oldSong);
    }
}