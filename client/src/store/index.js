import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// state of current modal
export const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}


// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    REMOVE_MODAL: "REMOVE_MODAL",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    SET_SONG_NAME_EDIT_ACTIVE: "SET_SONG_NAME_EDIT_ACTIVE",
    UPDATE_TITLE: "UPDATE_TITLE",
    UPDATE_ARTIST: "UPDATE_ARTIST",
    UPDATE_YOUTUBEID: "UPDATE_YOUTUBEID"

}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        currentModal: CurrentModal.NONE,
        listKeyPairMarkedForDeletion : null,
        songIndexForDeletion: -1,
        songEditIndex: -1,
        editTitle : "",
        editArtist: "",
        editYouTubeId: ""
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.DELETE_LIST,
                    listKeyPairMarkedForDeletion : payload,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // PREPARE TO DELETE SONG
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.REMOVE_SONG,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: payload,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            // START EDITING A SONG NAME
             case GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    currentModal: CurrentModal.EDIT_SONG,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: payload,
                    editTitle : store.currentList.songs[payload].title,
                    editArtist: store.currentList.songs[payload].artist,
                    editYouTubeId: store.currentList.songs[payload].youTubeId
                });
            }
            // REMOVE MODAL
             case GlobalStoreActionType.REMOVE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: CurrentModal.NONE,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: -1,
                    editTitle : "",
                    editArtist: "",
                    editYouTubeId: ""
                });
            }
            case GlobalStoreActionType.UPDATE_TITLE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: store.songEditIndex,
                    editTitle : payload,
                    editArtist: store.editArtist,
                    editYouTubeId: store.editYouTubeId
                });
            }
            case GlobalStoreActionType.UPDATE_ARTIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: store.songEditIndex,
                    editTitle : store.editTitle,
                    editArtist: payload,
                    editYouTubeId: store.editYouTubeId
                });
            }

            case GlobalStoreActionType.UPDATE_YOUTUBEID: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal: store.currentModal,
                    listKeyPairMarkedForDeletion : null,
                    songIndexForDeletion: -1,
                    songEditIndex: store.songEditIndex,
                    editTitle : store.editTitle,
                    editArtist: store.editArtist,
                    editYouTubeId: payload
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                console.log(response);
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    console.log(playlist)
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    console.log(response);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            console.log(response)
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    store.updateSongs = function (id, newSongs) {
        // GET THE LIST
        async function asyncUpdateSongs(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                console.log(response);
                let playlist = response.data.playlist;
                playlist.songs = newSongs;
                async function updateList(playlist) {
                    console.log(playlist)
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    console.log(response);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            console.log(response)
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncUpdateSongs(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.markDeleteList = function (id) {
        async function asyncMarkDeleteList(id) {
            console.log(id)
            let response = await api.getPlaylistById(id);
            console.log(response);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: playlist
                    });
                }
            }
        }
        asyncMarkDeleteList(id);
    }

      store.markDeleteSong = function (index) {
         storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: index
        });
    }
    store.updateTitle = function (title) {
         storeReducer({
            type: GlobalStoreActionType.UPDATE_TITLE,
            payload: title
        });       
    }
    store.updateArtist = function (artist) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_ARTIST,
                payload: artist
            });       
        }
    store.updateYouTubeId = function (youtubeId) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_YOUTUBEID,
            payload:youtubeId
        });       
    }
    store.deleteMarkedList = function(){
        async function asyncDeleteMarkedList() {
            let response = await api.deletePlaylistById(store.listKeyPairMarkedForDeletion._id);
            if (response.data.success) {
                console.log("success");
                    store.removeModal();

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: null
                    });
                    store.loadIdNamePairs();
                }
            }
        }
        asyncDeleteMarkedList();
    }

    store.createNewList = function(){
         async function asyncCreateNewList() {
            let response = await api.createPlaylist();
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: playlist
                    });
                    store.setCurrentList(playlist._id)
                }
            }
        }
        asyncCreateNewList();
    }

    store.removeModal = function(){
            storeReducer({
                type: GlobalStoreActionType.REMOVE_MODAL,
                payload: null
            });
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    store.setSongNameActive = function (index) {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE,
            payload: index
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}