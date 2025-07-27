// pages/login/index.tsx
import { useState } from 'react'
import Router from 'next/router'

/**
 * Detecta dinámicamente la URL base del backend,
 * restando 1 al puerto actual en entornos Codespaces/preview.
 */
function getBackendBaseUrl(): string {
  const protocol = window.location.protocol // "https:"
  const hostname = window.location.hostname // e.g. "mi-proyecto-xyz-3001.app.github.dev"
  const match = hostname.match(/-(\d+)(?=\.)/)
  if (!match) {
    console.warn('No se detectó puerto en el hostname, usando mismo host')
    return `${protocol}//${hostname}`
  }
  const currentPort = parseInt(match[1], 10)
  const backendPort = currentPort - 1
  const backendHost = hostname.replace(`-${currentPort}`, `-${backendPort}`)
  return `${protocol}//${backendHost}`
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const API_URL = getBackendBaseUrl()
    let res
    try {
      res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    } catch (networkErr) {
      console.error('Error de red al conectar con backend:', networkErr)
      setError('No se pudo conectar con el servidor')
      return
    }

    let body
    try {
      body = await res.json()
    } catch {
      body = { message: 'Respuesta inesperada del servidor' }
    }

    if (!res.ok) {
      setError(body.message || 'Error de autenticación')
      return
    }

    // Guardamos el token en sessionStorage y redirigimos
    sessionStorage.setItem('token', body.accessToken)
    console.log('✅ Token recibido:', body.accessToken)
    Router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>Login ERP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Entrar
        </button>
      </form>
    </div>
  )
}
