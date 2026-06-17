import React, { useEffect, useRef, useState } from "react";
import { useNarration } from "../hooks/useNarration";

const isFullscreen = () => {
  return (
    !!document.fullscreenElement ||
    (window.innerHeight === window.screen.height &&
      window.innerWidth === window.screen.width)
  );
};

export default function NarrationPlayer() {
  const { srcs, autoplay, skipFullscreenCheck } = useNarration();
  const audioRef = useRef(null);
  useEffect(() => {
    window.__narrationAudio = audioRef.current;
  }, []);

  const getInitialMuted = () =>
    sessionStorage.getItem("narrationPaused") === "true";

  const [muted, setMuted] = useState(getInitialMuted);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const previousSrcRef = useRef(null);

  useEffect(() => {
    const handleNarrationPaused = (e) => {
      const nextMuted = e.detail === true;
      setMuted(nextMuted);
      sessionStorage.setItem("narrationPaused", nextMuted ? "true" : "false");
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
        if (nextMuted) {
          audioRef.current.pause();
          setPlaying(false);
        } else if (audioRef.current.src) {
          audioRef.current.play().catch(() => setPlaying(false));
          setPlaying(true);
        }
      }
    };

    window.addEventListener("setNarrationPaused", handleNarrationPaused);
    return () =>
      window.removeEventListener("setNarrationPaused", handleNarrationPaused);
  }, []);

  const currentSrc = srcs?.[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [srcs]);

  // קרא את muted מ-sessionStorage כל פעם שcurrentSrc משתנה (כלומר, כשעברנו לעמוד חדש)
  useEffect(() => {
    const saved = sessionStorage.getItem("narrationPaused");
    if (saved !== null) {
      setMuted(saved === "true");
    }
  }, [currentSrc]);

  useEffect(() => {
    if (!audioRef.current || !currentSrc) return;
    if (previousSrcRef.current !== currentSrc) {
      audioRef.current.pause();
      audioRef.current.load();
      previousSrcRef.current = currentSrc;
    }
    audioRef.current.muted = muted;
    if (muted) {
      setPlaying(false);
      return;
    }
    // אל תנגן את הקריינות הראשית כשה-notice פעיל
    const noticeAudio = window.__noticeAudio;
    const noticeIsActive =
      noticeAudio && !noticeAudio.ended && noticeAudio.src !== "";
    
    if (noticeIsActive) {
      return;
    }
    
    if (skipFullscreenCheck || (isFullscreen() && autoplay)) {
      audioRef.current.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }, [currentSrc, autoplay, skipFullscreenCheck, muted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!audioRef.current || !currentSrc) return;
      if (skipFullscreenCheck) return;
      if (isFullscreen()) {
        audioRef.current.play().catch(() => setPlaying(false));
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("resize", handleFullscreenChange);
    };
  }, [currentSrc]);

  const handleEnded = () => {
    // ב-questions-end לא ממשיכים אוטומטית — ה-QuizEngine מפעיל ידנית
    const isQuizPage = window.location.hash.includes("questions-end");
    if (isQuizPage) {
      setPlaying(false);
      return;
    }

    if (srcs && currentIndex < srcs.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPlaying(false);
    }
  };

  // const togglePlay = () => {
  //   if (!audioRef.current) return;
  //   if (playing) {
  //     audioRef.current.pause();
  //     setPlaying(false);
  //   } else {
  //     audioRef.current.play();
  //     setPlaying(true);
  //   }
  // };

  const togglePlay = () => {
    if (!audioRef.current) return;

    const noticeAudio = window.__noticeAudio;
    const noticeIsActive =
      noticeAudio && !noticeAudio.ended && noticeAudio.src !== "";

    const nextMuted = !muted;
    setMuted(nextMuted);
    sessionStorage.setItem("narrationPaused", nextMuted ? "true" : "false");

    if (nextMuted) {
      audioRef.current.pause();
      if (noticeIsActive) noticeAudio.pause();
      setPlaying(false);
      return;
    }

    // מנגן רק את מה שרלוונטי — לא את שניהם
    if (noticeIsActive) {
      // וודא שהקריינות הראשית מושתקת כשמנגנים notice
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      noticeAudio.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.play().catch(() => setPlaying(false));
    }
    setPlaying(true);
  };

  if (!currentSrc) return null;

  return (
    <div className="narration-player">
      {/* <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/${currentSrc}`}
        onEnded={handleEnded}
      /> */}
      <audio
        ref={(el) => {
          audioRef.current = el;
          window.__narrationAudio = el; // 👈 זה כל השינוי
        }}
        src={`${process.env.PUBLIC_URL}/${currentSrc}`}
        onEnded={handleEnded}
      />
      <button
        className="narration-btn"
        onClick={togglePlay}
        title={muted ? "הפעל קריינות" : "השהה קריינות"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
