import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlaylistList from '../../components/playlist-list/playlist-list.component';

import { fetchFeaturedPlaylists } from '../../redux/browse/browse.actions';

import { selectFeaturedPlaylists } from '../../redux/browse/browse.selectors';

import './featured-playlists.styles.scss';

const FeaturedPlaylists = ({ featuredPlaylists, fetchFeaturedPlaylists }) => {
  useEffect(() => {
    if (!featuredPlaylists) {
      fetchFeaturedPlaylists();
    }
  }, []);
  return (
    <div className="featured-playlists">
      {featuredPlaylists ? (
        <PlaylistList
          playlists={featuredPlaylists}
          isPreview={false}
          playlistLinkType="featured-playlist"
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  featuredPlaylists: selectFeaturedPlaylists
});

const mapDispatchToProps = dispatch => ({
  fetchFeaturedPlaylists: () => dispatch(fetchFeaturedPlaylists())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedPlaylists);
