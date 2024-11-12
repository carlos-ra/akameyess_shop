import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import './LoginModal.css';
export const LoginModal = ({ onClose, redirectAfterLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await dispatch(loginUser({ email, password })).unwrap();
            }
            else {
                await dispatch(registerUser({ email, password, displayName })).unwrap();
            }
            onClose();
            redirectAfterLogin?.();
        }
        catch (error) {
            // Error is handled by the reducer
            console.debug('Auth error:', error);
        }
    };
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: e => e.stopPropagation(), children: [_jsx("button", { className: "modal-close", onClick: onClose, children: "\u00D7" }), _jsx("h2", { children: isLogin ? 'Login' : 'Sign Up' }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [!isLogin && (_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "displayName", children: "Name" }), _jsx("input", { type: "text", id: "displayName", value: displayName, onChange: (e) => setDisplayName(e.target.value), required: !isLogin })] })), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "auth-button", children: loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Sign Up') })] }), _jsxs("p", { className: "auth-switch", children: [isLogin ? "Don't have an account? " : "Already have an account? ", _jsx("button", { onClick: () => setIsLogin(!isLogin), className: "switch-button", children: isLogin ? 'Sign Up' : 'Login' })] })] }) }));
};
