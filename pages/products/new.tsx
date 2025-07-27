// pages/products/new.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Detecta dinámicamente la URL base del backend,
 * restando 1 al puerto actual en entornos Codespaces/preview.
 */
function getBackendBaseUrl(): string {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const match = hostname.match(/-(\d+)(?=\.)/);
  if (!match) {
    console.warn('No se detectó puerto en el hostname, usando mismo host');
    return `${protocol}//${hostname}`;
  }
  const currentPort = parseInt(match[1], 10);
  const backendPort = currentPort - 1;
  const backendHost = hostname.replace(`-${currentPort}`, `-${backendPort}`);
  return `${protocol}//${backendHost}`;
}

export default function NewProduct() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    const API_URL = getBackendBaseUrl();
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Error al crear producto');
      }
      router.push('/products');
    } catch (err: any) {
      console.error('Error al crear producto:', err);
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
        <label>Nombre</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
          style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: 10, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}>
          Crear
        </button>
      </form>
    </div>
  );
}
