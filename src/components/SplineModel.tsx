import React, { useEffect, useRef } from 'react';
import '@splinetool/runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        'loading-anim'?: boolean;
        background?: string;
        'camera-target'?: string;
        'camera-orbit'?: string;
        'camera-zoom'?: string;
      } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const SplineModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.37/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="spline-container">
      <spline-viewer 
        url="https://prod.spline.design/k-Ls7RQUtTWjzHUm/scene.splinecode"
        loading-anim={true}
        background="transparent"
        camera-target="0 0 0"
        camera-zoom="1.2"
      />
    </div>
  );
};

export default SplineModel; 