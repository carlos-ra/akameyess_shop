import React, { createContext, useContext, useState } from 'react';

interface LoginModalContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  onLoginSuccess?: () => void;
  setOnLoginSuccess: (callback?: () => void) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [onLoginSuccess, setOnLoginSuccess] = useState<(() => void) | undefined>();

  return (
    <LoginModalContext.Provider value={{ 
      showLoginModal, 
      setShowLoginModal,
      onLoginSuccess,
      setOnLoginSuccess
    }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
}; 