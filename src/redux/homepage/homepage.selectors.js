import { createSelector } from 'reselect';

const selectHomepage = state => state.homepage;

export const selectRecentlyPlayed = createSelector(
  [selectHomepage],
  homepage => homepage.recentlyPlayed
);

export const selectTopArtists = createSelector(
  [selectHomepage],
  homepage => homepage.topArtists
);

export const selectTopTracks = createSelector(
  [selectHomepage],
  homepage => homepage.topTracks
);

export const selectRecommendations = createSelector(
  [selectHomepage],
  homepage => homepage.recommendations
);
