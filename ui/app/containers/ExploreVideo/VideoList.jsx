import React from 'react';
import VideoListItem from './VideoListItem';

// this is the parent of VideoListIem.

export default function VideoList(props) {
  const {
    onVideoSelect,
    videos,
  } = props;
  // map through the youtube videos and pass the props to the child component. Many youtube videos then we pass one video at a time.
  const videoItems = videos.map((video, index) => <VideoListItem index={index} onVideoSelect={onVideoSelect} key={video.etag} video={video} />);

  return (
    <nav id="video-list">
      {videoItems}
    </nav>
  );
}
