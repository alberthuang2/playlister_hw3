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
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, index) {
        super();
        this.app = initApp;
        this.index = index;
        this.song = this.app.currentList.songs[index]
    }

    doTransaction() {
        this.app.removeSong(this.index);
    }
    
    undoTransaction() {
        this.app.addSongAtIndex(this.index, this.song);
    }
}