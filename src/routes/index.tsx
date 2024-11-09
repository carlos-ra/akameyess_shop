import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ProductDetails from '../pages/ProductDetails';
import SearchResults from '../pages/SearchResults';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/category/:category',
          element: <CategoryPage />,
        },
        {
          path: '/product/:id',
          element: <ProductDetails />,
        },
        {
          path: '/search',
          element: <SearchResults />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
    },
  }
); 