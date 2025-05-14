
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

const WDSLogo = () => {
  const group = useRef<THREE.Group>(null!);
  const isMobile = useIsMobile();
  
  // Create material for the 3D text
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#6d28d9"),
    metalness: 0.8,
    roughness: 0.2,
  });

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group ref={group} scale={scale}>
      <Center>
        <Text3D
          font="/fonts/inter_regular.json"
          size={isMobile ? 1.2 : 1.5}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          WDS
          <primitive object={material} attach="material" />
        </Text3D>
      </Center>
    </group>
  );
};

const ThreeDAnimation: React.FC = () => {
  return (
    <Canvas className="h-full w-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <WDSLogo />
      
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
