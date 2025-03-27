import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import { motion } from "framer-motion";

const testimonialData = {
  "New York": {
    name: "Sarah Chen",
    quote:
      "Found my soulmate within weeks of joining! The AI matching was spot-on.",
    role: "Premium Member",
    joinDate: "2023",
  },
  "Los Angeles": {
    name: "David Rodriguez",
    quote:
      "As a busy film producer, Lucid helped me find genuine connections in the entertainment industry.",
    role: "Verified User",
    joinDate: "2023",
  },
  Hawaii: {
    name: "Kaia Miller",
    quote:
      "Aloha! Found my perfect match right here on the islands. The cultural understanding is incredible!",
    role: "Premium Member",
    joinDate: "2023",
  },
  London: {
    name: "James Wilson",
    quote:
      "The sophisticated matching algorithm understands British dating culture perfectly.",
    role: "Premium Member",
    joinDate: "2023",
  },
  "São Paulo": {
    name: "Isabella Santos",
    quote:
      "Finally, an app that gets Brazilian dating culture! Made meaningful connections instantly.",
    role: "Verified User",
    joinDate: "2023",
  },
  Tokyo: {
    name: "Hiro Tanaka",
    quote:
      "The AI respects Japanese dating customs while helping me find modern love.",
    role: "Premium Member",
    joinDate: "2023",
  },
  Paris: {
    name: "Sophie Martin",
    quote:
      "Très sophistiqué! The romantic suggestions for dates in Paris are magnifique!",
    role: "Premium Member",
    joinDate: "2023",
  },
  Moscow: {
    name: "Dmitri Volkov",
    quote:
      "Revolutionary approach to dating. Found genuine connections in Moscow's busy scene.",
    role: "Verified User",
    joinDate: "2023",
  },
  Beijing: {
    name: "Li Wei",
    quote:
      "Perfect for professionals in China. The AI understands our unique dating culture.",
    role: "Premium Member",
    joinDate: "2023",
  },
  "New Delhi": {
    name: "Priya Sharma",
    quote:
      "Balances traditional values with modern dating. My parents approve too!",
    role: "Premium Member",
    joinDate: "2023",
  },
  Sydney: {
    name: "Emma Thompson",
    quote: "Found love at Bondi! The local matching system is brilliant.",
    role: "Verified User",
    joinDate: "2023",
  },
  "Cape Town": {
    name: "Thabo Ndlovu",
    quote:
      "Love how it connects people across South Africa's diverse communities.",
    role: "Premium Member",
    joinDate: "2023",
  },
  Dubai: {
    name: "Fatima Al-Sayed",
    quote:
      "Respectful of cultural norms while creating meaningful connections.",
    role: "Premium Member",
    joinDate: "2023",
  },
  Singapore: {
    name: "Marcus Tan",
    quote: "Perfect for busy professionals in the Lion City!",
    role: "Verified User",
    joinDate: "2023",
  },
  Toronto: {
    name: "Maya Patel",
    quote:
      "The diversity of matches reflects Toronto's multicultural spirit perfectly.",
    role: "Premium Member",
    joinDate: "2023",
  },
  "Mexico City": {
    name: "Carlos Ruiz",
    quote: "¡Increíble! Found love in the heart of Mexico City.",
    role: "Premium Member",
    joinDate: "2023",
  },
  "Buenos Aires": {
    name: "Luna Martinez",
    quote: "The tango of modern love! Perfect matches in Argentina.",
    role: "Verified User",
    joinDate: "2023",
  },
  Berlin: {
    name: "Hans Weber",
    quote: "Efficient and genuine - truly German precision in dating!",
    role: "Premium Member",
    joinDate: "2023",
  },
  Madrid: {
    name: "Elena Garcia",
    quote: "Found mi amor through Lucid's amazing matching system!",
    role: "Premium Member",
    joinDate: "2023",
  },
  Rome: {
    name: "Marco Rossi",
    quote: "Amore at first match! The Italian dating scene revolutionized.",
    role: "Verified User",
    joinDate: "2023",
  },
  Seoul: {
    name: "Ji-eun Kim",
    quote: "Perfect for K-drama worthy love stories in real life!",
    role: "Premium Member",
    joinDate: "2023",
  },
  Bangkok: {
    name: "Somchai Suk",
    quote: "Found authentic connections in Thailand's vibrant dating scene.",
    role: "Premium Member",
    joinDate: "2023",
  },
  Cairo: {
    name: "Nour Hassan",
    quote: "Respects Egyptian traditions while creating modern connections.",
    role: "Verified User",
    joinDate: "2023",
  },
  Lagos: {
    name: "Olayinka Adebayo",
    quote: "Connecting hearts across Nigeria with amazing precision!",
    role: "Premium Member",
    joinDate: "2023",
  },
};

