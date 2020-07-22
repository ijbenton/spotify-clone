import { createSelector } from 'reselect';

const selectBrowse = state => state.browse;

export const selectGenres = createSelector(
  [selectBrowse],
  browse => browse.genres
);

export const selectFeaturedPlaylists = createSelector(
  [selectBrowse],
  browse => browse.featuredPlaylists
);

export const selectNewReleases = createSelector(
  [selectBrowse],
  browse => browse.newReleases
);

export const selectAlbumById = createSelector(
  [selectBrowse],
  browse => browse.album
);

export const selectGenrePlaylists = createSelector(
  [selectBrowse],
  browse => browse.genrePlaylists
);
