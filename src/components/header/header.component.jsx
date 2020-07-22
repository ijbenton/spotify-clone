import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faBars,
  faTimes,
  faHome,
  faBook,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../search-bar/search-bar.component';

import { fetchCurrentUser } from '../../redux/user/user.actions';
import { toggleSidebar } from '../../redux/ui/ui.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectIsSidebarOpen } from '../../redux/ui/ui.selectors';

import './header.styles.scss';

const Header = ({
  currentUser,
  fetchCurrentUser,
  toggleSidebar,
  isSidebarOpen
}) => {
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, []);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  return (
    <header className={isTabletOrMobile ? 'top-header mobile' : 'top-header'}>
      <div className="desktop-navbar">
        <SearchBar />
        <div className="user-icon">
          {currentUser}
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
      </div>
      <div className="mobile-navbar">
        <div className="sidebar-div" onClick={toggleSidebar}>
          <FontAwesomeIcon
            className="sidebar-icon"
            icon={isSidebarOpen ? faTimes : faBars}
          />
          <span>Menu</span>
        </div>

        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link to="/search-results">
          <FontAwesomeIcon icon={faSearch} />
          <span>Search</span>
        </Link>
        <Link to="/browse/genres">
          <FontAwesomeIcon icon={faBook} />
          <span>Browse</span>
        </Link>
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  toggleSidebar: () => dispatch(toggleSidebar())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isSidebarOpen: selectIsSidebarOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
