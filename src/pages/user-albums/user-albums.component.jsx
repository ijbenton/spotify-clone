import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AlbumList from '../../components/album-list/album-list.component';

import { selectSavedAlbums } from '../../redux/user/user.selectors';

import { fetchUserAlbums } from '../../redux/user/user.actions';

import './user-albums.styles.scss';

const UserAlbums = React.memo(
  ({ savedAlbums, fetchUserAlbums, audioControl }) => {
    useEffect(() => {
      fetchUserAlbums();
    }, []);
    return (
      <main className="user-albums">
        {savedAlbums ? (
          <AlbumList
            albums={savedAlbums}
            audioControl={audioControl}
            isFetchRequired={false}
            title="Saved Albums"
          ></AlbumList>
        ) : null}
      </main>
    );
  },
  // Don't rerender when fetchedAlbums are the same as the ones already in redux state
  // Must fetchAlbums every initial render in case user liked or disliked albums in between visits
  (prevProps, nextProps) =>
    prevProps.savedAlbums &&
    nextProps.savedAlbums &&
    JSON.stringify(prevProps.savedAlbums.map(album => album.id)) ===
      JSON.stringify(nextProps.savedAlbums.map(album => album.id))
);

const mapStateToProps = createStructuredSelector({
  savedAlbums: selectSavedAlbums
});

const mapDispatchToProps = dispatch => ({
  fetchUserAlbums: () => dispatch(fetchUserAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAlbums);
