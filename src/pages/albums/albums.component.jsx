import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import './albums.styles.scss';

const UserAlbums = lazy(() => import('../user-albums/user-albums.component'));
const Album = lazy(() => import('../../components/album/album.component'));

const AlbumsPage = ({ match, onResume, onPause, audioControl }) => {
  return (
    <div className="albums-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path="/albums"
          render={props => (
            <UserAlbums {...props} audioControl={audioControl} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:albumId`}
          render={props => (
            <Album
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

export default AlbumsPage;
