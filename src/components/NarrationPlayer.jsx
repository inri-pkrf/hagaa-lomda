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
  const srcs = useNarration();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSrc = srcs?.[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [srcs]);

  useEffect(() => {
    if (!audioRef.current || !currentSrc) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (isFullscreen()) {
      audioRef.current.play().catch(() => setPlaying(false));
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSrc]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!audioRef.current || !currentSrc) return;
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (!currentSrc) return null;

  return (
    <div className="narration-player">
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/${currentSrc}`}
        onEnded={handleEnded}
      />
      <button
        className="narration-btn"
        onClick={togglePlay}
        title={playing ? "השהה קריינות" : "הפעל קריינות"}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </div>
  );
}
