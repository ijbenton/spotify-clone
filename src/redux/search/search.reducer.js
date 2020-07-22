import SearchActionTypes from './search.types';

const INITIAL_STATE = {
  searchResults: [],
  error: null
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload
      };
    case SearchActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
