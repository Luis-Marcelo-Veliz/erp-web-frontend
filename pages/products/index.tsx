import { useEffect, useState } from 'react';
import { getApiBase } from '@/utils/api';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch(`${getApiBase()}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Listado de Productos</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — Precio: ${p.price} — Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
