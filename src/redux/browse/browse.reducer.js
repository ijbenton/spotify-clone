import BrowseActionTypes from './browse.types';

const INITIAL_STATE = {
  genres: null,
  featuredPlaylists: null,
  genrePlaylists: null,
  newReleases: null,
  album: null,
  error: null
};

const browseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BrowseActionTypes.RESET_ALBUM:
      return {
        ...state,
        album: null
      };
    case BrowseActionTypes.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload
      };
    case BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS:
      return {
        ...state,
        featuredPlaylists: action.payload
      };
    case BrowseActionTypes.FETCH_NEW_RELEASES_SUCCESS:
      return {
        ...state,
        newReleases: action.payload
      };

    case BrowseActionTypes.FETCH_ALBUM_BY_ID_SUCCESS:
      return {
        ...state,
        album: action.payload
      };
    case BrowseActionTypes.FETCH_GENRE_PLAYLISTS_SUCCESS:
      return {
        ...state,
        genrePlaylists: action.payload
      };

    case BrowseActionTypes.FETCH_GENRES_FAILURE:
    case BrowseActionTypes.FETCH_NEW_RELEASES_FAILURE:
    case BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_FAILURE:
    case BrowseActionTypes.FETCH_ALBUM_BY_ID_FAILURE:
    case BrowseActionTypes.FETCH_GENRE_PLAYLISTS_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default browseReducer;
