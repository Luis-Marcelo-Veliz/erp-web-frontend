import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewProduct() {
const router = useRouter();
const \[name, setName] = useState('');
const \[price, setPrice] = useState('');
const \[stock, setStock] = useState('');
const \[error, setError] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
setError(null);
const token = sessionStorage.getItem('token');
if (!token) return router.replace('/login');

```
const res = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ name, price: +price, stock: +stock }),
});

if (!res.ok) {
  const body = await res.json().catch(() => ({}));
  setError(body.message || 'Error al crear producto');
  return;
}

router.push('/products');
```

};

return (
\<div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}> <h1>Nuevo Producto</h1>
\<form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}> <label>Nombre</label>
\<input value={name} onChange={(e) => setName(e.target.value)} required /> <label>Precio</label>
\<input
type="number"
step="0.01"
value={price}
onChange={(e) => setPrice(e.target.value)}
required
/> <label>Stock</label>
\<input
type="number"
value={stock}
onChange={(e) => setStock(e.target.value)}
required
/>
{error && \<p style={{ color: 'red' }}>{error}</p>}
\<button type="submit" style={{ padding: 10, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}>
Crear </button> </form> </div>
);
}
