// pages/_app.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getBackendBaseUrl } from '../utils/api';  // tu helper

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token && router.pathname !== '/login') {
      router.replace('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
