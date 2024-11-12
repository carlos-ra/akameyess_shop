import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './routes';
import { AuthProvider } from './components/AuthProvider';
import { LoginModalProvider } from './contexts/LoginModalContext';
import './App.css';
function App() {
    return (_jsx(Provider, { store: store, children: _jsx(AuthProvider, { children: _jsx(LoginModalProvider, { children: _jsx(RouterProvider, { router: router }) }) }) }));
}
export default App;
