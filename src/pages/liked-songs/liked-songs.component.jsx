import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackList from '../../components/track-list/track-list.component';

import { fetchUserSongs } from '../../redux/user/user.actions';

import { selectLikedSongs } from '../../redux/user/user.selectors';

import './liked-songs.styles.scss';

const LikedSongs = React.memo(
  ({ likedSongs, fetchUserSongs, onResume, onPause, audioControl }) => {
    useEffect(() => {
      fetchUserSongs();
    }, [fetchUserSongs]);
    return (
      <div className="liked-songs">
        {likedSongs ? (
          <TrackList
            tracks={likedSongs}
            title="Liked Songs"
            onResume={onResume}
            onPause={onPause}
            audioControl={audioControl}
          ></TrackList>
        ) : null}
      </div>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.likedSongs) ===
    JSON.stringify(nextProps.likedSongs)
);

const mapStateToProps = createStructuredSelector({
  likedSongs: selectLikedSongs
});

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: () => dispatch(fetchUserSongs())
});

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongs);
