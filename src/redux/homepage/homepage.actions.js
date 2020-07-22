import HomepageActionTypes from './homepage.types';

export const fetchRecentlyPlayed = () => ({
  type: HomepageActionTypes.FETCH_RECENTLY_PLAYED_START
});

export const fetchRecentlyPlayedSuccess = recentlyPlayed => ({
  type: HomepageActionTypes.FETCH_RECENTLY_PLAYED_SUCCESS,
  payload: recentlyPlayed
});

export const fetchRecentlyPlayedFailure = error => ({
  type: HomepageActionTypes.FETCH_RECENTLY_PLAYED_FAILURE,
  payload: error
});

export const fetchTopArtists = () => ({
  type: HomepageActionTypes.FETCH_TOP_ARTISTS_START
});

export const fetchTopArtistsSuccess = topArtists => ({
  type: HomepageActionTypes.FETCH_TOP_ARTISTS_SUCCESS,
  payload: topArtists
});

export const fetchTopArtistsFailure = error => ({
  type: HomepageActionTypes.FETCH_TOP_ARTISTS_FAILURE,
  payload: error
});

export const fetchTopTracks = () => ({
  type: HomepageActionTypes.FETCH_TOP_TRACKS_START
});

export const fetchTopTracksSuccess = topTracks => ({
  type: HomepageActionTypes.FETCH_TOP_TRACKS_SUCCESS,
  payload: topTracks
});

export const fetchTopTracksFailure = error => ({
  type: HomepageActionTypes.FETCH_TOP_TRACKS_FAILURE,
  payload: error
});

export const fetchRecommendations = (trackSeeds, artistSeeds) => ({
  type: HomepageActionTypes.FETCH_RECOMMENDATIONS_START,
  payload: { trackSeeds, artistSeeds }
});

export const fetchRecommendationsSuccess = tracks => ({
  type: HomepageActionTypes.FETCH_RECOMMENDATIONS_SUCCESS,
  payload: tracks
});

export const fetchRecommendationsFailure = error => ({
  type: HomepageActionTypes.FETCH_RECOMMENDATIONS_FAILURE,
  payload: error
});

export const updateLikedRecommendations = newLikedTracks => ({
  type: HomepageActionTypes.UPDATE_LIKED_RECOMMENDATIONS,
  payload: newLikedTracks
});
