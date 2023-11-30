import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AboutPage } from './AboutPage.tsx';
import { Header } from './UI/Header.tsx';
import { NotificationComponent } from './components/Notification.tsx';
import { Analytics } from '@vercel/analytics/react';
import { Loaders } from './loaders/Loaders.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/about' element={<AboutPage />} />
        {Loaders.map((loader) => (
          <Route key={loader.slug} path={'/loaders/' + loader.slug} element={loader.component} />
        ))}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <NotificationComponent />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
