import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { LicensePage } from './LicensePage.tsx';
import { LoaderDotLinearComponent } from './loaders/LoaderDotLinear.tsx';
import { Header } from './UI/Header.tsx';
import { NotificationComponent } from './components/Notification.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/license' element={<LicensePage />} />
        <Route path='/loaderdotlinear' element={<LoaderDotLinearComponent />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <NotificationComponent />
    </BrowserRouter>
  </React.StrictMode>
);
