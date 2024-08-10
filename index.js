const express = require('express');
const path = require('path');
const { Client } = require('pg'); // Importa el módulo pg para conectarte a PostgreSQL
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar datos en formato JSON
app.use(express.json());

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
        console.log("Tabla 'Rol' creada exitosamente o ya existe.");
    } catch (err) {
        console.error('Error al intentar crear la tabla:', err.stack);
    }
};

// Llamar a la función para crear la tabla al iniciar el servidor
createTable();

// Ejemplo de una ruta de API para insertar datos en la tabla
app.post('/api/rol', async (req, res) => {
    const { Rol_Nombre } = req.body;

    const query = `
        INSERT INTO Rol (Rol_Nombre)
        VALUES ($1)
        RETURNING *;
    `;

    try {
        const result = await client.query(query, [Rol_Nombre]);
        res.json({ message: 'Rol insertado exitosamente', rol: result.rows[0] });
    } catch (err) {
        console.error('Error insertando el rol:', err.stack);
        res.status(500).json({ error: 'Error insertando el rol' });
    }
});

// Servir el archivo HTML
app.use(express.static(path.join(__dirname)));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
