import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOpen } from '@fortawesome/free-regular-svg-icons';

import TrackList from '../../components/track-list/track-list.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchAlbumById, resetAlbum } from '../../redux/browse/browse.actions';
import { setCurrentTrackList } from '../../redux/player/player.actions';

import { selectAlbumById } from '../../redux/browse/browse.selectors';
import {
  selectIsPlaying,
  selectIsPaused,
  selectCurrentTrackList
} from '../../redux/player/player.selectors';

import { likeAlbum, unlikeAlbum } from '../../spotify/spotify.utils';

import './album.styles.scss';

const Album = React.memo(
  ({
    match,
    location,
    fetchedAlbum,
    fetchAlbumById,
    resetAlbum,
    onResume,
    onPause,
    audioControl,
    isPlaying,
    isPaused,
    currentTrackList,
    setCurrentTrackList
  }) => {
    // Set initial state for isLiked depending on it's data source
    const [isLiked, setIsLiked] =
      location.query && location.query.album
        ? useState(location.query.album.saved)
        : fetchedAlbum
        ? useState(fetchedAlbum.saved)
        : useState(null);

    useEffect(() => {
      // Always scroll to top on initial render
      window.scrollTo(0, 0);
      // Always fetch album on initial render. Compare with location query and if different the component will re-render
      fetchAlbumById(match.params.albumId);
      return () => {
        // Clear album state in redux when component unmounts
        resetAlbum();
      };
    }, []);
    useEffect(() => {
      // If the fetched album saved property is different than the saved property from location query
      // Change isLiked to the fetched album's saved property
      if (
        (fetchedAlbum &&
          location.query &&
          fetchedAlbum.saved !== location.query.album.saved) ||
        (fetchedAlbum && !location.query)
      ) {
        setIsLiked(fetchedAlbum.saved);
      }
    }, [fetchedAlbum]);

    let album = null;
    let albumTracks = null;
    // Assign the album var depending on it's data source
    // If the fetched album is different than the location query's album update the album var
    if (
      fetchedAlbum &&
      (!location.query ||
        JSON.stringify(fetchedAlbum) !== JSON.stringify(location.query.album))
    ) {
      album = fetchedAlbum;
    }
    // If location query album passes then assign it to the album var
    else if (
      location.query &&
      location.query.album &&
      location.query.album.tracks
    ) {
      album = location.query.album;
    }

    // Map album image to every track in the album so track player can display album image and for comparison to the current tracklist
    if (album) {
      albumTracks = album.tracks.items.map(track => ({
        ...track,
        album: { images: [{ url: album.images[0].url }] }
      }));
    }

    const onLike = id => {
      setIsLiked(true);
      likeAlbum(id);
    };
    const onUnlike = id => {
      setIsLiked(false);
      unlikeAlbum(id);
    };

    const onPlay = () => {
      // If the album tracks match the current tracklist playing
      if (
        currentTrackList &&
        album.tracks.items.length > 0 &&
        JSON.stringify(albumTracks) === JSON.stringify(currentTrackList)
      ) {
        if (isPlaying && isPaused) {
          onResume();
        } else if (isPlaying && !isPaused) {
          onPause();
        }
      }
      // If the album tracks do not match the current tracklist playing
      else if (album.tracks.items.length > 0) {
        setCurrentTrackList(albumTracks);
        audioControl(albumTracks[0]);
      }
    };

    const handleClick = e => {
      if (
        e.target.classList.contains('like-icon') ||
        e.target.parentElement.classList.contains('like-icon')
      ) {
        isLiked ? onUnlike(album.id) : onLike(album.id);
      }

      e.preventDefault();
    };
    return (
      <div className="album-page">
        {album && isLiked !== null ? (
          <main id="album">
            <section id="album-header">
              <img src={album.images[0].url} alt="" />
              <div className="album-details">
                <h5 className="album-details-header">
                  {album.album_type.toUpperCase()}
                </h5>
                <div
                  className={
                    album.name.length > 23 ? 'album-long-title' : 'album-title'
                  }
                >
                  {album.name}
                </div>
                <div className="album-artist">
                  <span>By</span>{' '}
                  {album.artists.length > 1 ? (
                    album.artists.map((artist, index) =>
                      index === album.artists.length - 1 ? (
                        <Link to={`/artists/${artist.id}`}>
                          <span className="highlight">{artist.name}</span>
                        </Link>
                      ) : (
                        <Link to={`/artists/${artist.id}`}>
                          <span className="highlight">{artist.name}</span>
                          {', '}
                        </Link>
                      )
                    )
                  ) : (
                    <Link to={`/artists/${album.artists[0].id}`}>
                      <span className="highlight">{album.artists[0].name}</span>
                    </Link>
                  )}
                </div>
                <div className="album-specs">
                  <span>{`${album.release_date.substring(0, 4)}`}</span>
                  <FontAwesomeIcon className="circle-icon" icon={faCircle} />
                  <span>{`${album.total_tracks} songs `}</span>
                </div>
                <div className="album-controls" onClick={handleClick}>
                  <button onClick={onPlay}>
                    {currentTrackList &&
                    album.tracks.items.length > 0 &&
                    JSON.stringify(albumTracks) ===
                      JSON.stringify(currentTrackList) &&
                    isPlaying &&
                    !isPaused
                      ? 'PAUSE'
                      : 'PLAY'}
                  </button>
                  <FontAwesomeIcon
                    className="like-icon"
                    icon={isLiked ? faHeart : faHeartOpen}
                  />
                </div>
              </div>
            </section>
            <TrackList
              tracks={albumTracks}
              isAlbum={true}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />{' '}
          </main>
        ) : (
          <Spinner />
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.location.query &&
    prevProps.location.query.album &&
    JSON.stringify(prevProps.location.query.album) ===
      JSON.stringify(nextProps.fetchedAlbum)
);

const mapDispatchToProps = dispatch => ({
  resetAlbum: () => dispatch(resetAlbum()),
  fetchAlbumById: id => dispatch(fetchAlbumById(id)),
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

const mapStateToProps = createStructuredSelector({
  fetchedAlbum: selectAlbumById,
  isPlaying: selectIsPlaying,
  isPaused: selectIsPaused,
  currentTrackList: selectCurrentTrackList
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album));
