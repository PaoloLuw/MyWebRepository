const express = require('express');
const path = require('path');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

// Ruta para obtener todos los roles
app.get('/api/roles', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Rol');
        res.json(result.rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Error obteniendo los roles');
    }
});

// Servir el archivo HTML
app.use(express.static(path.join(__dirname)));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
