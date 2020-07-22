import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ArtistList from '../../components/artist-list/artist-list.component';

import { fetchTopArtists } from '../../redux/homepage/homepage.actions';

import { selectTopArtists } from '../../redux/homepage/homepage.selectors';

import './top-artists-page.styles.scss';

const TopArtistsPage = ({ topArtists, fetchTopArtists, audioControl }) => {
  useEffect(() => {
    if (!topArtists) {
      fetchTopArtists();
    }
  }, []);

  return (
    <main className="top-artists-page">
      <ArtistList
        artists={topArtists}
        isPreview={false}
        audioControl={audioControl}
        title="Your Top Artists"
      />
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchTopArtists: () => dispatch(fetchTopArtists())
});

const mapStateToProps = createStructuredSelector({
  topArtists: selectTopArtists
});

export default connect(mapStateToProps, mapDispatchToProps)(TopArtistsPage);
