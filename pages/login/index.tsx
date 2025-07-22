import { useState } from 'react';
import { useRouter } from 'next/router';
import { getApiBase } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // Define handleSubmit como async
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${getApiBase()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (!res.ok) {
        // Si no es 200, lanzamos un error para el catch
        throw new Error('Credenciales inválidas');
      }
      const data = await res.json();
      sessionStorage.setItem('token', data.accessToken);
      // Redirige al módulo de Inventarios, por ejemplo:
      router.push('/products');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  }

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label><br/>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          required
        /><br/>
        <label>Contraseña</label><br/>
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
