import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import PlaylistListItem from '../playlist-list-item/playlist-list-item.component';

import './playlist-list.styles.scss';

const PlaylistList = ({
  playlists,
  title,
  playlistLinkType,
  isPreview,
  moreLink
}) => {
  return (
    <div className={isPreview ? 'playlist-list-preview' : 'playlist-list'}>
      {title ? <h2>{title}</h2> : null}
      <div className="playlist-list-container">
        <div className="items-container">
          {playlists
            ? playlists
                .filter(playlist => playlist.images.length >= 1)
                .map(playlist => (
                  <PlaylistListItem
                    playlist={playlist}
                    playlistLinkType={playlistLinkType}
                    key={playlist.id}
                  />
                ))
            : null}
          {playlists && isPreview ? (
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

// <div className="more-button">
//   <Link to="/">
//     <span>MORE </span>
//     <FontAwesomeIcon icon={faArrowRight} />
//   </Link>
// </div>

export default PlaylistList;
