import PlayerActionTypes from './player.types';

export const setCurrentTrack = track => ({
  type: PlayerActionTypes.SET_CURRENT_TRACK,
  payload: track
});

export const playSong = song => ({
  type: PlayerActionTypes.PLAY_TRACK,
  song
});

export const resumeSong = () => ({
  type: PlayerActionTypes.RESUME_TRACK
});

export const pauseSong = () => ({
  type: PlayerActionTypes.PAUSE_TRACK
});

export const stopSong = () => ({
  type: PlayerActionTypes.STOP_TRACK
});

export const setCurrentTrackList = trackList => ({
  type: PlayerActionTypes.SET_CURRENT_TRACKLIST,
  payload: trackList
});

export const setUnavailableTrack = song => ({
  type: PlayerActionTypes.SET_UNAVAILABLE_TRACK,
  song
});
