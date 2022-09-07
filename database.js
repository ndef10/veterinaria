const { Pool } = require('pg');
//const bcrypt = require('bcryptjs');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

//CREAR TUTORES

const nuevo_tutor = async ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado ) => {    
    const consulta = {
        text: 'INSERT INTO tutor ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [ nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado]
    }
    const resultado = await pool.query(consulta);   
    const tutor = resultado.rows[0];
    return tutor;
}

//AUTORIZAR TUTORES

async function muestra_tutores() {
    const resultado = await pool.query(`SELECT * FROM tutor`);
    return resultado.rows;
}

async function cambiar_estado_tutores(estado, cedula_de_identidad) {
    const consulta = {
        text: 'UPDATE tutor SET estado = $1 WHERE cedula_de_identidad = $2 RETURNING *',
        values: [estado, cedula_de_identidad]
    };
    const resultado = await pool.query(consulta);
    const tutor = resultado.rows[0];
    return tutor;
}

//AUTORIZAR ESPECIALISTAS

async function muestra_especialistas() {
    const resultado = await pool.query(`SELECT * FROM especialista`);
    return resultado.rows;
}

async function cambiar_estado_especialistas(estado, cedula_de_identidad) {
    const consulta = {
        text: 'UPDATE especialista SET estado = $1 WHERE cedula_de_identidad = $2 RETURNING *',
        values: [estado, cedula_de_identidad]
    };
    const resultado = await pool.query(consulta);
    const especialista = resultado.rows[0];
    return especialista;
}

module.exports = { 
    nuevo_tutor, 
    muestra_tutores, 
    cambiar_estado_tutores, 
    muestra_especialistas, 
    cambiar_estado_especialistas
};

