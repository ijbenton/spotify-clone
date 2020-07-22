import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackListItem from '../track-list-item/track-list-item.component';
import Spinner from '../spinner/spinner.component';

import { setCurrentTrackList } from '../../redux/player/player.actions';

import {
  selectIsPlaying,
  selectIsPaused,
  selectCurrentTrackList
} from '../../redux/player/player.selectors';

import './track-list.styles.scss';

const TrackList = ({
  tracks,
  setCurrentTrackList,
  title,
  isAlbum,
  isPlaylist,
  onResume,
  onPause,
  audioControl,
  isPlaying,
  isPaused,
  currentTrackList
}) => {
  // Album track lists will have a different track list grid than regular track list
  // So we must apply different style if it is an album tracklist
  let sectionStyles = null;
  if (tracks) {
    sectionStyles = !isAlbum ? 'track-sections' : 'album-track-sections';
  }
  // Scroll to top every initial render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onPlay = () => {
    // If playlist tracks match the current tracklist playing
    if (
      currentTrackList &&
      tracks.length > 0 &&
      JSON.stringify(tracks) === JSON.stringify(currentTrackList)
    ) {
      if (isPlaying && isPaused) {
        onResume();
      } else if (isPlaying && !isPaused) {
        onPause();
      }
    }
    // If playlist tracks do not match the current tracklist playing
    else if (tracks.length > 0) {
      setCurrentTrackList(tracks);
      audioControl(tracks[0]);
    }
  };
  return (
    <div>
      {tracks ? (
        <div className="track-list">
          <div className="track-list-container">
            <div className="track-list-details">
              {title ? <h1>{title}</h1> : null}
              {isAlbum || isPlaylist ? null : (
                <div className="button" onClick={onPlay}>
                  {currentTrackList &&
                  tracks.length > 0 &&
                  JSON.stringify(tracks) === JSON.stringify(currentTrackList) &&
                  isPlaying &&
                  !isPaused
                    ? 'PAUSE'
                    : 'PLAY'}
                </div>
              )}
            </div>
            <div className={sectionStyles}>
              <span></span>
              <h4>Title</h4>
              <h4>Artist</h4>
              {isAlbum ? null : <h4 className="album-section">Album</h4>}
              <h4 className="length-section">Length</h4>
            </div>
            {tracks.map((track, index) => (
              <TrackListItem
                key={index}
                track={track}
                tracks={tracks}
                isAlbum={isAlbum}
                onResume={onResume}
                onPause={onPause}
                audioControl={audioControl}
              />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isPlaying: selectIsPlaying,
  isPaused: selectIsPaused,
  currentTrackList: selectCurrentTrackList
});

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
