import React, { useState, useEffect } from "react";

export default function VideoBackground() {
  const videos = [
    "/images/videos/couple0.mp4",
    "/images/videos/couple1.mp4",
    "/images/videos/couple2.mp4",
    "/images/videos/couple3.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const videoElement = document.getElementById("cta-video");

    const playNextVideo = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      const tempVideo = document.createElement("video");
      tempVideo.src = videos[nextIndex];
      tempVideo.load();
      tempVideo.onloadeddata = () => {
        setCurrentVideoIndex(nextIndex);
        videoElement.play();
      };
    };

    videoElement.addEventListener("ended", playNextVideo);
    videoElement.play();

    return () => {
      videoElement.removeEventListener("ended", playNextVideo);
    };
  }, [currentVideoIndex]);

  return (
    <div className="absolute inset-0" style={{ zIndex: 1000 }}>
      <video
        id="cta-video"
        muted
        playsInline
        autoPlay
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videos[currentVideoIndex]}
      />
    </div>
  );
}
