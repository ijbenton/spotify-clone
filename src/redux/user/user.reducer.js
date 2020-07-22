import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  likedSongs: null,
  savedAlbums: null,
  followedArtists: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.FETCH_USER_ALBUMS_SUCCESS:
      return {
        ...state,
        savedAlbums: action.payload
      };
    case UserActionTypes.FETCH_USER_SONGS_SUCCESS:
      return {
        ...state,
        likedSongs: action.payload
      };
    case UserActionTypes.FETCH_USER_ARTISTS_SUCCESS:
      return {
        ...state,
        followedArtists: action.payload
      };
    case UserActionTypes.FETCH_USER_ARTISTS_FAILURE:
    case UserActionTypes.FETCH_CURRENT_USER_FAILURE:
    case UserActionTypes.FETCH_USER_SONGS_FAILURE:
    case UserActionTypes.FETCH_USER_ALBUMS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
