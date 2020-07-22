import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook } from '@fortawesome/free-solid-svg-icons';

import { fetchUserPlaylists } from '../../redux/playlist/playlist.actions';
import { toggleSidebar, openSidebar } from '../../redux/ui/ui.actions';

import { selectUserPlaylists } from '../../redux/playlist/playlist.selectors';
import { selectIsSidebarOpen } from '../../redux/ui/ui.selectors';

import './sidebar.styles.scss';

const SideBar = ({
  userPlaylists,
  fetchUserPlaylists,
  isSidebarOpen,
  toggleSidebar,
  openSidebar
}) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  // On first render fetch user playlists
  useEffect(() => {
    if (!userPlaylists) {
      fetchUserPlaylists();
    }
    if (isTabletOrMobile) {
      openSidebar();
    }
  }, []);
  // Sidebar will switch when checking responsiveness is dev tools
  useEffect(() => {
    toggleSidebar();
  }, [isTabletOrMobile]);

  return (
    <aside className={isSidebarOpen ? 'sidebar' : 'side-bar-closed'}>
      {isSidebarOpen ? (
        <nav>
          <div className="options-container">
            <Link to="/" className="option-link">
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
            <Link to="/browse/genres" className="option-link">
              <FontAwesomeIcon icon={faBook} />
              Browse
            </Link>
          </div>
          <div className="user-links">
            <div className="section-title">YOUR LIBRARY</div>
            <Link to="/recently-played" className="option-link">
              Recently Played
            </Link>
            <Link to="/liked-songs" className="option-link">
              Liked Songs
            </Link>
            <Link to="/albums" className="option-link">
              Albums
            </Link>
            <Link to="/artists" className="option-link">
              Artists
            </Link>
            <div className="section-title">PLAYLISTS</div>
            {userPlaylists
              ? userPlaylists.map(playlist => (
                  <Link
                    to={`/playlists/user-playlist/${playlist.id}`}
                    className="option-link playlist"
                    key={playlist.id}
                  >
                    {playlist.name}
                  </Link>
                ))
              : null}
          </div>
        </nav>
      ) : null}
    </aside>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUserPlaylists: () => dispatch(fetchUserPlaylists()),
  toggleSidebar: () => dispatch(toggleSidebar()),
  openSidebar: () => dispatch(openSidebar())
});

const mapStateToProps = createStructuredSelector({
  userPlaylists: selectUserPlaylists,
  isSidebarOpen: selectIsSidebarOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
