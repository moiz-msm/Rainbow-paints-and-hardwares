import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

export default function NavigationProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    
    // Finish progress fast so it feels snappy
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [location.pathname, location.search]);

  return null;
}
