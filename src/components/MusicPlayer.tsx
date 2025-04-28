"use client";

import { useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play();
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* <audio ref={audioRef} src="/audio/music1.mp3" loop preload="auto" />
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-50 p-2 bg-black text-white rounded-full opacity-70 hover:opacity-100"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button> */}
    </>
  );
};

export default MusicPlayer;
