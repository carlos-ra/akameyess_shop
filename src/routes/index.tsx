import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ProductDetails from '../pages/ProductDetails';
import SearchResults from '../pages/SearchResults';
import Orders from '../pages/Orders';
import OrderConfirmation from '../pages/OrderConfirmation';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/category/:categoryName',
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
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/order-confirmation',
        element: <OrderConfirmation />,
      },
    ],
  },
]); 