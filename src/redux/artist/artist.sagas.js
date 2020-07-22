import { takeLatest, put, all, call } from 'redux-saga/effects';

import ArtistActionTypes from './artist.types';

import {
  getArtistAlbums,
  getArtistRelated,
  getArtistTopTracks,
  getArtistDetails
} from '../../spotify/spotify.utils';

import {
  fetchArtistAlbumsSuccess,
  fetchArtistAlbumsFailure,
  fetchArtistRelatedSuccess,
  fetchArtistRelatedFailure,
  fetchArtistTracksSuccess,
  fetchArtistTracksFailure,
  fetchArtistByIdSuccess,
  fetchArtistByIdFailure
} from './artist.actions';

export function* beginFetchArtistAlbums({ payload: id }) {
  try {
    const albums = yield getArtistAlbums(id);
    yield put(fetchArtistAlbumsSuccess(albums));
  } catch (error) {
    yield put(fetchArtistAlbumsFailure(error));
  }
}

export function* beginFetchArtistRelated({ payload: id }) {
  try {
    const related = yield getArtistRelated(id);
    yield put(fetchArtistRelatedSuccess(related));
  } catch (error) {
    yield put(fetchArtistRelatedFailure(error));
  }
}

export function* beginFetchArtistTracks({ payload: id }) {
  try {
    const tracks = yield getArtistTopTracks(id);
    yield put(fetchArtistTracksSuccess(tracks));
  } catch (error) {
    yield put(fetchArtistTracksFailure(error));
  }
}

export function* beginFetchArtistDetails({ payload: id }) {
  try {
    const artist = yield getArtistDetails(id);
    yield put(fetchArtistByIdSuccess(artist));
  } catch (error) {
    yield put(fetchArtistByIdFailure(error));
  }
}

export function* onFetchArtistAlbums() {
  yield takeLatest(
    ArtistActionTypes.FETCH_ARTIST_ALBUMS_START,
    beginFetchArtistAlbums
  );
}

export function* onFetchArtistRelated() {
  yield takeLatest(
    ArtistActionTypes.FETCH_ARTIST_RELATED_START,
    beginFetchArtistRelated
  );
}

export function* onFetchArtistTracks() {
  yield takeLatest(
    ArtistActionTypes.FETCH_ARTIST_TRACKS_START,
    beginFetchArtistTracks
  );
}

export function* onFetchArtistDetails() {
  yield takeLatest(ArtistActionTypes.FETCH_ARTIST_START, beginFetchArtistDetails)
}

export function* artistSagas() {
  yield all([
    call(onFetchArtistAlbums),
    call(onFetchArtistTracks),
    call(onFetchArtistRelated),
    call(onFetchArtistDetails)
  ]);
}
