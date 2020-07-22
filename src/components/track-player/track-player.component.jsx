import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
  faStepForward,
  faStepBackward,
  faFrown
} from '@fortawesome/free-solid-svg-icons';

import {
  selectCurrentTrack,
  selectIsPlaying,
  selectIsPaused,
  selectCurrentTrackList,
  selectPreviewUnavailable
} from '../../redux/player/player.selectors';

import './track-player.styles.scss';

const TrackPlayer = ({
  currentTrack,
  currentTrackList,
  audioControl,
  isPreviewUnavailable,
  isPlaying,
  isPaused,
  onResume,
  onPause
}) => {
  const onNextTrack = () => {
    if (!currentTrack) {
      return;
    }
    let nextTrackIndex =
      currentTrackList.findIndex(track => track.id === currentTrack.id) + 1;
    if (
      nextTrackIndex !== -1 &&
      nextTrackIndex < currentTrackList.length &&
      currentTrackList[nextTrackIndex].artists
    ) {
      audioControl(currentTrackList[nextTrackIndex]);
    }
  };

  const onPrevTrack = () => {
    if (!currentTrack) {
      return;
    }
    let nextTrackIndex =
      currentTrackList.findIndex(track => track.id === currentTrack.id) - 1;
    if (nextTrackIndex > -1 && nextTrackIndex < currentTrackList.length) {
      audioControl(currentTrackList[nextTrackIndex]);
    }
  };

  let trackPreviewError = isPreviewUnavailable ? (
    <div className="preview-error">
      <h5>TRACK PREVIEW UNAVAILABLE</h5>
      <FontAwesomeIcon icon={faFrown} />
    </div>
  ) : null;

  return (
    <div className="track-player">
      {currentTrack ? (
        <div
          className={
            isPreviewUnavailable
              ? 'track-player-container no-preview'
              : 'track-player-container'
          }
        >
          {currentTrack ? (
            <div className="track-player-details">
              <img
                src={currentTrack.album.images[0].url}
                alt={currentTrack.name}
              />

              <div className="track-player-info">
                <div className="track-player-title">{currentTrack.name}</div>
                <div className="track-player-artist">
                  {currentTrack.artists[0].name}
                </div>
              </div>
            </div>
          ) : null}

          <div className="track-player-controls">
            <FontAwesomeIcon icon={faStepBackward} onClick={onPrevTrack} />
            {isPlaying && !isPaused ? (
              <FontAwesomeIcon icon={faPauseCircle} onClick={onPause} />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} onClick={onResume} />
            )}

            <FontAwesomeIcon icon={faStepForward} onClick={onNextTrack} />
          </div>
          {trackPreviewError}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isPlaying: selectIsPlaying,
  isPaused: selectIsPaused,
  currentTrack: selectCurrentTrack,
  currentTrackList: selectCurrentTrackList,
  isPreviewUnavailable: selectPreviewUnavailable
});

export default connect(mapStateToProps)(TrackPlayer);
