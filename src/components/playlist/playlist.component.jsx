import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOpen } from '@fortawesome/free-regular-svg-icons';

import TrackList from '../../components/track-list/track-list.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectIsPlaying,
  selectIsPaused,
  selectCurrentTrackList
} from '../../redux/player/player.selectors';

import { setCurrentTrackList } from '../../redux/player/player.actions';
import { fetchUserPlaylists } from '../../redux/playlist/playlist.actions';

import {
  getPlaylistTracks,
  checkIfPlaylistFollowed,
  followPlaylist,
  unfollowPlaylist
} from '../../spotify/spotify.utils';

import './playlist.styles.scss';

const Playlist = ({
  playlistId,
  playlistDetails,
  onPause,
  onResume,
  audioControl,
  isPlaying,
  isPaused,
  currentTrackList,
  setCurrentTrackList,
  fetchUserPlaylists
}) => {
  // Refs keep track of previous playlist so component does not render until new playlist is fetched
  const prevPlaylist = useRef();
  const prevPlaylistId = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Dont fetch playlists if playlist id is same as previous
    if (playlistId !== prevPlaylistId.current) {
      //Fetch playlist tracks when the playlist id changes and on initial render
      getPlaylistTracks(playlistId)
        .then(tracks => {
          setPlaylistTracks(tracks.map(track => track.track));
          // Store prev playlist ref as JSON for comparison
          prevPlaylist.current = JSON.stringify(
            tracks.map(track => track.track)
          );
          prevPlaylistId.current = playlistId;
        })
        .catch(err => console.log(err));
      checkIfPlaylistFollowed(playlistId).then(res => setIsFollowed(res[0]));
    }
  }, [playlistId]);

  // Local state for playlist component
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);

  const onFollow = id => {
    setIsFollowed(true);
    followPlaylist(id);
    fetchUserPlaylists();
  };
  const onUnfollow = id => {
    setIsFollowed(false);
    unfollowPlaylist(id);
    fetchUserPlaylists();
  };
  const onPlay = () => {
    // If playlist tracks match the current tracklist playing
    if (
      currentTrackList &&
      playlistTracks.length > 0 &&
      JSON.stringify(playlistTracks) === JSON.stringify(currentTrackList)
    ) {
      if (isPlaying && isPaused) {
        onResume();
      } else if (isPlaying && !isPaused) {
        onPause();
      }
    }
    // If playlist tracks do not match the current tracklist playing
    else if (playlistTracks.length > 0) {
      setCurrentTrackList(playlistTracks);
      audioControl(playlistTracks[0]);
    }
  };

  // Component renders only when it's data is updated and does not match the previous playlist data
  return (
    <div>
      {playlistTracks &&
      isFollowed !== null &&
      (prevPlaylist.current !== JSON.stringify(playlistTracks) ||
        playlistId === prevPlaylistId.current) ? (
        <div className="playlist-page">
          <main id="playlist">
            <section id="playlist-header">
              <img
                src={
                  playlistDetails.images.length >= 1
                    ? playlistDetails.images[0].url
                    : null
                }
                alt=""
              />
              <div className="playlist-details">
                <h5 className="playlist-details-header">PLAYLIST</h5>
                <div
                  className={
                    playlistDetails.name.length > 30
                      ? 'playlist-long-title'
                      : 'playlist-title'
                  }
                >
                  {playlistDetails.name}
                </div>

                {playlistDetails.name.length > 30 ||
                playlistDetails.description === '' ? null : (
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: playlistDetails.description
                    }}
                  ></p>
                )}

                <div className="playlist-specs">
                  <div className="created-by">
                    <p>
                      Created By:{' '}
                      <span>{playlistDetails.owner.display_name}</span>{' '}
                    </p>
                    <FontAwesomeIcon icon={faCircle} />
                    <p>{`${playlistDetails.tracks.total} songs `}</p>
                  </div>
                </div>
                <div className="playlist-controls">
                  <button onClick={() => onPlay()}>
                    {currentTrackList &&
                    playlistTracks.length > 0 &&
                    JSON.stringify(playlistTracks) ===
                      JSON.stringify(currentTrackList) &&
                    isPlaying &&
                    !isPaused
                      ? 'PAUSE'
                      : 'PLAY'}
                  </button>
                  <FontAwesomeIcon
                    className="playlist-like-icon"
                    icon={isFollowed ? faHeart : faHeartOpen}
                    onClick={() =>
                      isFollowed ? onUnfollow(playlistId) : onFollow(playlistId)
                    }
                  />
                </div>
              </div>
            </section>
            {playlistTracks.length >= 1 ? (
              <TrackList
                tracks={playlistTracks}
                onResume={onResume}
                onPause={onPause}
                audioControl={audioControl}
                isPlaylist={true}
              />
            ) : (
              <div className="empty-playlist">
                <h3>This playlist is currently empty</h3>
                <h5>Find more of the music you love among our New Releases</h5>
                <Link to="/browse/new-releases">
                  <button>GO TO NEW RELEASES</button>
                </Link>
              </div>
            )}
          </main>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks)),
  fetchUserPlaylists: () => dispatch(fetchUserPlaylists())
});

const mapStateToProps = createStructuredSelector({
  isPlaying: selectIsPlaying,
  isPaused: selectIsPaused,
  currentTrackList: selectCurrentTrackList
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Playlist)
);
