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
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, start, end) {
        super();
        this.app = initApp;
        this.start = start;
        this.end = end;
    }

    doTransaction() {
        this.app.drag(this.start, this.end);
    }
    
    undoTransaction() {
        console.log("here")
        this.app.drag(this.end, this.start);
    }
}