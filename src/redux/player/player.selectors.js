import { createSelector } from 'reselect';

const selectPlayer = state => state.player;

export const selectCurrentTrack = createSelector(
  [selectPlayer],
  player => player.currentTrack
);

export const selectCurrentTrackTime = createSelector([selectPlayer],
  player => player.currentTime)

export const selectPreviewUnavailable = createSelector(
  [selectPlayer],
  player => player.previewUnavailable
);

export const selectIsPlaying = createSelector(
  [selectPlayer],
  player => player.isPlaying
);
export const selectIsPaused = createSelector(
  [selectPlayer],
  player => player.isPaused
);

export const selectCurrentTrackList = createSelector(
  [selectPlayer],
  player => player.currentTrackList
);

export const selectCurrentTrackId = createSelector(
  [selectPlayer],
  player => player.currentTrackId
);
