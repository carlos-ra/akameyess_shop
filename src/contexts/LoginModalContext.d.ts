import React from 'react';
interface LoginModalContextType {
    showLoginModal: boolean;
    setShowLoginModal: (show: boolean) => void;
    onLoginSuccess?: () => void;
    setOnLoginSuccess: (callback?: () => void) => void;
}
export declare const LoginModalProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useLoginModal: () => LoginModalContextType;
export {};
