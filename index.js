const express = require('express');
const path = require('path');
const { Client } = require('pg'); // Importa el módulo pg para conectarte a PostgreSQL
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Conecta el cliente a la base de datos
client.connect();

// Función para crear la tabla
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Rol (
            id_rol SERIAL PRIMARY KEY,
            Rol_Nombre TEXT
        );
    `;
    try {
        await client.query(query);
        console.log("Tabla 'Rol' creada exitosamente.");
    } catch (err) {
        console.error('Error creando la tabla:', err.stack);
    }
};

// Llamar a la función para crear la tabla al iniciar el servidor
createTable();

// Ejemplo de una ruta de API
app.get('/api', (req, res) => {
    res.json({ message: '¡Hola desde la API!' });
});

// Servir el archivo HTML
app.use(express.static(path.join(__dirname)));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
