const { Pool } = require('pg');
//const bcrypt = require('bcryptjs');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

const nuevo_usuario = async ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado ) => {    
    const dbQuery = {
        text: 'INSERT INTO tutor ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [ nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado]
    }
    const result = await pool.query(dbQuery);   
    const usuario = result.rows[0];
    return usuario;
}

module.exports = { nuevo_usuario };

