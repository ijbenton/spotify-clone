import { all, call } from 'redux-saga/effects';

import { searchSagas } from './search/search.sagas';
import { playlistSagas } from './playlist/playlist.sagas';
import { browseSagas } from './browse/browse.sagas';
import { homepageSagas } from './homepage/homepage.sagas';
import { userSagas } from './user/user.sagas';
import { artistSagas } from './artist/artist.sagas';

export default function* rootSaga() {
  yield all([
    call(searchSagas),
    call(playlistSagas),
    call(browseSagas),
    call(homepageSagas),
    call(userSagas),
    call(artistSagas)
  ]);
}
