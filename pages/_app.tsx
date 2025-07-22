import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
/*useEffect(() => {
  const token = sessionStorage.getItem('token');
  if (!token && router.pathname !== '/login') {
    // mejor replace para no agregar al historial
    router.replace('/login');
  }
}, [router]);*/
  return <Component {...pageProps} />;
}
export default MyApp;

async function getProtectedData() {
  const token = sessionStorage.getItem('token');
  const response = await fetch('http://localhost:3000/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Acceso no autorizado');
  const data = await response.json();
  console.log(data);
}
