import { useState } from 'react'
import Router from 'next/router'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    // Llamamos a /api/auth/login, que el proxy redirige a tu backend
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const body = await res.json()
    if (!res.ok) {
      // Si el servidor devuelve 401 y { message }, lo mostramos
      setError(body.message || 'Error de autenticación')
      return
    }
    // Si ok, redirigimos a /dashboard (que puedes crear luego)
    Router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>Login ERP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Entrar
        </button>
      </form>
    </div>
  )
}
