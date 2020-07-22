import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ArtistList from '../../components/artist-list/artist-list.component';
import TrackPreviewList from '../../components/track-preview-list/track-preview-list.component';
import PlaylistList from '../../components/playlist-list/playlist-list.component';
import AlbumList from '../../components/album-list/album-list.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  fetchTopArtists,
  fetchTopTracks,
  fetchRecentlyPlayed,
  fetchRecommendations
} from '../../redux/homepage/homepage.actions';
import {
  fetchFeaturedPlaylists,
  fetchNewReleases
} from '../../redux/browse/browse.actions';

import {
  selectTopTracks,
  selectRecentlyPlayed,
  selectTopArtists,
  selectRecommendations
} from '../../redux/homepage/homepage.selectors';
import {
  selectNewReleases,
  selectFeaturedPlaylists
} from '../../redux/browse/browse.selectors';

import './homepage.styles.scss';

const HomePage = React.memo(
  ({
    fetchTopArtists,
    fetchTopTracks,
    fetchRecommendations,
    fetchRecentlyPlayed,
    fetchFeaturedPlaylists,
    fetchNewReleases,
    topArtists,
    topTracks,
    recentlyPlayed,
    recommendations,
    newReleases,
    featuredPlaylists,
    audioControl
  }) => {
    useEffect(() => {
      // Only fetch topArtists, topTracks, featuredPlaylists, and newReleases if they have not been fetched already
      // These don't change very ofter so no need to fetch on every render
      // Recently Played and Recommendations must be fetched every initial render as they change ofter
      if (
        !topArtists &&
        !topTracks &&
        !featuredPlaylists &&
        !recentlyPlayed &&
        !newReleases
      ) {
        fetchRecentlyPlayed();
        fetchTopArtists();
        fetchTopTracks();
        fetchFeaturedPlaylists();
        fetchNewReleases();
      }
    }, []);
    useEffect(() => {
      // Use recentlyPlayed and topArtists to determine recommendations for user
      if (recentlyPlayed && topArtists && !recommendations) {
        let trackSeeds = recentlyPlayed
          .filter((track, index) => index < 2)
          .map(track => track.id);
        let artistSeeds = topArtists
          .filter((artist, index) => index < 3)
          .map(artist => artist.id);
        fetchRecommendations(trackSeeds, artistSeeds);
      }
    }, [recentlyPlayed, topArtists]);
    return (
      <main id="homepage" className="sidebar-closed-page">
        <section id="recently-played">
          {recentlyPlayed ? (
            <TrackPreviewList
              tracks={recentlyPlayed}
              title="Recently Played"
              moreLink="/recently-played"
              audioControl={audioControl}
            />
          ) : (
            <Spinner />
          )}
        </section>
        <section id="top-artists">
          {topArtists ? (
            <ArtistList
              artists={topArtists}
              isPreview={true}
              moreLink="/top-artists"
              title="Your Top Artists"
              audioControl={audioControl}
            />
          ) : (
            <Spinner />
          )}
        </section>
        <section id="top-tracks">
          {topTracks ? (
            <TrackPreviewList
              tracks={topTracks}
              title="Your Top Tracks"
              moreLink="/top-tracks"
              audioControl={audioControl}
            />
          ) : (
            <Spinner />
          )}
        </section>

        <section id="recommendations">
          {recommendations ? (
            <TrackPreviewList
              tracks={recommendations}
              title="Recommendations"
              moreLink="/recommendations"
              audioControl={audioControl}
            />
          ) : (
            <Spinner />
          )}
        </section>

        <section id="featured-playlists">
          {featuredPlaylists ? (
            <PlaylistList
              playlists={featuredPlaylists}
              isPreview={true}
              moreLink="/browse/featured-playlists"
              title="Featured Playlists"
              audioControl={audioControl}
              playlistLinkType="featured-playlist"
            />
          ) : (
            <Spinner />
          )}
        </section>

        <section id="new-releases">
          {newReleases ? (
            <AlbumList
              albums={newReleases}
              isPreview={true}
              isFetchRequired={true}
              title="New Releases"
              moreLink="/browse/new-releases"
              audioControl={audioControl}
            />
          ) : (
            <Spinner />
          )}
        </section>
      </main>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);

const mapDispatchToProps = dispatch => ({
  fetchTopArtists: () => dispatch(fetchTopArtists()),
  fetchRecentlyPlayed: () => dispatch(fetchRecentlyPlayed()),
  fetchTopTracks: () => dispatch(fetchTopTracks()),
  fetchRecommendations: (tracks, artists) =>
    dispatch(fetchRecommendations(tracks, artists)),
  fetchNewReleases: () => dispatch(fetchNewReleases()),
  fetchFeaturedPlaylists: () => dispatch(fetchFeaturedPlaylists())
});

const mapStateToProps = createStructuredSelector({
  topArtists: selectTopArtists,
  recentlyPlayed: selectRecentlyPlayed,
  topTracks: selectTopTracks,
  recommendations: selectRecommendations,
  featuredPlaylists: selectFeaturedPlaylists,
  newReleases: selectNewReleases
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
