import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const LoginModalContext = createContext(undefined);
export const LoginModalProvider = ({ children }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [onLoginSuccess, setOnLoginSuccess] = useState();
    return (_jsx(LoginModalContext.Provider, { value: {
            showLoginModal,
            setShowLoginModal,
            onLoginSuccess,
            setOnLoginSuccess
        }, children: children }));
};
export const useLoginModal = () => {
    const context = useContext(LoginModalContext);
    if (!context) {
        throw new Error('useLoginModal must be used within a LoginModalProvider');
    }
    return context;
};
