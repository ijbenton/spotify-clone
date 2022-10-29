import axios from "axios";

const clientId = "c07316a87d2b484dba6cd298a9f73b00";
// Redirect URL Dev: http://localhost:3000/
// Redirect URL Prod: https://spotify-clone-bentondev.netlify.app/
const redirectUri = "https://spotify-clone-bentondev.netlify.app/";
const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public%20playlist-modify-private%20user-follow-read%20user-follow-modify%20user-top-read%20user-library-read%20user-library-modify%20playlist-read-collaborative%20playlist-read-private%20user-read-recently-played&&state=123`;
let userAccessToken,
  userExpiresIn,
  userId,
  headers,
  genres,
  recentlyPlayed,
  topArtists,
  topTracks,
  likedSongs,
  savedAlbums,
  userArtists,
  userPlaylists,
  fetchedAlbum,
  playlistTracks,
  genrePlaylists,
  featuredPlaylists,
  newReleases,
  artistRelated,
  artistAlbums,
  recommendations,
  artistDetails = null;
// Gets user's access token so they can make requests to the Spotify API
// Uses Implicit Grant Authorization Flow to obtain User Authorization
export const getAccessToken = () => {
  // If userAccessToken is already set, return userAccessToken
  if (userAccessToken) {
    headers = {
      Authorization: `Bearer ${userAccessToken}`,
    };
    return userAccessToken;
  }
  // Retrieve access token and expiration time from URL
  const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/);
  const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenUrl && expiresInUrl) {
    userAccessToken = accessTokenUrl[1];
    userExpiresIn = expiresInUrl[1];
    headers = {
      Authorization: `Bearer ${userAccessToken}`,
    };
    // Wipes access token and URL parameters so App doesn't grab acess token after it expires
    window.setTimeout(() => (userAccessToken = ""), userExpiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
  }
  // Access Token is empty and not in the URL redirect users to the Authorization URL
  else {
    window.location = accessUrl;
  }

  return userAccessToken;
};
// Conver milliseconds to mm:ss format
export const msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

// Checks an array of tracks and returns an array of booleans values on whether each track is saved
// Spotify endpoint can only accept 50 items at a times
export const checkSavedTracks = async (trackIds) => {
  let checks = [];
  while (trackIds.length > 50) {
    let splitTracks = trackIds.splice(0, 50);
    await axios
      .get(`https://api.spotify.com/v1/me/tracks/contains?ids=${splitTracks}`, {
        headers,
      })
      .then((response) => checks.push(...response.data));
  }
  if (trackIds.length > 0) {
    await axios
      .get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds}`, {
        headers,
      })
      .then((response) => checks.push(...response.data));
  }
  return checks;
};

// Checks an array of albums and returns an array of boolean values on whether each album is saved
// Spotify endpoint can only accept 50 items at a times
export const checkSavedAlbums = async (albumIds) => {
  let checks = [];
  while (albumIds.length > 50) {
    let splitAlbums = albumIds.splice(0, 50);
    await axios
      .get(`https://api.spotify.com/v1/me/albums/contains?ids=${splitAlbums}`, {
        headers,
      })
      .then((response) => checks.push(...response.data));
  }
  if (albumIds.length > 0) {
    await axios
      .get(`https://api.spotify.com/v1/me/albums/contains?ids=${albumIds}`, {
        headers,
      })
      .then((response) => checks.push(...response.data));
  }
  return checks;
};

export const checkFollowedArtists = async (artistIds) => {
  let checks = [];
  while (artistIds.length > 50) {
    let splitArtists = artistIds.splice(0, 50);
    await axios
      .get(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${splitArtists}`,
        {
          headers,
        }
      )
      .then((response) => checks.push(...response.data));
  }
  if (artistIds.length > 0) {
    await axios
      .get(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistIds}`,
        {
          headers,
        }
      )
      .then((response) => checks.push(...response.data));
  }
  return checks;
};

