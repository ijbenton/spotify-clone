import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Playlist from '../../components/playlist/playlist.component';

import { selectGenrePlaylists } from '../../redux/browse/browse.selectors';

import './genre-playlist.styles.scss';

const GenrePlaylist = ({
  match,
  genrePlaylists,
  onResume,
  onPause,
  audioControl
}) => {
  let currentPlaylistDetails = null;
  if (genrePlaylists) {
    currentPlaylistDetails = genrePlaylists.items.find(
      playlist => playlist.id === match.params.playlistId
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
  genrePlaylists: selectGenrePlaylists
});

export default connect(mapStateToProps)(GenrePlaylist);
