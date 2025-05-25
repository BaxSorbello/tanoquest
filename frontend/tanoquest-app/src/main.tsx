import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import SignInPage from './pages/signIn';
import ClassesPage from './pages/ClassesPage';
import CallbackPage from './pages/callback';

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '/classes',
                        Component: ClassesPage,
                    },
                ],
            },
            {
                path: '/sign-in',
                Component: SignInPage,
            },
            {
                path: '/callback',
                Component: CallbackPage,
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);