import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/** Importar la función para detectar la URL base del backend */
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

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Si no hay token, volvemos al login
        router.replace('/login');
        return;
      }

      const API_URL = getBackendBaseUrl();
      try {
        const res = await fetch(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Token inválido o expirado
          sessionStorage.removeItem('token');
          router.replace('/login');
          return;
        }

        if (!res.ok) {
          throw new Error(`Error al cargar productos: ${res.statusText}`);
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error('Error al obtener productos:', err);
        setError(err.message || 'Error inesperado');
      }
    }

    fetchProducts();
  }, [router]);

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Listado de Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} — Precio: ${p.price.toFixed(2)} — Stock: {p.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
