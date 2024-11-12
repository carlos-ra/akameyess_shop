import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, Float } from '@react-three/drei';
function Model() {
    const modelRef = useRef(null);
    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
            modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });
    return (_jsxs("mesh", { ref: modelRef, children: [_jsx("cylinderGeometry", { args: [1, 1, 2, 32] }), _jsx("meshPhysicalMaterial", { color: "#c8e6ff", transmission: 0.6, thickness: 0.5, roughness: 0.1, metalness: 0.1 })] }));
}
export function ProductModel() {
    return (_jsxs(Canvas, { camera: { position: [0, 0, 5], fov: 45 }, style: {
            position: 'absolute',
            top: '50%',
            right: '10%',
            transform: 'translateY(-50%)',
            width: '300px',
            height: '300px',
        }, children: [_jsx(Environment, { preset: "studio" }), _jsx("ambientLight", { intensity: 0.5 }), _jsx("directionalLight", { position: [10, 10, 5], intensity: 1 }), _jsx(PresentationControls, { global: true, rotation: [0, -0.3, 0], polar: [-0.4, 0.2], azimuth: [-0.4, 0.2], config: { mass: 2, tension: 400 }, snap: { mass: 4, tension: 400 }, children: _jsx(Float, { speed: 1.5, rotationIntensity: 1, floatIntensity: 0.5, floatingRange: [0, 0.5], children: _jsx(Model, {}) }) })] }));
}
