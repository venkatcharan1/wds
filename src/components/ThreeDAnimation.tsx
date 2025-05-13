
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const AnimatedBox = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8B5CF6"
        metalness={0.5}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const AnimatedTorus = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={mesh} position={[-2, 0, 0]}>
      <torusGeometry args={[0.7, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#EC4899"
        metalness={0.5}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const AnimatedSphere = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    mesh.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={mesh} position={[2, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#3B82F6"
        metalness={0.5}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const FloatingText = () => {
  return (
    <Float 
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      position={[0, -2.5, 0]}
    >
      <Text3D
        font="/fonts/inter_regular.json"
        size={0.7}
        height={0.1}
        curveSegments={5}
      >
        3D WEB DESIGN
        <meshStandardMaterial color="#FFFFFF" />
      </Text3D>
    </Float>
  );
};

const ThreeDAnimation: React.FC = () => {
  return (
    <Canvas className="h-full w-full">
      <PerspectiveCamera makeDefault position={[0, 0, 7]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <AnimatedBox />
      <AnimatedTorus />
      <AnimatedSphere />
      <FloatingText />
      
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
