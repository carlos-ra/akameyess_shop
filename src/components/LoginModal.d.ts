import React from 'react';
import './LoginModal.css';
interface LoginModalProps {
    onClose: () => void;
    redirectAfterLogin?: () => void;
}
export declare const LoginModal: React.FC<LoginModalProps>;
export {};
