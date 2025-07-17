import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user && router.pathname !== '/login') router.push('/login');
  }, [router]);
  return <Component {...pageProps} />;
}
