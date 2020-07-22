import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  getBrowsingGenres,
  getNewReleases,
  getFeaturedPlaylists,
  getAlbumById,
  getGenrePlaylists
} from '../../spotify/spotify.utils';

import {
  fetchGenresSuccess,
  fetchNewReleasesSuccess,
  fetchFeaturedPlaylistsSuccess,
  fetchGenresFailure,
  fetchNewReleasesFailure,
  fetchFeaturedPlaylistsFailure,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,
  fetchGenrePlaylistsSuccess,
  fetchGenrePlaylistsFailure
} from './browse.actions';

import BrowseActionTypes from './browse.types';

export function* fetchGenresStart() {
  try {
    const genres = yield getBrowsingGenres();
    yield put(fetchGenresSuccess(genres));
  } catch (error) {
    yield put(fetchGenresFailure(error));
  }
}

export function* fetchNewReleases() {
  try {
    const newReleases = yield getNewReleases();
    yield put(fetchNewReleasesSuccess(newReleases));
  } catch (error) {
    yield put(fetchNewReleasesFailure(error));
  }
}

export function* fetchFeaturedPlaylists() {
  try {
    const featuredPlaylists = yield getFeaturedPlaylists();
    yield put(fetchFeaturedPlaylistsSuccess(featuredPlaylists));
  } catch (error) {
    yield put(fetchFeaturedPlaylistsFailure(error));
  }
}

export function* fetchAlbumById({ payload: id }) {
  try {
    const album = yield getAlbumById(id);
    yield put(fetchAlbumByIdSuccess(album));
  } catch (error) {
    yield put(fetchAlbumByIdFailure(error));
  }
}

export function* fetchGenrePlaylists({ payload: genre }) {
  try {
    const playlists = yield getGenrePlaylists(genre);
    yield put(fetchGenrePlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchGenrePlaylistsFailure(error));
  }
}

export function* onFetchGenresStart() {
  yield takeLatest(BrowseActionTypes.FETCH_GENRES_START, fetchGenresStart);
}

export function* onFetchNewReleases() {
  yield takeLatest(
    BrowseActionTypes.FETCH_NEW_RELEASES_START,
    fetchNewReleases
  );
}

export function* onFetchFeaturedPlaylists() {
  yield takeLatest(
    BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_START,
    fetchFeaturedPlaylists
  );
}

export function* onFetchAlbumById() {
  yield takeLatest(BrowseActionTypes.FETCH_ALBUM_BY_ID_START, fetchAlbumById);
}

export function* onFetchGenrePlaylists() {
  yield takeLatest(
    BrowseActionTypes.FETCH_GENRE_PLAYLISTS_START,
    fetchGenrePlaylists
  );
}

export function* browseSagas() {
  yield all([
    call(onFetchGenresStart),
    call(onFetchNewReleases),
    call(onFetchFeaturedPlaylists),
    call(onFetchAlbumById),
    call(onFetchGenrePlaylists)
  ]);
}
