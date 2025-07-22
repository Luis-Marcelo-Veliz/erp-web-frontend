// src/utils/api.ts

/**
 * Devuelve la URL base del backend a partir del host actual:
 * - Detecta window.location en el navegador.
 * - Reemplaza el puerto 3001 (frontend) por 3000 (backend).
 * - Si no corre en navegador (SSR), usa NEXT_PUBLIC_API_URL.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    // host: ejemplo "foo-xyz-3001.app.github.dev"
    // Queremos cambiar "-3001." por "-3000."
    const backendHost = host.replace(
      /-(\d+)\./,
      (_match, p1) => `-${Number(p1) - 1}.`
    );
    return `${protocol}//${backendHost}`;
  }
  // Fallback para build/SSR o producción
  return process.env.NEXT_PUBLIC_API_URL || '';
}
