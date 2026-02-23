import React from 'react';

function VideoPlayer({ src, title }) {
  return (
    <div>
      <h2>{title || 'Video'}</h2>
      <video src={src} controls style={{ maxWidth: '100%' }} />
    </div>
  );
}

export default VideoPlayer;