function Stars() {
  const starsRef = useRef();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame(() => {
    starsRef.current.rotation.y += 0.0001;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        fog={false}
      />
    </points>
  );
}

function LocationMarker({ lat, lng, cityName, color = "#FF3D99", onClick }) {
  const markerRef = useRef();
  const [hovered, setHovered] = useState(false);

  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const radius = 1.52;

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  useFrame(() => {
    if (hovered) {
      markerRef.current.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.2;
      markerRef.current.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.2;
      markerRef.current.scale.z = 1 + Math.sin(Date.now() * 0.01) * 0.2;
    }
  });

  return (
    <group
      position={[x, y, z]}
      ref={markerRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick(cityName);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        markerRef.current.scale.set(1, 1, 1);
      }}
    >
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : color} />
      </mesh>
      <pointLight color={color} intensity={hovered ? 1 : 0.5} distance={0.2} />
    </group>
  );
}

function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const markersRef = useRef();
  const [selectedCity, setSelectedCity] = useState(null);

  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    "/textures/8k_earth_daymap.jpg",
    "/textures/8k_earth_clouds.jpg",
  ]);

  const locations = [
    { cityName: "New York", lat: 40.7128, lng: -74.006 },
    { cityName: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { cityName: "Hawaii", lat: 19.8968, lng: -155.5828 },
    { cityName: "London", lat: 51.5074, lng: -0.1278 },
    { cityName: "São Paulo", lat: -23.5505, lng: -46.6333 },
    { cityName: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { cityName: "Paris", lat: 48.8566, lng: 2.3522 },
    { cityName: "Moscow", lat: 55.7558, lng: 37.6173 },
    { cityName: "Beijing", lat: 39.9042, lng: 116.4074 },
    { cityName: "New Delhi", lat: 28.6139, lng: 77.209 },
    { cityName: "Sydney", lat: -33.8688, lng: 151.2093 },
    { cityName: "Cape Town", lat: -33.9249, lng: 18.4241 },
    { cityName: "Dubai", lat: 25.2048, lng: 55.2708 },
    { cityName: "Singapore", lat: 1.3521, lng: 103.8198 },
    { cityName: "Toronto", lat: 43.6532, lng: -79.3832 },
    { cityName: "Mexico City", lat: 19.4326, lng: -99.1332 },
    { cityName: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
    { cityName: "Berlin", lat: 52.52, lng: 13.405 },
    { cityName: "Madrid", lat: 40.4168, lng: -3.7038 },
    { cityName: "Rome", lat: 41.9028, lng: 12.4964 },
    { cityName: "Seoul", lat: 37.5665, lng: 126.978 },
    { cityName: "Bangkok", lat: 13.7563, lng: 100.5018 },
    { cityName: "Cairo", lat: 30.0444, lng: 31.2357 },
    { cityName: "Lagos", lat: 6.5244, lng: 3.3792 },
  ];

  useFrame(({ clock }) => {
    const rotationSpeed = clock.getElapsedTime() * 0.05;
    earthRef.current.rotation.y = rotationSpeed;
    cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07;
    markersRef.current.rotation.y = rotationSpeed;
  });

  const TestimonialPopup = ({ city }) => {
    if (!city || !testimonialData[city]) return null;
    const testimonial = testimonialData[city];

    return (
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border border-white/20 text-white min-w-[350px] max-w-md">
        <h3 className="text-2xl font-bold mb-3">{city}</h3>
        <p className="text-xl font-semibold mb-2">{testimonial.name}</p>
        <p className="mt-4 italic text-lg leading-relaxed">
          "{testimonial.quote}"
        </p>
        <p className="mt-3 text-sm opacity-75">{testimonial.role}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCity(null);
          }}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold"
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <>
      <group>
        <mesh ref={earthRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhongMaterial map={colorMap} shininess={25} />
        </mesh>

        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.51, 64, 64]} />
          <meshPhongMaterial
            map={cloudsMap}
            transparent={true}
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>

        <group ref={markersRef}>
          {locations.map((loc) => (
            <LocationMarker
              key={loc.cityName}
              lat={loc.lat}
              lng={loc.lng}
              cityName={loc.cityName}
              onClick={setSelectedCity}
            />
          ))}
        </group>
      </group>
      {selectedCity && (
        <Html center position={[0, 0, 0]}>
          <TestimonialPopup city={selectedCity} />
        </Html>
      )}
    </>
  );
}

export default function Testimonials() {
  return (
    <section className="h-screen bg-black">
      <div className="container mx-auto text-center px-6 h-full flex flex-col">
        <motion.h2
          className="text-6xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#FF66CC] bg-clip-text text-transparent mt-16 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Global Love Stories
        </motion.h2>

        <div className="relative flex-1">
          <Suspense
            fallback={
              <div className="text-white text-2xl">
                Loading High-Resolution Earth...
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 4] }}
              className="absolute inset-0"
            >
              <Stars />
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <directionalLight position={[0, 0, 5]} intensity={1.5} />
              <Earth />
              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
