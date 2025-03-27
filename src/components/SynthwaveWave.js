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
    scene.background = new THREE.Color(0x000000); // Black background

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 25); // Adjusted for better viewing
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountNode.appendChild(renderer.domElement);

    // Grid parameters
    const gridSize = 30;
    const amplitude = 0.5;
    const frequency = 0.5;

    // Higher resolution for smoother curves
    const resolution = 50; // Increased from 30 for smoother curves

    // Create a group to hold all our lines
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    // Create horizontal and vertical lines with curves
    const createCurvedLines = () => {
      // Clear previous lines
      while (gridGroup.children.length > 0) {
        gridGroup.remove(gridGroup.children[0]);
      }

      const time = Date.now() * 0.001;
      const lineColor = new THREE.Color(0x00ffff);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: 0.8,
      });

      // Create horizontal lines
      for (let i = 0; i <= resolution; i++) {
        const y = (i / resolution) * gridSize - gridSize / 2;
        const points = [];

        // Create points for this line with more detail
        for (let j = 0; j <= resolution; j++) {
          const x = (j / resolution) * gridSize - gridSize / 2;

          // Calculate z using the same wave function
          const xFreq = frequency * 0.7;
          const yFreq = frequency * 1.3;
          const offset = (x * 0.1 + y * 0.1) * Math.PI * 2; // Deterministic offset based on position
          const z =
            Math.sin(time * frequency + x * xFreq + y * yFreq + offset) *
            amplitude;

          points.push(new THREE.Vector3(x, y, z));
        }

        // Create a smooth curve through these points
        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(resolution * 2); // Double points for smoother curve

        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const line = new THREE.Line(geometry, lineMaterial);
        gridGroup.add(line);
      }

      // Create vertical lines
      for (let i = 0; i <= resolution; i++) {
        const x = (i / resolution) * gridSize - gridSize / 2;
        const points = [];

        for (let j = 0; j <= resolution; j++) {
          const y = (j / resolution) * gridSize - gridSize / 2;

          // Calculate z using the same wave function
          const xFreq = frequency * 0.7;
          const yFreq = frequency * 1.3;
          const offset = (x * 0.1 + y * 0.1) * Math.PI * 2; // Deterministic offset
          const z =
            Math.sin(time * frequency + x * xFreq + y * yFreq + offset) *
            amplitude;

          points.push(new THREE.Vector3(x, y, z));
        }

        // Create a smooth curve through these points
        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(resolution * 2); // Double points for smoother curve

        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const line = new THREE.Line(geometry, lineMaterial);
        gridGroup.add(line);
      }

      // Rotate the entire grid to horizontal
      gridGroup.rotation.x = -Math.PI / 2;
    };

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

      // Recreate curved lines on each frame
      createCurvedLines();

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
      while (gridGroup.children.length > 0) {
        const line = gridGroup.children[0];
        line.geometry.dispose();
        line.material.dispose();
        gridGroup.remove(line);
      }

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
