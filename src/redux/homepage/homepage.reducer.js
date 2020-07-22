import HomepageActionTypes from './homepage.types';

const INITIAL_STATE = {
  recentlyPlayed: null,
  recommendations: null,
  topArtists: null,
  topTracks: null,
  error: null
};

const homepageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomepageActionTypes.FETCH_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        topArtists: action.payload
      };
    case HomepageActionTypes.FETCH_TOP_TRACKS_SUCCESS:
      return {
        ...state,
        topTracks: action.payload
      };
    case HomepageActionTypes.FETCH_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        recentlyPlayed: action.payload
      };
    case HomepageActionTypes.FETCH_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        recommendations: action.payload
      };
    case HomepageActionTypes.UPDATE_LIKED_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload
      };
    case HomepageActionTypes.FETCH_TOP_ARTISTS_FAILURE:
    case HomepageActionTypes.FETCH_TOP_TRACKS_FAILURE:
    case HomepageActionTypes.FETCH_RECENTLY_PLAYED_FAILURE:
    case HomepageActionTypes.FETCH_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default homepageReducer;
