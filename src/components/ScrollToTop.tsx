import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // if path name is not equal to /, scroll to top
    if (pathname !== '/') window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
