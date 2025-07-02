const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Render injeta a porta via process.env.PORT

// Serve os arquivos estáticos da pasta de build do Angular
// Importante: Ajuste este caminho para onde sua build realmente está!
// No seu caso, é 'dist/gerenciador-ativos-front/browser'
const buildPath = path.join(__dirname, '..', 'gerenciador-ativos-front', 'browser');
app.use(express.static(buildPath));

// Para lidar com o roteamento do Angular (SPA)
// Qualquer rota não encontrada, retorna o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});