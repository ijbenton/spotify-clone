import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import AlbumListItem from '../album-list-item/album-list-item.component';

import './album-list.styles.scss';

const AlbumList = ({
  albums,
  title,
  isFetchRequired,
  audioControl,
  isPreview,
  moreLink
}) => {
  return (
    <div className={isPreview ? 'album-list-preview' : 'album-list'}>
      {title ? <h2>{title}</h2> : null}
      <div className="album-list-container">
        <div className="items-container">
          {albums
            ? albums.map((album, index) => (
                <AlbumListItem
                  album={album}
                  key={index}
                  isFetchRequired={isFetchRequired}
                  audioControl={audioControl}
                />
              ))
            : null}
          {albums && isPreview ? (
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

export default AlbumList;
