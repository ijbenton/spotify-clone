import { combineReducers } from 'redux';

import searchReducer from './search/search.reducer';
import playlistReducer from './playlist/playlist.reducer';
import browseReducer from './browse/browse.reducer';
import homepageReducer from './homepage/homepage.reducer';
import playerReducer from './player/player.reducer';
import userReducer from './user/user.reducer';
import artistReducer from './artist/artist.reducer';
import UIReducer from './ui/ui.reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  playlist: playlistReducer,
  browse: browseReducer,
  homepage: homepageReducer,
  player: playerReducer,
  user: userReducer,
  artist: artistReducer,
  ui: UIReducer
});

export default rootReducer;
