import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { search } from '../../redux/search/search.actions';

import { selectSearchResults } from '../../redux/search/search.selectors';

import './search-bar.styles.scss';

const SearchBar = ({ search, history }) => {
  const handleTermChange = e => {
    search(e.target.value);
  };

  const onSearch = e => {
    history.push('/search-results');
    e.preventDefault();
  };

  return (
    <div className="search-bar">
      <form onSubmit={onSearch}>
        <input
          onChange={handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <FontAwesomeIcon onClick={onSearch} icon={faSearch} />
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults
});

const mapDispatchToProps = dispatch => ({
  search: term => dispatch(search(term))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
