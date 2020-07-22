import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Playlist from '../../components/playlist/playlist.component';

import { selectFeaturedPlaylists } from '../../redux/browse/browse.selectors';

import './featured-playlist.styles.scss';

const FeaturedPlaylist = ({
  match,
  featuredPlaylists,
  onResume,
  onPause,
  audioControl
}) => {
  let currentPlaylistDetails = null;
  if (featuredPlaylists) {
    currentPlaylistDetails = featuredPlaylists.find(
      featuredPlaylist => featuredPlaylist.id === match.params.playlistId
    );
  }

  return (
    <div>
      {currentPlaylistDetails ? (
        <Playlist
          playlistDetails={currentPlaylistDetails}
          playlistId={match.params.playlistId}
          onResume={onResume}
          onPause={onPause}
          audioControl={audioControl}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  featuredPlaylists: selectFeaturedPlaylists
});

export default connect(mapStateToProps)(FeaturedPlaylist);
