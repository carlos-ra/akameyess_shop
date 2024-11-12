import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import '@splinetool/runtime';
const SplineModel = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.37/build/spline-viewer.js';
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (_jsx("div", { ref: containerRef, className: "spline-container", children: _jsx("spline-viewer", { url: "https://prod.spline.design/k-Ls7RQUtTWjzHUm/scene.splinecode", "loading-anim": true, background: "transparent", "camera-target": "0 0 0", "camera-zoom": "1.2" }) }));
};
export default SplineModel;
