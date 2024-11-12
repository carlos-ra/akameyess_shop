import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ProductDetails from '../pages/ProductDetails';
import SearchResults from '../pages/SearchResults';
import Login from '../pages/Login';
import Register from '../pages/Register';
export const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(Layout, {}),
        children: [
            {
                path: '/',
                element: _jsx(Home, {}),
            },
            {
                path: '/category/:category',
                element: _jsx(CategoryPage, {}),
            },
            {
                path: '/product/:id',
                element: _jsx(ProductDetails, {}),
            },
            {
                path: '/search',
                element: _jsx(SearchResults, {}),
            },
            {
                path: '/login',
                element: _jsx(Login, {}),
            },
            {
                path: '/register',
                element: _jsx(Register, {}),
            },
        ],
    },
], {
    future: {
        v7_skipActionErrorRevalidation: true,
    },
});
