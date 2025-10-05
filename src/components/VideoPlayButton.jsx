import { useState, useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

const VideoPlayButton = ({ onPlay, className = "" }) => {
  const [showButton, setShowButton] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show play button after a short delay if video hasn't started
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowButton(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleClick = () => {
    setHasInteracted(true);
    setShowButton(false);
    if (onPlay) {
      onPlay();
    }
  };

  if (!showButton) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-20 ${className}`}
    >
      <button
        onClick={handleClick}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-4 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Play background video"
      >
        <PlayCircleIcon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
        <span className="sr-only">Click to play background video</span>
      </button>
    </div>
  );
};

export default VideoPlayButton;
