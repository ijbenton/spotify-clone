import SearchActionTypes from './search.types';

export const search = term => ({
  type: SearchActionTypes.START_SEARCH,
  payload: term
});

export const onSearchSuccess = searchResults => ({
  type: SearchActionTypes.SEARCH_SUCCESS,
  payload: searchResults
});

export const onSearchFailure = error => ({
  type: SearchActionTypes.SEARCH_FAILURE,
  payload: error
});
