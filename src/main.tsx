import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { LicensePage } from './LicensePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/license',
    element: <LicensePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
