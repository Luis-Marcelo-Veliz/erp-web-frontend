import { useState } from 'react';
import { useRouter } from 'next/router';
import { getApiBase } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
fetch(`${getApiBase()}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username: user, password: pass }),
})
.then(async response => {
if (!response.ok) throw new Error('Credenciales inválidas');
const data = await response.json();
sessionStorage.setItem('token', data.accessToken);
router.push('/dashboard');
})
.catch(() => alert('Credenciales inválidas'));
}


  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label><br/>
        <input value={user} onChange={e => setUser(e.target.value)} /><br/>
        <label>Contraseña</label><br/>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
