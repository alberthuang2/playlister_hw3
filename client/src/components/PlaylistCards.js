import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import DeleteSongModal from './DeleteSongModal.js'
import DeleteListModal from './DeleteListModal.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let playlistCards = "";
    if (store) {
        playlistCards = store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
    }
    return (
        <div>
        <div id="playlist-cards">
        {
            playlistCards
        }
        <DeleteSongModal></DeleteSongModal>
        </div> 
               
        </div>
    )
}

export default PlaylistCards;