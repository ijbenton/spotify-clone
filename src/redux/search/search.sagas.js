import { takeLatest, put, all, call } from 'redux-saga/effects';

import { searchSpotify } from '../../spotify/spotify.utils';

import { onSearchSuccess, onSearchFailure } from './search.actions';

import SearchActionTypes from './search.types';

export function* beginSearch({ payload: term }) {
  try {
    const searchResults = yield searchSpotify(term);
    yield put(onSearchSuccess(searchResults));
  } catch (error) {
    yield put(onSearchFailure(error));
  }
}

export function* onSearchStart() {
  yield takeLatest(SearchActionTypes.START_SEARCH, beginSearch);
}

export function* searchSagas() {
  yield all([call(onSearchStart)]);
}
