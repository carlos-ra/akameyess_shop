import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './routes';
import { AuthProvider } from './components/AuthProvider';
import { LoginModalProvider } from './contexts/LoginModalContext';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LoginModalProvider>
          <RouterProvider router={router} />
        </LoginModalProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
