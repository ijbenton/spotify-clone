import PlaylistActionTypes from './playlist.types';

export const fetchUserPlaylists = () => ({
  type: PlaylistActionTypes.FETCH_USER_PLAYLISTS_START
});

export const fetchUserPlaylistsSuccess = playlists => ({
  type: PlaylistActionTypes.FETCH_USER_PLAYLISTS_SUCCESS,
  payload: playlists
});

export const fetchUserPlaylistsFailure = error => ({
  type: PlaylistActionTypes.FETCH_USER_PLAYLISTS_FAILURE,
  payload: error
});
