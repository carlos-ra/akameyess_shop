import React from 'react';
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
declare const SplineModel: React.FC;
export default SplineModel;
