import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AlbumList from '../../components/album-list/album-list.component';

import {
  fetchNewReleases,
  resetAlbum
} from '../../redux/browse/browse.actions';

import { selectNewReleases } from '../../redux/browse/browse.selectors';

import './new-releases.styles.scss';

const NewReleases = ({
  newReleases,
  fetchNewReleases,
  resetAlbum,
  onResume,
  onPause,
  audioControl
}) => {
  useEffect(() => {
    if (!newReleases) {
      fetchNewReleases();
    }
  }, [fetchNewReleases]);
  return (
    <div className="new-releases">
      <AlbumList
        albums={newReleases}
        onResume={onResume}
        onPause={onPause}
        audioControl={audioControl}
        isFetchRequired={true}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  newReleases: selectNewReleases
});

const mapDispatchToProps = dispatch => ({
  fetchNewReleases: () => dispatch(fetchNewReleases()),
  resetAlbum: () => dispatch(resetAlbum())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);
