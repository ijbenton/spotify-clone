import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import './artists.styles.scss';

const UserArtists = lazy(() =>
  import('../user-artists/user-artists.component')
);
const Artist = lazy(() => import('../../components/artist/artist.component'));

const ArtistsPage = ({ match, onResume, onPause, audioControl }) => {
  return (
    <div className="artists-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <UserArtists {...props} audioControl={audioControl} />
          )}
        />

        <Route
          exact
          path={`${match.path}/:artistId`}
          render={props => (
            <Artist
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

export default ArtistsPage;
