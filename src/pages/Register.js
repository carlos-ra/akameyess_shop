import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { registerUser } from '../store/slices/authSlice';
import './Auth.css';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector(state => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser({ email, password, displayName })).unwrap();
            navigate('/');
        }
        catch (err) {
            // Error is handled by the reducer
        }
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-box", children: [_jsx("h2", { children: "Register" }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "displayName", children: "Name" }), _jsx("input", { type: "text", id: "displayName", value: displayName, onChange: (e) => setDisplayName(e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "auth-button", children: loading ? 'Creating account...' : 'Register' })] }), _jsxs("p", { className: "auth-link", children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Login" })] })] }) }));
};
export default Register;
