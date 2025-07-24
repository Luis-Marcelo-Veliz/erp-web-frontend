// scripts/checkEnv.js
const required = ['FRONTEND_URL', 'JWT_SECRET'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('❌ Faltan vars de entorno:', missing.join(', '));
  process.exit(1);
}
console.log('✅ Vars de entorno ok');