export const checkIfPlaylistFollowed = async (playlistId) => {
  let check = null;
  await axios
    .get(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`,
      {
        headers,
      }
    )
    .then((response) => (check = response.data));

  return check;
};

// search() method accepts a search term input, passes the search term value to a Spotify request,
// then returns the response as a list of tracks in JSON format
export const searchSpotify = async (term) => {
  // Start promise chain with a GET request to the Spotify endpoint, passing in the Authorization header
  let searchResults = null;
  await axios
    .get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers,
    })
    .then((response) => {
      // If no tracks return empty array
      if (response.data.tracks.items.length === 0) return [];
      // Map through each track and return an array of objects each containing track properties
      searchResults = response.data.tracks.items;
    })
    .then(async () => {
      let checks = await checkSavedTracks(
        searchResults.map((track) => track.id)
      );
      searchResults.forEach((track, index) => (track.saved = checks[index]));
    });
  return searchResults;
};

export const getCurrentUser = async () => {
  if (userId) return userId;
  await axios
    .get("https://api.spotify.com/v1/me", {
      headers,
    })
    // Save the User's ID
    .then((response) => {
      userId = response.data.id;
    });
  return userId;
};

export const getUserLikedSongs = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/tracks?limit=50", {
      headers,
    })
    .then(
      (response) => (likedSongs = response.data.items.map((song) => song.track))
    )
    .then(async () => {
      let checks = await checkSavedTracks(likedSongs.map((track) => track.id));
      likedSongs.forEach((track, index) => (track.saved = checks[index]));
    });

  return likedSongs;
};

export const getUserSavedAlbums = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/albums", {
      headers,
    })
    .then(
      (response) =>
        (savedAlbums = response.data.items.map((album) => album.album))
    )
    .then(async () => {
      let checks = await checkSavedAlbums(savedAlbums.map((album) => album.id));
      savedAlbums.forEach((album, index) => (album.saved = checks[index]));
    })
    .then(async () => {
      savedAlbums.forEach(async (album) => {
        let checks = await checkSavedTracks(
          album.tracks.items.map((track) => track.id)
        );
        album.tracks.items.forEach(
          (track, index) => (track.saved = checks[index])
        );
      });
    });
  return savedAlbums;
};

export const getUserFollowedArtists = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/following?type=artist", {
      headers,
    })
    .then((response) => (userArtists = response.data.artists.items))
    .then(async () => {
      let checks = await checkFollowedArtists(
        userArtists.map((artist) => artist.id)
      );
      userArtists.forEach((artist, index) => (artist.followed = checks[index]));
    });
  return userArtists;
};

export const getTopArtists = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/top/artists", {
      headers,
    })
    .then((response) => (topArtists = response.data.items))
    .then(async () => {
      let checks = await checkFollowedArtists(
        topArtists.map((artist) => artist.id)
      );
      topArtists.forEach((artist, index) => (artist.followed = checks[index]));
    });
  return topArtists;
};

export const getTopTracks = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/top/tracks", {
      headers,
    })
    .then((response) => (topTracks = response.data.items))
    .then(async () => {
      let checks = await checkSavedTracks(topTracks.map((track) => track.id));
      topTracks.forEach((track, index) => (track.saved = checks[index]));
    });
  return topTracks;
};

export const getUserPlaylists = async () => {
  await axios
    .get("https://api.spotify.com/v1/me", {
      headers,
    })
    // Save the User's ID
    .then((response) => {
      userId = response.data.id;
    })
    .then(async () => {
      await axios
        .get(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {
          headers,
        })
        .then((response) => {
          userPlaylists = response.data.items;
        });
    });

  return userPlaylists;
};

export const getAlbumById = async (id) => {
  await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers,
    })
    .then((response) => (fetchedAlbum = response.data))
    .then(async () => {
      let checks = await checkSavedAlbums(fetchedAlbum.id);
      fetchedAlbum.saved = checks[0];
    })
    .then(async () => {
      let checks = await checkSavedTracks(
        fetchedAlbum.tracks.items.map((track) => track.id)
      );
      fetchedAlbum.tracks.items.forEach(
        (track, index) => (track.saved = checks[index])
      );
    });
  return fetchedAlbum;
};

export const getPlaylistTracks = async (id) => {
  await axios
    .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers,
    })
    .then((response) => (playlistTracks = response.data.items))
    .then(async () => {
      let checks = await checkSavedTracks(
        playlistTracks.map((track) => track.track.id)
      );
      playlistTracks.forEach(
        (track, index) => (track.track.saved = checks[index])
      );
    });
  return playlistTracks;
};

export const getArtistAlbums = async (id) => {
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/albums?country=US`, {
      headers,
    })
    .then(
      (response) =>
        (artistAlbums = response.data.items.filter(
          (album, index, self) =>
            index === self.findIndex((t) => t.name === album.name)
        ))
    )
    .then(async () => {
      let checks = await checkSavedAlbums(
        artistAlbums.map((album) => album.id)
      );
      artistAlbums.forEach((album, index) => (album.saved = checks[index]));
    });
  return artistAlbums;
};

