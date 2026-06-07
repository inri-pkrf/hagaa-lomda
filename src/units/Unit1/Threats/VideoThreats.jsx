import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoThreats.css';

function VideoThreats({ setVideoPlaying, onVideoEnd }) {
  const navigate = useNavigate();
  const [canFinish, setCanFinish] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: true }));
  }, []);

  const handleVideoEnd = () => {
    setCanFinish(true);
    if (onVideoEnd) onVideoEnd();
    window.dispatchEvent(new CustomEvent('setNextBtnDisabled', { detail: false }));
    window.dispatchEvent(new Event('updateNavbar'));

    if (setVideoPlaying) setVideoPlaying(false);
    else sessionStorage.setItem('VIDEO IS PLAYING', 'false');

    sessionStorage.setItem('unitOne-first', 'finished');
    sessionStorage.setItem('currentChapter', JSON.stringify({ name: 'UnitOne-first', state: 'finished' }));
  };

  return (
    <div className='VideoThreats'>
      <div className='VideoThreats-container'>
        <video
          ref={videoRef}
          width="80%"
          height="80%"
          controls
          onEnded={handleVideoEnd}
          className='VideoThreats-video'
        >
          <source
            src={`${process.env.PUBLIC_URL}/assets/videos/VideoThreats.mp4`}
            type="video/mp4"
          />
          הדפדפן שלך לא תומך בסרטון
        </video>

        {!canFinish && (
          <p className="waiting-message">יש לצפות בסרטון עד סופו להמשך</p>
        )}
      </div>
    </div>
  );
}

export default VideoThreats;