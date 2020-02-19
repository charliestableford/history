import React from 'react';

export default function VideoDetail({ video }) {
  if (!video) {
    return (
      <section>
        Loading...
      </section>
    );
  }

  const { videoId } = video.id;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <main id="video-detail" style={{width: "50%", margin: "50px"}}>
      <section id="video-player">
        <iframe title="YouTube video player" src={url} />
      </section>
      <section id="video-text" style={{margin: "10px"}}>
        <div id="video-title">
          {video.snippet.title}
        </div>
        <div id="video-description" style={{display: "none"}}>
          {video.snippet.description}
        </div>
      </section>
    </main>
  );
}
