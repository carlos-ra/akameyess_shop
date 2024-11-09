import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, signInWithGoogle, registerUser } from '../store/slices/authSlice';
import './LoginModal.css';

interface LoginModalProps {
  onClose: () => void;
  redirectAfterLogin?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, redirectAfterLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        await dispatch(registerUser({ email, password, displayName })).unwrap();
      }
      onClose();
      redirectAfterLogin?.();
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      onClose();
      redirectAfterLogin?.();
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">Name</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <button 
          onClick={handleGoogleSignIn} 
          disabled={loading}
          className="google-button"
        >
          Sign in with Google
        </button>
        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="switch-button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}; 