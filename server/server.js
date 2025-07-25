const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const buildPath = path.join(
  __dirname,
  "..",
  "gerenciador-ativos-front",
  "browser"
);
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
