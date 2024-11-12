import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const modelRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={modelRef}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshPhysicalMaterial 
        color="#c8e6ff"
        transmission={0.6}
        thickness={0.5}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  )
}

export function ProductModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        width: '300px',
        height: '300px',
      }}
    >
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <PresentationControls
        global
        rotation={[0, -0.3, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.4, 0.2]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float
          speed={1.5}
          rotationIntensity={1}
          floatIntensity={0.5}
          floatingRange={[0, 0.5]}
        >
          <Model />
        </Float>
      </PresentationControls>
    </Canvas>
  )
} 