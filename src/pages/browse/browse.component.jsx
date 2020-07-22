import React, { lazy, Suspense } from 'react';
import { Route, Link } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import GenresList from '../../components/genres-list/genres-list.component';

import './browse.styles.scss';

const NewReleases = lazy(() =>
  import('../new-releases/new-releases.component')
);
const FeaturedPlaylists = lazy(() =>
  import('../featured-playlists/featured-playlists.component')
);
const GenrePlaylists = lazy(() =>
  import('../genre-playlists/genre-playlists.component')
);

const BrowsePage = ({ match, onResume, onPause, audioControl }) => {
  return (
    <div className="browse">
      <div className="browse-options">
        <Link to="/browse/genres">
          <h4>Genres</h4>
        </Link>
        <Link to="/browse/new-releases">
          <h4>New Releases</h4>
        </Link>
        <Link to="/browse/featured-playlists">
          <h4>Featured Playlists</h4>
        </Link>
      </div>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}/genres`}
          render={props => (
            <GenresList
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/genres/:genre`}
          render={props => (
            <GenrePlaylists
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/new-releases`}
          render={props => (
            <NewReleases
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/featured-playlists`}
          render={props => (
            <FeaturedPlaylists
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
      </Suspense>
    </div>
  );
};

export default BrowsePage;
