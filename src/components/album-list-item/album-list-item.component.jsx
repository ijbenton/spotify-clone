import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { setCurrentTrackList } from '../../redux/player/player.actions';

import { getAlbumById } from '../../spotify/spotify.utils';

import './album-list-item.styles.scss';

const AlbumListItem = ({
  album,
  setCurrentTrackList,
  audioControl,
  isFetchRequired
}) => {
  let albumTracks = null;
  // Map album image to every track in the album so track player can display album image and for comparison to the current tracklist
  if (!isFetchRequired) {
    albumTracks = album.tracks.items.map(track => ({
      ...track,
      album: { images: [{ url: album.images[0].url }] }
    }));
  }
  const onPlay = () => {
    // If the album tracks have already been fetched
    if (!isFetchRequired) {
      setCurrentTrackList(albumTracks);
      audioControl(albumTracks[0]);
    }
    // Otherwise fetch the album tracks on each play for the clicked album
    else {
      getAlbumById(album.id)
        .then(album => {
          // Map album image to every track in the album so track player can display album image and for comparison to the current tracklist
          albumTracks = album.tracks.items.map(track => ({
            ...track,
            album: { images: [{ url: album.images[0].url }] }
          }));
          setCurrentTrackList(albumTracks);
          // Append album image to the current track so the player can display it
          audioControl(albumTracks[0]);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="row-item" key={album.id}>
      <div className="row-item-image">
        <Link to={{ pathname: `/albums/${album.id}`, query: { album } }}>
          <img src={album.images[0].url} alt={album.name} />
        </Link>

        <FontAwesomeIcon
          className="hover-play-button"
          icon={faPlayCircle}
          onClick={onPlay}
        />
      </div>

      <h5 className="album-name">
        <Link to={{ pathname: `/albums/${album.id}`, query: { album } }}>
          {album.name}
        </Link>
      </h5>

      <h5 className="album-artists">
        {album.artists.length > 1 ? (
          album.artists.map((artist, index) =>
            index === album.artists.length - 1 ? (
              <Link to={`/artists/${artist.id}`} key={index}>
                <span className="highlight">{artist.name}</span>
              </Link>
            ) : (
              <Link to={`/artists/${artist.id}`} key={index}>
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
      </h5>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

export default connect(null, mapDispatchToProps)(AlbumListItem);
