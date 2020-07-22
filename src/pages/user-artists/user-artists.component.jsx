import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ArtistList from '../../components/artist-list/artist-list.component';

import { fetchUserFollowedArtists } from '../../redux/user/user.actions';
import { selectFollowedArtists } from '../../redux/user/user.selectors';

import './user-artists.styles.scss';

const UserArtists = React.memo(
  ({ followedArtists, fetchUserFollowedArtists, audioControl }) => {
    useEffect(() => {
      fetchUserFollowedArtists();
    }, []);
    return (
      <main className="user-artists">
        <ArtistList
          artists={followedArtists}
          isPreview={false}
          audioControl={audioControl}
          title="Followed Artists"
        />
      </main>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.followedArtists) ===
    JSON.stringify(nextProps.followedArtists)
);

const mapStateToProps = createStructuredSelector({
  followedArtists: selectFollowedArtists
});

const mapDispatchToProps = dispatch => ({
  fetchUserFollowedArtists: () => dispatch(fetchUserFollowedArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserArtists);
