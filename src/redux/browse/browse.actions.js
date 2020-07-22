import BrowseActionTypes from './browse.types';

export const fetchGenresStart = () => ({
  type: BrowseActionTypes.FETCH_GENRES_START
});

export const fetchGenresSuccess = genres => ({
  type: BrowseActionTypes.FETCH_GENRES_SUCCESS,
  payload: genres
});

export const fetchGenresFailure = error => ({
  type: BrowseActionTypes.FETCH_GENRES_FAILURE,
  payload: error
});

export const fetchNewReleases = () => ({
  type: BrowseActionTypes.FETCH_NEW_RELEASES_START
});

export const fetchNewReleasesSuccess = newReleases => ({
  type: BrowseActionTypes.FETCH_NEW_RELEASES_SUCCESS,
  payload: newReleases
});

export const fetchNewReleasesFailure = error => ({
  type: BrowseActionTypes.FETCH_NEW_RELEASES_FAILURE,
  payload: error
});

export const fetchFeaturedPlaylists = () => ({
  type: BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_START
});

export const fetchFeaturedPlaylistsSuccess = featuredPlaylists => ({
  type: BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS,
  payload: featuredPlaylists
});

export const fetchFeaturedPlaylistsFailure = error => ({
  type: BrowseActionTypes.FETCH_FEATURED_PLAYLISTS_FAILURE,
  payload: error
});

export const fetchAlbumById = albumId => ({
  type: BrowseActionTypes.FETCH_ALBUM_BY_ID_START,
  payload: albumId
});

export const fetchAlbumByIdSuccess = albumTracks => ({
  type: BrowseActionTypes.FETCH_ALBUM_BY_ID_SUCCESS,
  payload: albumTracks
});

export const fetchAlbumByIdFailure = error => ({
  type: BrowseActionTypes.FETCH_ALBUM_BY_ID_FAILURE,
  payload: error
});

export const resetAlbum = () => ({
  type: BrowseActionTypes.RESET_ALBUM
});

export const fetchGenrePlaylists = genre => ({
  type: BrowseActionTypes.FETCH_GENRE_PLAYLISTS_START,
  payload: genre
});

export const fetchGenrePlaylistsSuccess = playlists => ({
  type: BrowseActionTypes.FETCH_GENRE_PLAYLISTS_SUCCESS,
  payload: playlists
});

export const fetchGenrePlaylistsFailure = error => ({
  type: BrowseActionTypes.FETCH_GENRE_PLAYLISTS_FAILURE,
  payload: error
});
