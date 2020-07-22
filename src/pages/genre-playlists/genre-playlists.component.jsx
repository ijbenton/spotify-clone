import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlaylistList from '../../components/playlist-list/playlist-list.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchGenrePlaylists } from '../../redux/browse/browse.actions';

import { selectGenrePlaylists } from '../../redux/browse/browse.selectors';

import './genre-playlists.styles.scss';

const GenrePlaylists = ({ match, genrePlaylists, fetchGenrePlaylists }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Dont fetch playlists if genre is same as previous
    if (!genrePlaylists || genrePlaylists.genre !== match.params.genre) {
      fetchGenrePlaylists(match.params.genre);
    }
  }, []);

  return (
    <div>
      {genrePlaylists && genrePlaylists.genre === match.params.genre ? (
        <div className="genre-playlists">
          <PlaylistList
            playlists={genrePlaylists.items}
            isPreview={false}
            playlistLinkType="genre-playlist"
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genrePlaylists: selectGenrePlaylists
});

const mapDispatchToProps = dispatch => ({
  fetchGenrePlaylists: genre => dispatch(fetchGenrePlaylists(genre))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenrePlaylists);
