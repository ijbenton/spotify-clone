import ArtistActionTypes from './artist.types';

export const fetchArtistAlbums = id => ({
  type: ArtistActionTypes.FETCH_ARTIST_ALBUMS_START,
  payload: id
});

export const fetchArtistAlbumsSuccess = albums => ({
  type: ArtistActionTypes.FETCH_ARTIST_ALBUMS_SUCCESS,
  payload: albums
});

export const fetchArtistAlbumsFailure = error => ({
  type: ArtistActionTypes.FETCH_ARTIST_ALBUMS_FAILURE,
  payload: error
});

export const fetchArtistTracks = id => ({
  type: ArtistActionTypes.FETCH_ARTIST_TRACKS_START,
  payload: id
});

export const fetchArtistTracksSuccess = tracks => ({
  type: ArtistActionTypes.FETCH_ARTIST_TRACKS_SUCCESS,
  payload: tracks
});

export const fetchArtistTracksFailure = error => ({
  type: ArtistActionTypes.FETCH_ARTIST_TRACKS_FAILURE,
  payload: error
});

export const fetchArtistRelated = id => ({
  type: ArtistActionTypes.FETCH_ARTIST_RELATED_START,
  payload: id
});

export const fetchArtistRelatedSuccess = related => ({
  type: ArtistActionTypes.FETCH_ARTIST_RELATED_SUCCESS,
  payload: related
});

export const fetchArtistRelatedFailure = error => ({
  type: ArtistActionTypes.FETCH_ARTIST_RELATED_FAILURE,
  payload: error
});

export const fetchArtistById = id => ({
  type: ArtistActionTypes.FETCH_ARTIST_START,
  payload: id
});

export const fetchArtistByIdSuccess = artist => ({
  type: ArtistActionTypes.FETCH_ARTIST_SUCCESS,
  payload: artist
});

export const fetchArtistByIdFailure = error => ({
  type: ArtistActionTypes.FETCH_ARTIST_FAILURE,
  payload: error
});

export const resetArtist = () => ({
  type: ArtistActionTypes.RESET_ARTIST
});
