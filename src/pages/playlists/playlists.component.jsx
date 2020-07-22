import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import './playlists.styles.scss';

const GenrePlaylist = lazy(() =>
  import('../genre-playlist/genre-playlist.component')
);
const UserPlaylist = lazy(() =>
  import('../user-playlist/user-playlist.component')
);
const FeaturedPlaylist = lazy(() =>
  import('../featured-playlist/featured-playlist.component')
);

const PlaylistsPage = ({ match, onResume, onPause, audioControl }) => {
  return (
    <div className="playlists-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}/user-playlist/:playlistId`}
          render={props => (
            <UserPlaylist
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/featured-playlist/:playlistId`}
          render={props => (
            <FeaturedPlaylist
              {...props}
              onResume={onResume}
              onPause={onPause}
              audioControl={audioControl}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/genre-playlist/:playlistId`}
          render={props => (
            <GenrePlaylist
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

export default PlaylistsPage;
