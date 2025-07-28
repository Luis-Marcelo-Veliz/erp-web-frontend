import { useState } from 'react';
import Router from 'next/router';

export default function LoginPage() {
const \[username, setUsername] = useState('');
const \[password, setPassword] = useState('');
const \[error, setError] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

```
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});

let body;
try { body = await res.json(); } catch { body = { message: 'Respuesta inesperada' }; }

if (!res.ok) {
  setError(body.message || 'Error de autenticación');
  return;
}

sessionStorage.setItem('token', body.accessToken);
Router.push('/products');
```

};

return (
\<div style={{ maxWidth: 400, margin: '50px auto' }}> <h1>Login ERP</h1> <form onSubmit={handleSubmit}>
\<input
type="text"
placeholder="Usuario"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
style={{ width: '100%', padding: 8, marginBottom: 10 }}
/>
\<input
type="password"
placeholder="Contraseña"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
style={{ width: '100%', padding: 8, marginBottom: 10 }}
/>
{error && \<p style={{ color: 'red' }}>{error}</p>}
\<button type="submit" style={{ width: '100%', padding: 10 }}>
Entrar </button> </form> </div>
);
}
