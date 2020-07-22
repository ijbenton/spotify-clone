import PlayerActionTypes from './player.types';

const INITIAL_STATE = {
  currentTrack: null,
  currentTrackId: null,
  isPlaying: false,
  isPaused: true,
  currentTrackList: null,
  previewUnavailable: false
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    case PlayerActionTypes.SET_CURRENT_TRACKLIST:
      return {
        ...state,
        currentTrackList: action.payload
      };
    case PlayerActionTypes.SET_UNAVAILABLE_TRACK:
      return {
        ...state,
        isPlaying: false,
        currentTrack: action.song,
        isPaused: true,
        currentTrackId: action.song.id,
        previewUnavailable: true
      };

    case PlayerActionTypes.PLAY_TRACK:
      return {
        ...state,
        isPlaying: true,
        currentTrack: action.song,
        isPaused: false,
        currentTrackId: action.song.id,
        previewUnavailable: false
      };
    case PlayerActionTypes.STOP_TRACK:
      return {
        ...state,
        isPlaying: false,
        currentTrack: null,
        isPaused: true
      };
    case PlayerActionTypes.PAUSE_TRACK:
      return {
        ...state,
        isPaused: true
      };
    case PlayerActionTypes.RESUME_TRACK:
      return {
        ...state,
        isPaused: false
      };
    default:
      return state;
  }
};

export default playerReducer;
