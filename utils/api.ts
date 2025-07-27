export function getBackendBaseUrl(): string {
  const { protocol, hostname } = window.location;
  const match = hostname.match(/-(\d+)(?=\.)/);
  if (!match) return `${protocol}//${hostname}`;
  const port = parseInt(match[1]) - 1;
  return `${protocol}//${hostname.replace(/-\d+/, `-${port}`)}`;
}
