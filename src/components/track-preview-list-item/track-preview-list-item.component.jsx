import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { setCurrentTrackList } from '../../redux/player/player.actions';

import { selectIsSidebarOpen } from '../../redux/ui/ui.selectors';

import './track-preview-list-item.styles.scss';

const TrackPreviewListItem = ({
  track,
  setCurrentTrackList,
  tracks,
  image,
  audioControl,
  isSidebarOpen
}) => {
  const onPlay = () => {
    setCurrentTrackList(tracks);
    audioControl(track);
  };

  return (
    <div className={isSidebarOpen ? 'row-item sidebar-open' : 'row-item'}>
      <div className="row-item-image" onClick={onPlay}>
        <img src={image.url} alt="" />
        <FontAwesomeIcon className="hover-play-button" icon={faPlayCircle} />
      </div>
      <h5>
        <span onClick={onPlay}>{track.name}</span>
      </h5>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentTrackList: tracks => dispatch(setCurrentTrackList(tracks))
});

const mapStateToProps = createStructuredSelector({
  isSidebarOpen: selectIsSidebarOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackPreviewListItem);
