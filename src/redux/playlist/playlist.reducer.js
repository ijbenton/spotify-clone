import PlaylistActionTypes from './playlist.types';

const INITIAL_STATE = {
  error: null,
  userPlaylists: null
};

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlaylistActionTypes.FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        userPlaylists: action.payload
      };
    case PlaylistActionTypes.FETCH_USER_PLAYLISTS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default playlistReducer;
