import { defineConfig } from 'vite';

export default defineConfig({
  // ... outras configurações ...

server: {
  host: 'localhost',
  port: 4200, // Porta correta do Angular
  allowedHosts: [
    '.ngrok-free.app' // Permite qualquer subdomínio de ngrok-free.app
  ],
},
});