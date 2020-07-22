import ArtistActionTypes from './artist.types';

const INITIAL_STATE = {
  artistTracks: null,
  artistAlbums: null,
  artistRelated: null,
  artistDetails: null,
  error: null
};

const artistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ArtistActionTypes.RESET_ARTIST:
      return {
        ...state,
        artistTracks: null,
        artistAlbums: null,
        artistRelated: null,
        artistDetails: null
      };
    case ArtistActionTypes.FETCH_ARTIST_SUCCESS:
      return {
        ...state,
        artistDetails: action.payload
      };
    case ArtistActionTypes.FETCH_ARTIST_TRACKS_SUCCESS:
      return {
        ...state,
        artistTracks: action.payload
      };
    case ArtistActionTypes.FETCH_ARTIST_RELATED_SUCCESS:
      return {
        ...state,
        artistRelated: action.payload
      };
    case ArtistActionTypes.FETCH_ARTIST_ALBUMS_SUCCESS:
      return {
        ...state,
        artistAlbums: action.payload
      };
    case ArtistActionTypes.FETCH_ARTIST_ALBUMS_FAILURE:
    case ArtistActionTypes.FETCH_ARTIST_RELATED_FAILURE:
    case ArtistActionTypes.FETCH_ARTIST_TRACKS_FAILURE:
    case ArtistActionTypes.FETCH_ARTIST_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default artistReducer;
