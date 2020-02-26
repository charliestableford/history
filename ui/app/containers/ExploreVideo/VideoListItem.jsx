import React from 'react';
import styled from 'styled-components';


function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}
// these are props that are getting passed in by the partent - the partent needs to provide the index, video and onVideoSelect.
export default function VideoListItem({ index, video, onVideoSelect }) {
  const tabOffset = 2;
  // getting data from youtube, provided to us, dot syntax to get us to the thumbnail path.
  const imageUrl = video.snippet.thumbnails.default.url;


  const VideoListItem = styled.li`
    list-style: none;
    margin: 20px;
    display: inline-block;
    // float: left;
    `

  return (
  <VideoListItem>
    <div className="video-list-media" onClick={() => onVideoSelect(video)} onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
        <img src={imageUrl} alt="Video thumbnail" />
      <div className="media-heading" style={{display: "none"}}>
        {video.snippet.title}
      </div>
      </div>
      </VideoListItem>
  );
}
