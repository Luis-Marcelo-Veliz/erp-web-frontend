export function getBackendBaseUrl(): string {
const { protocol, hostname } = window\.location;
const match = hostname.match(/-(\d+)(?=.)/);
if (!match) return `${protocol}//${hostname}`;
const currentPort = parseInt(match\[1], 10);
const backendPort = currentPort - 1;
return `${protocol}//${hostname.replace(/-\d+/, `-\${backendPort}`)}`;
}
