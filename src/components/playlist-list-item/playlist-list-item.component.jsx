import React from 'react';
import { Link } from 'react-router-dom';

import './playlist-list-item.styles.scss';

const PlaylistListItem = ({ playlist, playlistLinkType }) => {
  return (
    <div className="row-item">
      <div className="row-item-image">
        <Link to={`/playlists/${playlistLinkType}/${playlist.id}`}>
          <img src={playlist.images[0].url} alt={playlist.name} />
        </Link>
      </div>
      <h5>
        <Link to={`/playlists/${playlistLinkType}/${playlist.id}`}>
          {playlist.name}
        </Link>
      </h5>
    </div>
  );
};

export default PlaylistListItem;
