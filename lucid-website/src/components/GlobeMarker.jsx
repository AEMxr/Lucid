import React from "react";

export default function GlobeMarker({ color, size = 20 }) {
  return (
    <div className="relative">
      {/* Core marker */}
      <div
        className="rounded-full animate-pulse-slow"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}, 0 0 60px ${color}`,
        }}
      />

      {/* Ripple effect */}
      <div
        className="absolute top-0 left-0 rounded-full animate-ripple"
        style={{
          width: size,
          height: size,
          border: `2px solid ${color}`,
        }}
      />
    </div>
  );
}
