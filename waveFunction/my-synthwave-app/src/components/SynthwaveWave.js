import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./SynthwaveWave.css";

const SynthwaveWave = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted, setting up Three.js");

    // Capture the current value of the ref to use in cleanup
    const mountNode = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1214); // Dark background

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Adjust camera to focus on bottom third of screen
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Position camera to look at the bottom
    camera.position.set(0, 20, 25);
    // Look at a point in the bottom third
    camera.lookAt(0, -5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountNode.appendChild(renderer.domElement);

    // Create a group to hold all our lines
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    // Grid parameters - make it wider to fill screen horizontally
    const gridWidth = 200; // Much wider grid
    const gridHeight = 60;

    const gridResolution = 100; // Number of grid cells
    const gridStepX = gridWidth / gridResolution;
    const gridStepY = gridHeight / gridResolution;

    // Points per line segment - higher number = smoother curves
    const pointsPerSegment = 10; // Keeping this high for smooth curves

    // Line material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    // Noise parameters - REDUCED for more subtle effect
    const noiseParams = {
      // First noise layer
      freq1: 1.5, // Reduced for gentler waves
      amp1: 0.3, // Reduced for smaller waves
      speed1: 0.3, // Reduced for less vibration

      // Second noise layer
      freq2: 1.0,
      amp2: 0.4,
      speed2: 0.2,
    };

    // Store all lines for animation
    const lines = [];

    // Noise functions
    // 2D Random function
    const random = (x, y) => {
      return Math.fract(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123);
    };

    // Helper for fract (fractional part of a number)
    Math.fract = (x) => x - Math.floor(x);

    // 2D Noise function
    const noise = (st) => {
      const i = [Math.floor(st[0]), Math.floor(st[1])];
      const f = [st[0] - i[0], st[1] - i[1]];

      // Four corners in 2D of a tile
      const a = random(i[0], i[1]);
      const b = random(i[0] + 1.0, i[1]);
      const c = random(i[0], i[1] + 1.0);
      const d = random(i[0] + 1.0, i[1] + 1.0);

      // Cubic Hermite Curve (smoothstep)
      const u = [
        f[0] * f[0] * (3.0 - 2.0 * f[0]),
        f[1] * f[1] * (3.0 - 2.0 * f[1]),
      ];

      // Mix 4 corners
      return (
        a * (1.0 - u[0]) * (1.0 - u[1]) +
        b * u[0] * (1.0 - u[1]) +
        c * (1.0 - u[0]) * u[1] +
        d * u[0] * u[1]
      );
    };

    // Rotate 2D point
    const rotate2d = (x, y, angle) => {
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      return [x * c - y * s, x * s + y * c];
    };

    // Function to calculate z-value based on noise
    const calculateZ = (x, y, time) => {
      // First noise layer
      let z =
        noise([
          x * noiseParams.freq1 + time * noiseParams.speed1,
          y * noiseParams.freq1 + time * noiseParams.speed1,
        ]) * noiseParams.amp1;

      // Second noise layer (rotated and moving in opposite direction)
      const [rx, ry] = rotate2d(x, y, Math.PI / 4);
      z +=
        noise([
          rx * noiseParams.freq2 - time * noiseParams.speed2 * 0.6,
          ry * noiseParams.freq2 - time * noiseParams.speed2 * 0.6,
        ]) * noiseParams.amp2;

      return z;
    };

    // Create horizontal lines with many points for smooth curves
    for (let i = 0; i <= gridResolution; i++) {
      const y = i * gridStepY - gridHeight / 2;

      // Create a line with many points for each grid cell
      const linePoints = [];

      for (let j = 0; j <= gridResolution; j++) {
        // For each grid cell, create multiple points for smoother curves
        for (let k = 0; k < (j < gridResolution ? pointsPerSegment : 1); k++) {
          const x = (j + k / pointsPerSegment) * gridStepX - gridWidth / 2;
          linePoints.push(new THREE.Vector3(x, y, 0));
        }
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);

      // Store line data for animation
      lines.push({
        line,
        points: linePoints,
        isHorizontal: true,
        y,
      });
    }

    // Create vertical lines with many points for smooth curves
    for (let j = 0; j <= gridResolution; j++) {
      const x = j * gridStepX - gridWidth / 2;

      // Create a line with many points for each grid cell
      const linePoints = [];

      for (let i = 0; i <= gridResolution; i++) {
        // For each grid cell, create multiple points for smoother curves
        for (let k = 0; k < (i < gridResolution ? pointsPerSegment : 1); k++) {
          const y = (i + k / pointsPerSegment) * gridStepY - gridHeight / 2;
          linePoints.push(new THREE.Vector3(x, y, 0));
        }
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);

      // Store line data for animation
      lines.push({
        line,
        points: linePoints,
        isHorizontal: false,
        x,
      });
    }

    // Rotate to make horizontal with a slight tilt
    gridGroup.rotation.x = Math.PI / 2 - Math.PI / 10;

    // Position the grid much lower to ensure it stays in bottom third
    gridGroup.position.y = -20;

    // Move it forward slightly to ensure it's visible
    gridGroup.position.z = 5;

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Animation
    let animationId;
    let frameCount = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Log every 60 frames to avoid console spam
      if (frameCount % 60 === 0) {
        console.log("Animation frame:", frameCount);
      }
      frameCount++;

      const time = performance.now() * 0.001;

      // Update all lines
      lines.forEach((lineData) => {
        const { line, points, isHorizontal, x, y } = lineData;

        // Update z values for each point
        for (let i = 0; i < points.length; i++) {
          const point = points[i];

          if (isHorizontal) {
            // For horizontal lines, x varies, y is constant
            const z = calculateZ(point.x, y, time);
            point.z = z;
          } else {
            // For vertical lines, y varies, x is constant
            const z = calculateZ(x, point.y, time);
            point.z = z;
          }
        }

        // Update the line geometry
        line.geometry.setFromPoints(points);
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    // Start animation
    console.log("Starting animation loop");
    animate();

    // Cleanup function
    return () => {
      console.log("Component unmounting, cleaning up Three.js");
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      // Dispose of resources
      lines.forEach((lineData) => {
        lineData.line.geometry.dispose();
      });
      lineMaterial.dispose();
      renderer.dispose();

      // Remove canvas from DOM - using the captured mountNode
      if (mountNode && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="wave-container" />;
};

export default SynthwaveWave;
