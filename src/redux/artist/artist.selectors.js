import { createSelector } from 'reselect';

const selectArtist = state => state.artist;

export const selectArtistAlbums = createSelector(
  [selectArtist],
  artist => artist.artistAlbums
);

export const selectArtistTopTracks = createSelector(
  [selectArtist],
  artist => artist.artistTracks
);

export const selectArtistRelatedArtists = createSelector(
  [selectArtist],
  artist => artist.artistRelated
);

export const selectArtistDetails = createSelector(
  [selectArtist],
  artist => artist.artistDetails
);
