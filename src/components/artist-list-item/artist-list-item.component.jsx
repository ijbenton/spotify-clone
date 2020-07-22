import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { setCurrentTrackList } from '../../redux/player/player.actions';

import { getArtistTopTracks } from '../../spotify/spotify.utils';

import './artist-list-item.styles.scss';

const ArtistListItem = ({ artist, setCurrentTrackList, audioControl }) => {
  const onPlay = () => {
    // Fetch and play tracks on play button click
    getArtistTopTracks(artist.id)
      .then(tracks => {
        setCurrentTrackList(tracks);
        audioControl(tracks[0]);
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="row-item">
      <div className="row-item-image">
        <Link
          to={{
            pathname: `/artists/${artist.id}`,
            query: { artist }
          }}
        >
          <img
            src={artist.images.length > 0 ? artist.images[0].url : null}
            alt={artist.name}
          />
        </Link>

        <FontAwesomeIcon
          className="hover-play-button"
          icon={faPlayCircle}
          onClick={onPlay}
        />
      </div>
      <h5>
        <Link
          to={{
            pathname: `/artists/${artist.id}`,
            query: { artist }
          }}
        >
          {artist.name}
        </Link>
      </h5>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

export default connect(null, mapDispatchToProps)(ArtistListItem);
