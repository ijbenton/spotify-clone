import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  getCurrentUser,
  getUserSavedAlbums,
  getUserLikedSongs,
  getUserFollowedArtists
} from '../../spotify/spotify.utils';

import {
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchUserAlbumsSuccess,
  fetchUserAlbumsFailure,
  fetchUserSongsSuccess,
  fetchUserSongsFailure,
  fetchUserFollowedArtistsSuccess,
  fetchUserFollowedArtistsFailure
} from './user.actions';

import UserActionTypes from './user.types';

export function* beginFetchUser() {
  try {
    const user = yield getCurrentUser();
    yield put(fetchCurrentUserSuccess(user));
  } catch (error) {
    yield put(fetchCurrentUserFailure(error));
  }
}

export function* beginFetchUserAlbums() {
  try {
    const albums = yield getUserSavedAlbums();
    yield put(fetchUserAlbumsSuccess(albums));
  } catch (error) {
    yield put(fetchUserAlbumsFailure(error));
  }
}

export function* beginFetchUserSongs() {
  try {
    const songs = yield getUserLikedSongs();
    yield put(fetchUserSongsSuccess(songs));
  } catch (error) {
    yield put(fetchUserSongsFailure(error));
  }
}

export function* beginFetchUserArtists() {
  try {
    const artists = yield getUserFollowedArtists();
    yield put(fetchUserFollowedArtistsSuccess(artists));
  } catch (error) {
    yield put(fetchUserFollowedArtistsFailure(error));
  }
}

export function* onFetchUserStart() {
  yield takeLatest(UserActionTypes.FETCH_CURRENT_USER_START, beginFetchUser);
}

export function* onFetchUserAlbums() {
  yield takeLatest(
    UserActionTypes.FETCH_USER_ALBUMS_START,
    beginFetchUserAlbums
  );
}

export function* onFetchUserSongs() {
  yield takeLatest(UserActionTypes.FETCH_USER_SONGS_START, beginFetchUserSongs);
}

export function* onFetchUserArtists() {
  yield takeLatest(
    UserActionTypes.FETCH_USER_ARTISTS_START,
    beginFetchUserArtists
  );
}

export function* userSagas() {
  yield all([
    call(onFetchUserStart),
    call(onFetchUserAlbums),
    call(onFetchUserSongs),
    call(onFetchUserArtists)
  ]);
}
