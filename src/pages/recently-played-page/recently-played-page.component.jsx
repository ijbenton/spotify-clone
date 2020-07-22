import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackList from '../../components/track-list/track-list.component';

import { fetchRecentlyPlayed } from '../../redux/homepage/homepage.actions';

import { selectRecentlyPlayed } from '../../redux/homepage/homepage.selectors';

import './recently-played-page.styles.scss';

const RecentlyPlayedPage = React.memo(
  ({ tracks, onResume, onPause, audioControl, fetchRecentlyPlayed }) => {
    useEffect(() => {
      fetchRecentlyPlayed();
    }, []);
    return (
      <div className="recently-played-page">
        <TrackList
          tracks={tracks}
          onResume={onResume}
          onPause={onPause}
          audioControl={audioControl}
          title="Recently Played"
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.tracks) === JSON.stringify(nextProps.tracks)
);

const mapDispatchToProps = dispatch => ({
  fetchRecentlyPlayed: () => dispatch(fetchRecentlyPlayed())
});

const mapStateToProps = createStructuredSelector({
  tracks: selectRecentlyPlayed
});
export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayedPage);
