
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Center } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

const WDSLogo = () => {
  const group = useRef<THREE.Group>(null!);
  const isMobile = useIsMobile();
  
  // Create material and texture for the logo
  const texture = new THREE.TextureLoader().load("https://res.cloudinary.com/dsgdashea/image/upload/v1715771137/android-chrome-512x512_ndmool.png");
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide, // Render both sides of the geometry
	emissiveIntensity: 0.5,
  });

  // Create a plane geometry for the logo
  const planeGeometry = new THREE.PlaneGeometry(3, 3);
  
  useFrame((state) => {
    if (group.current) {
      // Smooth rotation independent of frame rate
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  // Adjust position for mobile - move up on mobile devices
  const yPosition = isMobile ? 2.6 : 0;
  const scale = isMobile ? 2.0 : 2.2;

  return (
    <group ref={group} scale={scale} position={[0, yPosition, 0]}>
      <Center>
        <mesh geometry={planeGeometry}>
          <primitive object={material} attach="material" />
        </mesh>
      </Center>
    </group>
  );
};

const ThreeDAnimation: React.FC = () => {
  return (
    <Canvas className="h-full w-full">
      <PerspectiveCamera makeDefault position={[0.5, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} />
      
      <WDSLogo />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping={false}
      />
    </Canvas>
  );
};

export default ThreeDAnimation;
