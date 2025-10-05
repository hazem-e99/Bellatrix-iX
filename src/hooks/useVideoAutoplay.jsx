import { useState, useEffect } from "react";

/**
 * Hook to handle video autoplay restrictions
 * Provides methods to enable video playback after user interaction
 */
export const useVideoAutoplay = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      // Enable all videos on the page after first user interaction
      const videos = document.querySelectorAll("video[data-autoplay-blocked]");
      videos.forEach(async (video) => {
        try {
          await video.play();
          video.removeAttribute("data-autoplay-blocked");
        } catch (error) {
          console.log("Video still cannot play after user interaction");
        }
      });
    };

    if (!hasUserInteracted) {
      // Listen for various user interaction events
      const events = ["click", "touchstart", "keydown"];
      events.forEach((event) => {
        document.addEventListener(event, handleFirstInteraction, {
          once: true,
        });
      });

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, handleFirstInteraction);
        });
      };
    }
  }, [hasUserInteracted]);

  /**
   * Attempt to play a video with proper error handling
   * @param {HTMLVideoElement} videoElement - The video element to play
   * @param {Function} onSuccess - Callback when video starts playing
   * @param {Function} onBlocked - Callback when autoplay is blocked
   */
  const playVideo = async (videoElement, onSuccess, onBlocked) => {
    if (!videoElement) return;

    try {
      await videoElement.play();
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.name === "AbortError" || error.name === "NotAllowedError") {
        // Mark video as blocked for later activation
        videoElement.setAttribute("data-autoplay-blocked", "true");
        if (onBlocked) onBlocked();
      } else {
        console.warn("Video playback error:", error);
      }
    }
  };

  return {
    hasUserInteracted,
    playVideo,
    enableAllVideos: () => setHasUserInteracted(true),
  };
};

export default useVideoAutoplay;
