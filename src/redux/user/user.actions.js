import UserActionTypes from './user.types';

export const fetchCurrentUser = () => ({
  type: UserActionTypes.FETCH_CURRENT_USER_START
});

export const fetchCurrentUserSuccess = user => ({
  type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: user
});

export const fetchCurrentUserFailure = error => ({
  type: UserActionTypes.FETCH_CURRENT_USER_FAILURE,
  payload: error
});

export const fetchUserAlbums = () => ({
  type: UserActionTypes.FETCH_USER_ALBUMS_START
});

export const fetchUserAlbumsSuccess = albums => ({
  type: UserActionTypes.FETCH_USER_ALBUMS_SUCCESS,
  payload: albums
});

export const fetchUserAlbumsFailure = error => ({
  type: UserActionTypes.FETCH_USER_ALBUMS_FAILURE,
  payload: error
});

export const fetchUserSongs = () => ({
  type: UserActionTypes.FETCH_USER_SONGS_START
});

export const fetchUserSongsSuccess = songs => ({
  type: UserActionTypes.FETCH_USER_SONGS_SUCCESS,
  payload: songs
});

export const fetchUserSongsFailure = error => ({
  type: UserActionTypes.FETCH_USER_SONGS_FAILURE,
  payload: error
});

export const fetchUserFollowedArtists = () => ({
  type: UserActionTypes.FETCH_USER_ARTISTS_START
});

export const fetchUserFollowedArtistsSuccess = artists => ({
  type: UserActionTypes.FETCH_USER_ARTISTS_SUCCESS,
  payload: artists
});

export const fetchUserFollowedArtistsFailure = error => ({
  type: UserActionTypes.FETCH_USER_ARTISTS_FAILURE,
  payload: error
});
