import React from 'react';


function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function VideoListItem({ index, video, onVideoSelect }) {
  const tabOffset = 2;
  // getting data from youtube, provided to us, dot syntax to get us to the thumbnail path.
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    // these are the thumbnails you can tell by the alt tag
    <div className="video-list-media" onClick={() => onVideoSelect(video)} onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
      <div className="media-thumbnail" style={{float: "left", width: "200px", margin: "10px"}}>
        <img src={imageUrl} alt="Video thumbnail" />
      </div>
      <div className="media-heading" style={{color: "white", display: "none"}}>
        {video.snippet.title}
      </div>
    </div>
  );
}
