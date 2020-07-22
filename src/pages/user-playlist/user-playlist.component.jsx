import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Playlist from '../../components/playlist/playlist.component';

import { selectUserPlaylists } from '../../redux/playlist/playlist.selectors';

import './user-playlist.styles.scss';

const UserPlaylist = React.memo(
  ({ match, userPlaylists, onResume, onPause, audioControl }) => {
    let currentPlaylistDetails = null;
    if (userPlaylists) {
      currentPlaylistDetails = userPlaylists.find(
        userPlaylist => userPlaylist.id === match.params.playlistId
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
  },
  (prevProps, nextProps) =>
    nextProps.userPlaylists &&
    prevProps.match.params.playlistId === nextProps.match.params.playlistId
);

const mapStateToProps = createStructuredSelector({
  userPlaylists: selectUserPlaylists
});

export default connect(mapStateToProps)(UserPlaylist);
