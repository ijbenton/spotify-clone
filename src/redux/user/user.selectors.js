import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectLikedSongs = createSelector(
  [selectUser],
  user => user.likedSongs
);

export const selectSavedAlbums = createSelector(
  [selectUser],
  user => user.savedAlbums
);

export const selectFollowedArtists = createSelector(
  [selectUser],
  user => user.followedArtists
);

export const selectIsOptionsOpen = createSelector([selectUser],
  user => user.isOptionsOpen)
