import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
const router = useRouter();

useEffect(() => {
const token = sessionStorage.getItem('token');
if (!token && router.pathname !== '/login') {
router.replace('/login');
}
}, \[router]);

return \<Component {...pageProps} />;
}

export default MyApp;
