import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackList from '../../components/track-list/track-list.component';

import { updateLikedRecommendations } from '../../redux/homepage/homepage.actions';

import { selectRecommendations } from '../../redux/homepage/homepage.selectors';

import { checkSavedTracks } from '../../spotify/spotify.utils';

import './recommendations.styles.scss';

const RecommendationsPage = ({
  tracks,
  onResume,
  onPause,
  audioControl,
  updateLikedRecommendations
}) => {
  // newTracks ref will hold the updated tracks that have been checked for their saved property
  let newTracks = useRef();
  useEffect(() => {
    async function checkLikeRecommendations() {
      // Pass in original recommendation tracks to check for which tracks are saved(liked)
      let checks = await checkSavedTracks(tracks.map(track => track.id));
      let tracksArr = [...tracks];
      newTracks.current = tracksArr.map((track, index) => {
        return {
          ...track,
          saved: checks[index]
        };
      });
      // Pass in updatedTracks to be stored in homepageReducer
      updateLikedRecommendations(newTracks.current);
    }
    // Call function only on initial render when newTracks is empty
    if (!newTracks.current) {
      checkLikeRecommendations();
    }
  }, [newTracks]);
  // Only render tracklist tracks when newTracks has been fetched
  // This ensures tracks are not rendered until their saved(liked) property has been updated
  return (
    <div className="recommendations-page">
      {newTracks ? (
        <TrackList
          tracks={newTracks.current}
          title="Recommendations"
          onResume={onResume}
          onPause={onPause}
          audioControl={audioControl}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  tracks: selectRecommendations
});

const mapDispatchToProps = dispatch => ({
  updateLikedRecommendations: newLikedTracks =>
    dispatch(updateLikedRecommendations(newLikedTracks))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsPage);
