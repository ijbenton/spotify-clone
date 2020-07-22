import React, { lazy, Suspense, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  setUnavailableTrack
} from './redux/player/player.actions';

import { getAccessToken } from './spotify/spotify.utils';

import SideBar from './components/sidebar/sidebar.component';
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header.component';
import TrackPlayer from './components/track-player/track-player.component';
import './App.scss';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const BrowsePage = lazy(() => import('./pages/browse/browse.component'));
const TopTracksPage = lazy(() =>
  import('./pages/top-tracks-page/top-tracks-page.component')
);
const RecentlyPlayedPage = lazy(() =>
  import('./pages/recently-played-page/recently-played-page.component')
);
const PlaylistsPage = lazy(() =>
  import('./pages/playlists/playlists.component')
);
const LikedSongs = lazy(() =>
  import('./pages/liked-songs/liked-songs.component')
);
const AlbumsPage = lazy(() => import('./pages/albums/albums.component'));
const SearchResults = lazy(() =>
  import('./pages/search-results/search-results.component')
);
const ArtistsPage = lazy(() => import('./pages/artists/artists.component'));
const TopArtistsPage = lazy(() =>
  import('./pages/top-artists-page/top-artists-page.component')
);
const RecommendationsPage = lazy(() =>
  import('./pages/recommendations/recommendations.component')
);

class App extends Component {
  componentDidMount() {
    getAccessToken();
  }

  static audio = null;
  static previewUnavailable = false;

  audioControl = track => {
    const { playSong, stopSong, setUnavailableTrack } = this.props;
    if (!this.audio && track.preview_url) {
      playSong(track);
      this.audio = new Audio(track.preview_url);
      this.audio.play();
    } else if (this.audio && track.preview_url) {
      stopSong();
      this.audio.pause();
      playSong(track);
      this.audio = new Audio(track.preview_url);
      this.audio.play();
    } else if (this.audio && !track.preview_url) {
      this.audio.pause();
      setUnavailableTrack(track);
      this.audio = null;
      this.previewUnavailable = true;
    } else if (!track.preview_url) {
      setUnavailableTrack(track);
      this.audio = null;
      this.previewUnavailable = true;
    }
  };

  onStop = () => {
    if (this.audio) {
      this.props.stopSong();
      this.audio.pause();
    }
  };

  onPause = () => {
    if (this.audio) {
      this.props.pauseSong();
      this.audio.pause();
    }
  };

  onResume = () => {
    if (this.audio) {
      this.props.resumeSong();
      this.audio.play();
    }
  };
  render() {
    return (
      <div className="app">
        <SideBar />
        <Header />

        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              path="/browse"
              render={props => (
                <BrowsePage
                  {...props}
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/top-tracks"
              render={() => (
                <TopTracksPage
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/recommendations"
              render={() => (
                <RecommendationsPage
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/recently-played"
              render={() => (
                <RecentlyPlayedPage
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/search-results"
              render={() => (
                <SearchResults
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/liked-songs"
              render={() => (
                <LikedSongs
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              path="/playlists"
              render={props => (
                <PlaylistsPage
                  {...props}
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              path="/albums"
              render={props => (
                <AlbumsPage
                  {...props}
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              path="/artists"
              render={props => (
                <ArtistsPage
                  {...props}
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
            <Route
              exact
              path="/top-artists"
              render={props => (
                <TopArtistsPage
                  {...props}
                  onResume={this.onResume}
                  onPause={this.onPause}
                  audioControl={this.audioControl}
                />
              )}
            />
          </Suspense>
        </Switch>
        <TrackPlayer
          onResume={this.onResume}
          onPause={this.onPause}
          onStop={this.onStop}
          audioControl={this.audioControl}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUnavailableTrack: song => dispatch(setUnavailableTrack(song)),
  playSong: song => dispatch(playSong(song)),
  pauseSong: () => dispatch(pauseSong()),
  stopSong: () => dispatch(stopSong()),
  resumeSong: () => dispatch(resumeSong())
});

export default connect(null, mapDispatchToProps)(App);
