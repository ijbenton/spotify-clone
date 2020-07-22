import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ArtistListItem from '../artist-list-item/artist-list-item.component';

import './artist-list.styles.scss';

const ArtistList = ({ artists, title, isPreview, audioControl, moreLink }) => {
  return (
    <div className={isPreview ? 'artist-list-preview' : 'artist-list'}>
      {title ? <h2>{title}</h2> : null}
      <div className="artist-list-container">
        <div className="items-container">
          {artists
            ? artists.map((artist, index) => (
                <ArtistListItem
                  artist={artist}
                  key={index}
                  audioControl={audioControl}
                />
              ))
            : null}
          {artists && isPreview ? (
            <div className="more-button">
              <Link to={moreLink}>
                <span>MORE </span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
