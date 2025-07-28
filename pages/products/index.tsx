import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductsList() {
const router = useRouter();
const \[products, setProducts] = useState(\[]);
const \[error, setError] = useState(null);

useEffect(() => {
(async () => {
const token = sessionStorage.getItem('token');
if (!token) return router.replace('/login');

```
  const res = await fetch('/api/products', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    sessionStorage.removeItem('token');
    return router.replace('/login');
  }
  if (!res.ok) throw new Error(res.statusText);

  setProducts(await res.json());
})().catch((err) => setError(err.message));
```

}, \[router]);

if (error) return <p>Error: {error}</p>;

return (
\<div style={{ padding: 20 }}> <h1>Listado de Productos</h1>
{products.length === 0 ? ( <p>No hay productos registrados.</p>
) : ( <ul>
{products.map((p) => ( <li key={p.id}>
{p.name} — Precio: \${p.price.toFixed(2)} — Stock: {p.stock} </li>
))} </ul>
)} </div>
);
}
