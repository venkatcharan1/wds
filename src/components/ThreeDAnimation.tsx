
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingLogo = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = new THREE.TextureLoader().load(
    "https://res.cloudinary.com/dsgdashea/image/upload/v1715153907/a-captivating-cinematic-portrait-of-a-sleek-monito-JcgjDqViSlSwkZxvoQ2u6A-f87Th7i-SeOdw_wp_Z-QnA-removebg-preview_fzg7vg.png"
  );
  
  // Create material with transparent background
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  const isMobile = useIsMobile();
  const scale = isMobile ? 3 : 4;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[scale, scale]} />
      <primitive object={material} />
    </mesh>
  );
};

const ThreeDAnimation: React.FC = () => {
  return (
    <Canvas className="h-full w-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={1} />
      
      <FloatingLogo />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ThreeDAnimation;
