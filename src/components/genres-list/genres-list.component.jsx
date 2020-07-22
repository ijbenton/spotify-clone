import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectGenres } from '../../redux/browse/browse.selectors';

import { fetchGenresStart } from '../../redux/browse/browse.actions';

import './genres-list.styles.scss';

const GenresList = ({ genres, fetchGenres }) => {
  useEffect(() => {
    if (!genres) {
      fetchGenres();
    }
  }, []);
  return (
    <div className="genres-list">
      <div className="genres-list-container">
        <div className="items-container">
          {genres
            ? genres.map((genre, index) => (
                <div className="row-item" key={index}>
                  <div className="row-item-image">
                    <Link to={`genres/${genre.id}`}>
                      <img src={genre.icons[0].url} alt={genre.name} />
                    </Link>
                  </div>
                  <h5>
                    <Link to={`genres/${genre.id}`}>{genre.name}</Link>
                  </h5>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genres: selectGenres
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: () => dispatch(fetchGenresStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
