import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import TrackList from '../../components/track-list/track-list.component';
import Spinner from '../../components/spinner/spinner.component';
import ArtistList from '../../components/artist-list/artist-list.component';
import AlbumList from '../../components/album-list/album-list.component';

import {
  fetchArtistAlbums,
  fetchArtistRelated,
  fetchArtistTracks,
  fetchArtistById,
  resetArtist
} from '../../redux/artist/artist.actions';

import {
  selectArtistAlbums,
  selectArtistRelatedArtists,
  selectArtistTopTracks,
  selectArtistDetails
} from '../../redux/artist/artist.selectors.js';

import { followArtist, unfollowArtist } from '../../spotify/spotify.utils';

import './artist.styles.scss';

const ArtistPage = React.memo(
  ({
    albums,
    relatedArtists,
    topTracks,
    fetchArtistAlbums,
    fetchArtistRelated,
    fetchArtistTracks,
    fetchArtistById,
    match,
    fetchedArtist,
    location,
    resetArtist,
    onResume,
    onPause,
    audioControl
  }) => {
    // Set initial state for isFollowed depending on it's data source
    const [isFollowed, setIsFollowed] =
      location.query && location.query.artist
        ? useState(location.query.artist.followed)
        : fetchedArtist
        ? useState(fetchedArtist.followed)
        : useState(null);
    useEffect(() => {
      // Scroll to top of component on initial render and anytime artistId in URL changes
      window.scrollTo(0, 0);
      // Fetch artist on initial render and anytime artistId in URL changes. Compare with location query and if different component will re-render
      fetchArtistById(match.params.artistId);
      fetchArtistAlbums(match.params.artistId);
      fetchArtistRelated(match.params.artistId);
      fetchArtistTracks(match.params.artistId);
    }, [match.params.artistId]);

    useEffect(() => {
      return () => {
        resetArtist();
      };
    }, []);

    useEffect(() => {
      // If the fetched album saved property is different than the saved property from location query
      // Change isFollowed to the fetched album's saved property
      if (
        (fetchedArtist &&
          location.query &&
          fetchedArtist.followed !== location.query.artist.followed) ||
        (fetchedArtist &&
          location.query &&
          location.query.artist.followed !== isFollowed) ||
        (fetchedArtist && !location.query)
      ) {
        setIsFollowed(fetchedArtist.followed);
      }
    }, [fetchedArtist]);

    let artist = null;
    // Assign the artist var depending on it's data source
    // If the fetched artist is different than the location query's artist update the artist var
    if (!location.query || !location.query.artist) {
      artist = fetchedArtist;
    } else {
      artist = location.query.artist;
    }

    const onFollow = id => {
      setIsFollowed(true);
      followArtist(id);
    };
    const onUnfollow = id => {
      setIsFollowed(false);
      unfollowArtist(id);
    };
    return (
      <div>
        {topTracks && artist && isFollowed !== null ? (
          <div className="artist-page">
            <main id="artist">
              <section id="artist-header">
                <img src={artist.images[0].url} alt={artist.name} />
                <div className="artist-details">
                  <h4 className="artist-details-header">ARTIST</h4>
                  <h2
                    className={
                      artist.name.length > 14
                        ? 'artist-long-title'
                        : 'artist-title'
                    }
                  >
                    {artist.name}
                  </h2>
                  <p className="followers">{`${artist.followers.total} followers`}</p>
                  <div
                    className="button"
                    onClick={() =>
                      isFollowed ? onUnfollow(artist.id) : onFollow(artist.id)
                    }
                  >
                    {isFollowed ? 'FOLLOWING' : 'FOLLOW'}
                  </div>
                </div>
              </section>
              <TrackList
                tracks={topTracks}
                onResume={onResume}
                onPause={onPause}
                audioControl={audioControl}
                title="Popular Tracks"
              />

              <AlbumList
                albums={albums}
                isFetchRequired={true}
                title="Albums"
                audioControl={audioControl}
              />
              <section>
                {relatedArtists ? (
                  <ArtistList
                    artists={relatedArtists}
                    audioControl={audioControl}
                    title="Related Artists"
                  />
                ) : null}
              </section>
            </main>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    (prevProps.fetchedArtist === nextProps.fetchedArtist ||
      prevProps.albums === nextProps.albums ||
      prevProps.relatedArtists === nextProps.relatedArtists ||
      prevProps.topTracks === nextProps.topTracks) &&
    prevProps.match.params.artistId === nextProps.match.params.artistId
);

const mapDispatchToProps = dispatch => ({
  fetchArtistAlbums: id => dispatch(fetchArtistAlbums(id)),
  fetchArtistRelated: id => dispatch(fetchArtistRelated(id)),
  fetchArtistTracks: id => dispatch(fetchArtistTracks(id)),
  fetchArtistById: id => dispatch(fetchArtistById(id)),
  resetArtist: () => dispatch(resetArtist())
});

const mapStateToProps = createStructuredSelector({
  fetchedArtist: selectArtistDetails,
  albums: selectArtistAlbums,
  relatedArtists: selectArtistRelatedArtists,
  topTracks: selectArtistTopTracks
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArtistPage)
);
