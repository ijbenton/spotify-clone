import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackList from '../../components/track-list/track-list.component';

import { fetchTopTracks } from '../../redux/homepage/homepage.actions';

import { selectTopTracks } from '../../redux/homepage/homepage.selectors';

import './top-tracks-page.styles.scss';

const TopTracksPage = React.memo(
  ({ tracks, onResume, onPause, audioControl, fetchTopTracks }) => {
    useEffect(() => {
      fetchTopTracks();
    }, []);
    return (
      <div className="top-tracks-page">
        <TrackList
          tracks={tracks}
          title="Top Tracks"
          onResume={onResume}
          onPause={onPause}
          audioControl={audioControl}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.tracks) === JSON.stringify(nextProps.tracks)
);

const mapDispatchToProps = dispatch => ({
  fetchTopTracks: () => dispatch(fetchTopTracks())
});

const mapStateToProps = createStructuredSelector({
  tracks: selectTopTracks
});
export default connect(mapStateToProps, mapDispatchToProps)(TopTracksPage);
