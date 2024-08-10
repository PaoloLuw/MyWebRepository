const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir el archivo HTML
app.use(express.static(path.join(__dirname)));

// Ejemplo de una ruta de API
app.get('/api', (req, res) => {
  res.json({ message: '¡Hola desde la API!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
