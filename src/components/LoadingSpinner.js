import { jsx as _jsx } from "react/jsx-runtime";
import './LoadingSpinner.css';
const LoadingSpinner = ({ size = 'medium' }) => {
    return (_jsx("div", { className: `spinner-container ${size}`, children: _jsx("div", { className: "spinner" }) }));
};
export default LoadingSpinner;
