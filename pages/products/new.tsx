import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewProduct() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    await fetch('http://localhost:3000/products', {
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
    router.push('/products');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
