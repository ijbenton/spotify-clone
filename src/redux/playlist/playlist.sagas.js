import { takeLatest, put, all, call } from 'redux-saga/effects';

import { getUserPlaylists } from '../../spotify/spotify.utils';

import {
  fetchUserPlaylistsSuccess,
  fetchUserPlaylistsFailure
} from './playlist.actions';

import PlaylistActionTypes from './playlist.types';

export function* fetchUserPlaylists() {
  try {
    const playlists = yield getUserPlaylists();
    yield put(fetchUserPlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchUserPlaylistsFailure(error));
  }
}

export function* fetchUserPlaylistsStart() {
  yield takeLatest(
    PlaylistActionTypes.FETCH_USER_PLAYLISTS_START,
    fetchUserPlaylists
  );
}

export function* playlistSagas() {
  yield all([call(fetchUserPlaylistsStart)]);
}
