import { createSelector } from 'reselect';

const selectPlaylist = state => state.playlist;

export const selectPlaylistTracks = createSelector(
  [selectPlaylist],
  playlist => playlist.playlistTracks
);

export const selectPlaylistTrackUris = createSelector(
  [selectPlaylistTracks],
  playlistTracks => playlistTracks.map(track => track.uri)
);

export const selectUserPlaylists = createSelector(
  [selectPlaylist],
  playlist => playlist.userPlaylists
);

export const selectFetchedPlaylistTracks = createSelector(
  [selectPlaylist],
  playlist =>
    playlist.playlistTracks
      ? playlist.playlistTracks.map(track => track.track)
      : null
);
