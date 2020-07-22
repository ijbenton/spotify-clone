import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOpen } from '@fortawesome/free-regular-svg-icons';

import { setCurrentTrackList } from '../../redux/player/player.actions';

import {
  selectIsPlaying,
  selectIsPaused,
  selectCurrentTrack,
  selectPreviewUnavailable,
  selectCurrentTrackList
} from '../../redux/player/player.selectors';

import { msToTime, likeTrack, unlikeTrack } from '../../spotify/spotify.utils';

import './track-list-item.styles.scss';

const TrackListItem = React.memo(
  ({
    track,
    tracks,
    isPlaying,
    isAlbum,
    isPaused,
    onResume,
    onPause,
    audioControl,
    currentTrack,
    isPreviewUnavailable,
    setCurrentTrackList,
    currentTracklist
  }) => {
    // If tracklist is for a album style will be different
    let trackStyles = !isAlbum ? 'list-track' : 'album-track';
    const [isLiked, setIsLiked] = useState(track.saved);
    useEffect(() => {
      setIsLiked(track.saved);
    }, [track.saved]);

    const onLike = id => {
      setIsLiked(true);
      likeTrack(id);
    };
    const onUnlike = id => {
      setIsLiked(false);
      unlikeTrack(id);
    };
    const handleTrackClick = e => {
      // Handle click on like icon
      if (
        e.target.parentElement.classList.contains('like-icon') ||
        e.target.classList.contains('like-icon')
      ) {
        isLiked ? onUnlike(track.id) : onLike(track.id);
      }
      // Handle click on track to either play or pause
      else if (
        !e.target.parentElement.parentElement.classList.contains(
          'track-artist'
        ) &&
        !e.target.parentElement.parentElement.classList.contains('track-album')
      ) {
        if (!isPreviewUnavailable) {
          if (currentTrack && track.id === currentTrack.id && isPlaying) {
            if (!isPaused) {
              onPause();
            } else {
              onResume();
            }
          } else {
            audioControl(track);
            if (!currentTracklist) {
              setCurrentTrackList(tracks);
            }
          }
        } else if (isPreviewUnavailable && track.id !== currentTrack.id) {
          audioControl(track);
          if (!currentTracklist) {
            setCurrentTrackList(tracks);
          }
        }
      }

      e.preventDefault();
    };

    return (
      <div className={`track ${trackStyles}`} onClick={handleTrackClick}>
        <FontAwesomeIcon
          className="like-icon"
          icon={isLiked ? faHeart : faHeartOpen}
        />
        <h4 className="track-title">{track.name}</h4>
        <div className="track-artist">
          {track.artists.length > 1 ? (
            track.artists.map((artist, index) =>
              index === track.artists.length - 1 ? (
                <Link to={`/artists/${artist.id}`} key={index}>
                  <span>{artist.name}</span>
                </Link>
              ) : (
                <Link to={`/artists/${artist.id}`} key={index}>
                  <span>{`${artist.name}, `}</span>
                </Link>
              )
            )
          ) : (
            <Link to={`/artists/${track.artists[0].id}`}>
              <span>{track.artists[0].name}</span>
            </Link>
          )}
        </div>
        {!isAlbum ? (
          <div className="track-album">
            <Link to={`/albums/${track.album.id}`}>
              <span>{track.album.name}</span>
            </Link>
          </div>
        ) : null}
        <h4 className="track-length">{msToTime(track.duration_ms)}</h4>
        <FontAwesomeIcon
          icon={
            currentTrack &&
            track.id === currentTrack.id &&
            ((isPlaying && !isPaused) || isPreviewUnavailable)
              ? faPauseCircle
              : faPlayCircle
          }
          className="play-icon"
        />
      </div>
    );
  },
  // Track list item only rerenders if it's track has changed or
  // if the trackPlayer's currentTrack is or just was equal to the track list item
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.track) === JSON.stringify(nextProps.track) &&
      ((prevProps.currentTrack &&
        prevProps.currentTrack.id !== prevProps.track.id) ||
        !prevProps.currentTrack) &&
      nextProps.currentTrack &&
      nextProps.currentTrack.id !== nextProps.track.id
    ) {
      return true;
    }
  }
);

const mapStateToProps = createStructuredSelector({
  isPlaying: selectIsPlaying,
  isPaused: selectIsPaused,
  currentTrack: selectCurrentTrack,
  isPreviewUnavailable: selectPreviewUnavailable,
  currentTrackList: selectCurrentTrackList
});

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackListItem);
