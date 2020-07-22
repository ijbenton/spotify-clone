import React from 'react';
import { Link } from 'react-router-dom';

import TrackPreviewListItem from '../track-preview-list-item/track-preview-list-item.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './track-preview-list.styles.scss';

const TrackPreviewList = ({ tracks, title, moreLink, audioControl }) => {
  return (
    <div className="track-preview-list">
      {title ? <h2>{title}</h2> : null}
      <div className="track-preview-list-container">
        <div className="items-container">
          {tracks
            ? tracks.map((track, index) => {
                let image = track.album.images.find(
                  image => image.width === 300
                );
                return (
                  <TrackPreviewListItem
                    track={track}
                    image={image}
                    trackList={tracks}
                    key={index}
                    tracks={tracks}
                    audioControl={audioControl}
                  />
                );
              })
            : null}
          {tracks ? (
            <div className="more-button">
              <Link to={moreLink}>
                <span>MORE </span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TrackPreviewList;
