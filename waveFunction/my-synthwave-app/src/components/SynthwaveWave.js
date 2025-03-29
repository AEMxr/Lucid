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

    // Reduce resolution for better performance with curves
    const gridResolution = 50; // Reduced from 100
    const gridStepX = gridWidth / gridResolution;
    const gridStepY = gridHeight / gridResolution;

    // Points per curve - higher number = smoother curves
    const pointsPerCurve = 200; // High number for very smooth curves

    // Line material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    // Add this after your lineMaterial definition
    const secondaryLineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4, // Lower opacity for the secondary lines
    });

    // Define the offset distance between parallel lines
    const lineOffset = gridStepX * 0.2; // 20% of grid step size

    // Noise parameters
    const noiseParams = {
      // First noise layer
      freq1: 20,
      amp1: 4,
      speed1: 0.4,

      // Second noise layer
      freq2: 20,
      amp2: 4,
      speed2: 0.4,
    };

    // Define how often to apply noise (every 5th point for more detail)
    const noiseInterval = 3; // Reduced from 10

    // Store all curves for animation - MOVED THIS UP BEFORE USAGE
    const curves = [];

    // Helper functions
    // Smoothstep for smoother interpolation
    const smoothstep = (edge0, edge1, x) => {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };

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

    // Function to calculate z-value based on noise with smoothing
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

      // Apply a smoothing function to make peaks less pointy
      // Using a sine-based smoothing that preserves amplitude but rounds peaks
      return Math.sin(z * 0.5) * Math.abs(z) * 1.2;
    };

    // Create a grid of z-values at intersection points
    const gridPoints = [];
    for (let i = 0; i <= gridResolution; i++) {
      gridPoints[i] = [];
      for (let j = 0; j <= gridResolution; j++) {
        // Only apply noise to intersection points at noiseInterval
        if (i % noiseInterval === 0 && j % noiseInterval === 0) {
          gridPoints[i][j] = { hasNoise: true };
        } else {
          gridPoints[i][j] = { hasNoise: false };
        }
      }
    }

    // Modify the horizontal curves creation section
    for (let i = 0; i <= gridResolution; i++) {
      const y = i * gridStepY - gridHeight / 2;

      // Create two sets of lines for each grid position
      for (let lineIndex = 0; lineIndex < 2; lineIndex++) {
        // Apply offset for the second line in each pair
        const yOffset = y + (lineIndex === 1 ? lineOffset : 0);

        // Create control points for the curve
        const controlPoints = [];

        for (let j = 0; j <= gridResolution; j++) {
          const x = j * gridStepX - gridWidth / 2;
          controlPoints.push(new THREE.Vector3(x, yOffset, 0));
        }

        // Create a Catmull-Rom curve
        const curve = new THREE.CatmullRomCurve3(controlPoints);
        curve.curveType = "centripetal";
        curve.tension = 0.5;

        // Sample the curve with many points for smooth rendering
        const curvePoints = curve.getPoints(pointsPerCurve);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

        // Use different material for primary vs secondary lines
        const material = lineIndex === 0 ? lineMaterial : secondaryLineMaterial;
        const line = new THREE.Line(geometry, material);
        gridGroup.add(line);

        // Store curve data for animation
        curves.push({
          line,
          curve,
          controlPoints,
          isHorizontal: true,
          y: yOffset,
          isPrimary: lineIndex === 0,
        });
      }
    }

    // Similarly modify the vertical curves creation section
    for (let j = 0; j <= gridResolution; j++) {
      const x = j * gridStepX - gridWidth / 2;

      // Create two sets of lines for each grid position
      for (let lineIndex = 0; lineIndex < 2; lineIndex++) {
        // Apply offset for the second line in each pair
        const xOffset = x + (lineIndex === 1 ? lineOffset : 0);

        // Create control points for the curve
        const controlPoints = [];

        for (let i = 0; i <= gridResolution; i++) {
          const y = i * gridStepY - gridHeight / 2;
          controlPoints.push(new THREE.Vector3(xOffset, y, 0));
        }

        // Create a Catmull-Rom curve
        const curve = new THREE.CatmullRomCurve3(controlPoints);
        curve.curveType = "centripetal";
        curve.tension = 0.5;

        // Sample the curve with many points for smooth rendering
        const curvePoints = curve.getPoints(pointsPerCurve);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

        // Use different material for primary vs secondary lines
        const material = lineIndex === 0 ? lineMaterial : secondaryLineMaterial;
        const line = new THREE.Line(geometry, material);
        gridGroup.add(line);

        // Store curve data for animation
        curves.push({
          line,
          curve,
          controlPoints,
          isHorizontal: false,
          x: xOffset,
          isPrimary: lineIndex === 0,
        });
      }
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

      // First, calculate z-values for grid intersection points
      for (let i = 0; i <= gridResolution; i++) {
        for (let j = 0; j <= gridResolution; j++) {
          const x = j * gridStepX - gridWidth / 2;
          const y = i * gridStepY - gridHeight / 2;

          if (gridPoints[i][j].hasNoise) {
            // Apply noise to this intersection
            gridPoints[i][j].z = calculateZ(x, y, time);
          } else {
            // Find the nearest noise-affected points and interpolate
            let prevI = Math.floor(i / noiseInterval) * noiseInterval;
            let nextI = Math.ceil(i / noiseInterval) * noiseInterval;
            let prevJ = Math.floor(j / noiseInterval) * noiseInterval;
            let nextJ = Math.ceil(j / noiseInterval) * noiseInterval;

            // Clamp to grid boundaries
            prevI = Math.max(0, prevI);
            nextI = Math.min(gridResolution, nextI);
            prevJ = Math.max(0, prevJ);
            nextJ = Math.min(gridResolution, nextJ);

            // If we're at a grid boundary, use the same point for prev/next
            if (prevI === nextI) {
              if (prevI > 0) prevI -= noiseInterval;
              else nextI += noiseInterval;
            }
            if (prevJ === nextJ) {
              if (prevJ > 0) prevJ -= noiseInterval;
              else nextJ += noiseInterval;
            }

            // Calculate weights for smoother interpolation
            const weightI = smoothstep(0, 1, (i - prevI) / (nextI - prevI));
            const weightJ = smoothstep(0, 1, (j - prevJ) / (nextJ - prevJ));

            // Get z-values at the four corners (or calculate them if not yet set)
            let z00 = gridPoints[prevI][prevJ].z;
            if (z00 === undefined) {
              z00 = calculateZ(
                prevJ * gridStepX - gridWidth / 2,
                prevI * gridStepY - gridHeight / 2,
                time
              );
              gridPoints[prevI][prevJ].z = z00;
            }

            let z01 = gridPoints[prevI][nextJ].z;
            if (z01 === undefined) {
              z01 = calculateZ(
                nextJ * gridStepX - gridWidth / 2,
                prevI * gridStepY - gridHeight / 2,
                time
              );
              gridPoints[prevI][nextJ].z = z01;
            }

            let z10 = gridPoints[nextI][prevJ].z;
            if (z10 === undefined) {
              z10 = calculateZ(
                prevJ * gridStepX - gridWidth / 2,
                nextI * gridStepY - gridHeight / 2,
                time
              );
              gridPoints[nextI][prevJ].z = z10;
            }

            let z11 = gridPoints[nextI][nextJ].z;
            if (z11 === undefined) {
              z11 = calculateZ(
                nextJ * gridStepX - gridWidth / 2,
                nextI * gridStepY - gridHeight / 2,
                time
              );
              gridPoints[nextI][nextJ].z = z11;
            }

            // Bilinear interpolation with smoothstep
            const zTop = z00 * (1 - weightJ) + z01 * weightJ;
            const zBottom = z10 * (1 - weightJ) + z11 * weightJ;
            gridPoints[i][j].z = zTop * (1 - weightI) + zBottom * weightI;
          }
        }
      }

      // Update all curves
      curves.forEach((curveData) => {
        const { line, curve, controlPoints, isHorizontal, isPrimary } =
          curveData;

        // Update z values for each control point
        for (let i = 0; i < controlPoints.length; i++) {
          const point = controlPoints[i];

          if (isHorizontal) {
            // For horizontal curves
            const gridI = isPrimary
              ? curveData.y / gridStepY + gridHeight / 2 / gridStepY
              : (curveData.y - lineOffset) / gridStepY +
                gridHeight / 2 / gridStepY;
            const gridJ = i;

            // Get the z value from the grid
            if (
              gridI >= 0 &&
              gridI <= gridResolution &&
              gridJ >= 0 &&
              gridJ <= gridResolution
            ) {
              // For secondary lines, use the same z-value as primary but with a small offset
              const zValue = gridPoints[Math.round(gridI)][gridJ].z;
              point.z = isPrimary ? zValue : zValue + lineOffset * 0.5;
            }
          } else {
            // For vertical curves
            const gridI = i;
            const gridJ = isPrimary
              ? curveData.x / gridStepX + gridWidth / 2 / gridStepX
              : (curveData.x - lineOffset) / gridStepX +
                gridWidth / 2 / gridStepX;

            // Get the z value from the grid
            if (
              gridI >= 0 &&
              gridI <= gridResolution &&
              gridJ >= 0 &&
              gridJ <= gridResolution
            ) {
              // For secondary lines, use the same z-value as primary but with a small offset
              const zValue = gridPoints[gridI][Math.round(gridJ)].z;
              point.z = isPrimary ? zValue : zValue + lineOffset * 0.5;
            }
          }
        }

        // Update the curve with new control points
        curve.points = controlPoints;

        // Generate new points along the curve
        const curvePoints = curve.getPoints(pointsPerCurve);

        // Update the geometry
        line.geometry.setFromPoints(curvePoints);
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      console.log("Component unmounting, cleaning up Three.js");

      // Stop animation
      cancelAnimationFrame(animationId);

      // Remove event listener
      window.removeEventListener("resize", handleResize);

      // Dispose of resources
      curves.forEach(({ line }) => {
        line.geometry.dispose();
      });

      // Remove renderer from DOM
      if (mountNode && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }

      // Dispose of renderer
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="synthwave-wave-container" />;
};

export default SynthwaveWave;
