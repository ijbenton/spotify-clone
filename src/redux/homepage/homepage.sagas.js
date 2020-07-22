import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
  getRecommendations
} from '../../spotify/spotify.utils';

import {
  fetchRecentlyPlayedSuccess,
  fetchTopArtistsSuccess,
  fetchTopTracksSuccess,
  fetchRecommendationsSuccess,
  fetchRecentlyPlayedFailure,
  fetchTopArtistsFailure,
  fetchTopTracksFailure,
  fetchRecommendationsFailure
} from './homepage.actions';

import HomepageActionTypes from './homepage.types';

export function* fetchRecentlyPlayed() {
  try {
    const recentlyPlayed = yield getRecentlyPlayed();
    yield put(fetchRecentlyPlayedSuccess(recentlyPlayed));
  } catch (error) {
    yield put(fetchRecentlyPlayedFailure(error));
  }
}

export function* fetchTopArtists() {
  try {
    const topArtists = yield getTopArtists();
    yield put(fetchTopArtistsSuccess(topArtists));
  } catch (error) {
    yield put(fetchTopArtistsFailure(error));
  }
}
export function* fetchTopTracks() {
  try {
    const topTracks = yield getTopTracks();
    yield put(fetchTopTracksSuccess(topTracks));
  } catch (error) {
    yield put(fetchTopTracksFailure(error));
  }
}

export function* fetchRecommendations({
  payload: { trackSeeds, artistSeeds }
}) {
  try {
    const recommendations = yield getRecommendations(trackSeeds, artistSeeds);
    yield put(fetchRecommendationsSuccess(recommendations));
  } catch (error) {
    yield put(fetchRecommendationsFailure(error));
  }
}

export function* fetchRecentlyPlayedStart() {
  yield takeLatest(
    HomepageActionTypes.FETCH_RECENTLY_PLAYED_START,
    fetchRecentlyPlayed
  );
}

export function* fetchTopArtistsStart() {
  yield takeLatest(
    HomepageActionTypes.FETCH_TOP_ARTISTS_START,
    fetchTopArtists
  );
}
export function* fetchTopTracksStart() {
  yield takeLatest(HomepageActionTypes.FETCH_TOP_TRACKS_START, fetchTopTracks);
}

export function* fetchRecommendationsStart() {
  yield takeLatest(
    HomepageActionTypes.FETCH_RECOMMENDATIONS_START,
    fetchRecommendations
  );
}

export function* homepageSagas() {
  yield all([
    call(fetchRecentlyPlayedStart),
    call(fetchTopArtistsStart),
    call(fetchTopTracksStart),
    call(fetchRecommendationsStart)
  ]);
}
