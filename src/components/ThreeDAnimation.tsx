
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const FloatingLogo = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = new THREE.TextureLoader().load(
    "https://res.cloudinary.com/dsgdashea/image/upload/v1715751631/WhatsApp_Image_2024-05-15_at_10.04.19_AM__1_-removebg_ann0nr.png"
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

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4, 4]} />
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
