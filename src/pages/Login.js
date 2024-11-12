import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser } from '../store/slices/authSlice';
import './Auth.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector(state => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate('/');
        }
        catch (error) {
            // Error is handled by the reducer
            console.debug('Login error:', error);
        }
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-box", children: [_jsx("h2", { children: "Login" }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "auth-button", children: loading ? 'Logging in...' : 'Login' })] }), _jsxs("p", { className: "auth-link", children: ["Don't have an account? ", _jsx(Link, { to: "/register", children: "Register" })] })] }) }));
};
export default Login;
