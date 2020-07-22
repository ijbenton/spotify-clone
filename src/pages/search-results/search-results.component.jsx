import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TrackList from '../../components/track-list/track-list.component';
import SearchBar from '../../components/search-bar/search-bar.component';

import { selectSearchResults } from '../../redux/search/search.selectors';

import './search-results.styles.scss';

const SearchResults = ({ searchResults, onResume, onPause, audioControl }) => {
  return (
    <div className="search-results">
      <SearchBar />
      <TrackList
        tracks={searchResults}
        onResume={onResume}
        onPause={onPause}
        audioControl={audioControl}
        title="Search Results"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults
});

export default connect(mapStateToProps)(SearchResults);
