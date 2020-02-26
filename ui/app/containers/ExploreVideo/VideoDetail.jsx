import React from 'react';


export default function VideoDetail({ video }) {
  if (!video) { // if there is no video - the video will load multiple time. If there is no video then we display a spinner, if there is a video than we can try to show it.
    return (
      <section>
        Loading media...
      </section>
    );
  }

  // this is the video player
  const { videoId } = video.id;
  // url is the embedded video. It is the easier version of an API
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