export const getArtistTopTracks = async (id) => {
  let artistTopTracks;
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`, {
      headers,
    })
    .then((response) => {
      artistTopTracks = response.data.tracks;
    })
    .then(async () => {
      let checks = await checkSavedTracks(
        artistTopTracks.map((track) => track.id)
      );
      artistTopTracks.forEach((track, index) => (track.saved = checks[index]));
    });
  return artistTopTracks;
};

export const getArtistRelated = async (id) => {
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
      headers,
    })
    .then((response) => (artistRelated = response.data.artists))
    .then(async () => {
      let checks = await checkFollowedArtists(
        artistRelated.map((artist) => artist.id)
      );
      artistRelated.forEach(
        (artist, index) => (artist.followed = checks[index])
      );
    });

  return artistRelated;
};

export const getArtistDetails = async (id) => {
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers,
    })
    .then((response) => (artistDetails = response.data))
    .then(async () => {
      let checks = await checkFollowedArtists(id);

      artistDetails.followed = checks[0];
    });

  return artistDetails;
};

export const getNewReleases = async () => {
  await axios
    .get("https://api.spotify.com/v1/browse/new-releases", {
      headers,
    })
    .then((response) => (newReleases = response.data.albums.items))
    .then(async () => {
      let checks = await checkSavedAlbums(newReleases.map((album) => album.id));
      newReleases.forEach((album, index) => (album.saved = checks[index]));
    });

  return newReleases;
};

export const getFeaturedPlaylists = async () => {
  await axios
    .get("https://api.spotify.com/v1/browse/featured-playlists", {
      headers,
    })
    .then((response) => (featuredPlaylists = response.data.playlists.items));
  return featuredPlaylists;
};

export const getBrowsingGenres = async () => {
  await axios
    .get("https://api.spotify.com/v1/browse/categories", {
      headers,
    })
    .then((response) => (genres = response.data.categories.items));
  return genres;
};

export const getGenrePlaylists = async (genre) => {
  await axios
    .get(`https://api.spotify.com/v1/browse/categories/${genre}/playlists`, {
      headers,
    })
    .then(
      (response) =>
        (genrePlaylists = { items: response.data.playlists.items, genre })
    );
  return genrePlaylists;
};

export const getRecentlyPlayed = async () => {
  await axios
    .get("https://api.spotify.com/v1/me/player/recently-played", {
      headers,
    })
    .then((response) => {
      recentlyPlayed = response.data.items
        .map((track) => track.track)
        .filter(
          (track, index, self) =>
            index === self.findIndex((t) => t.name === track.name)
        );
    })
    .then(async () => {
      let checks = await checkSavedTracks(
        recentlyPlayed.map((track) => track.id)
      );
      recentlyPlayed.forEach((track, index) => (track.saved = checks[index]));
    });
  return recentlyPlayed;
};

export const getRecommendations = async (tracks, artists) => {
  await axios
    .get(
      `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}&seed_tracks=${tracks}`,
      {
        headers,
      }
    )
    .then((response) => {
      recommendations = response.data.tracks;
    })
    .then(async () => {
      let checks = await checkSavedTracks(
        recommendations.map((track) => track.id)
      );
      recommendations.forEach((track, index) => (track.saved = checks[index]));
    });
  return recommendations;
};

export const likeTrack = (trackId) => {
  axios(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: "PUT",
    headers,
  });
};
export const unlikeTrack = (trackId) => {
  axios(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: "DELETE",
    headers,
  });
};

export const likeAlbum = (albumId) => {
  axios(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
    method: "PUT",
    headers,
  });
};

export const unlikeAlbum = (albumId) => {
  axios(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, {
    method: "DELETE",
    headers,
  });
};
export const followArtist = (artistId) => {
  axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
    method: "PUT",
    headers,
  });
};

export const unfollowArtist = (artistId) => {
  axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
    method: "DELETE",
    headers,
  });
};
export const followPlaylist = (playlistId) => {
  axios(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
    method: "PUT",
    headers,
  });
};

export const unfollowPlaylist = (playlistId) => {
  axios(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
    method: "DELETE",
    headers,
  });
};
