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

//CREAR ESPECIALISTAS

const nuevo_especialista = async ( nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, especialidad, credenciales, perfil, foto_especialista, estado ) => {    
    const consulta = {
        text: 'INSERT INTO especialista ( nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, especialidad, credenciales, perfil, foto_especialista, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [ nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, especialidad, credenciales, perfil, foto_especialista, estado]
    }
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];
    return especialista;
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

// INICIO SESION TUTOR

async function trae_tutor(cedula_de_identidad, contrasena_tutor) {
    const consulta = {
        text: 'SELECT * FROM tutor WHERE cedula_de_identidad = $1 AND contrasena_tutor = $2',
        values: [cedula_de_identidad, contrasena_tutor]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}


async function eliminar_tutor(cedula_de_identidad) {
    const consulta = {
        text: 'DELETE FROM tutor WHERE cedula_de_identidad = $1 RETURNING *',
        values: [cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const tutor = resultado.rows[0];
    return tutor;
    
}

async function actualizar_tutor(nombre_tutor, telefono, correo_tutor, cedula_de_identidad) {
    const consulta = {
        text: 'UPDATE tutor SET nombre_tutor = $1, telefono = $2, correo_tutor = $3 WHERE cedula_de_identidad = $4 RETURNING *',        
        values: [nombre_tutor, telefono, correo_tutor, cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const tutor = resultado.rows[0];
    return tutor;        
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INICIO SESION ESPECIALISTA

async function trae_especialista(cedula_de_identidad, contrasena_especialista) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1 AND contrasena_especialista = $2',
        values: [cedula_de_identidad, contrasena_especialista]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}




module.exports = { 
    nuevo_tutor,
    nuevo_especialista, 
    muestra_tutores, 
    cambiar_estado_tutores, 
    muestra_especialistas, 
    cambiar_estado_especialistas,
    trae_tutor,
    trae_especialista,
    eliminar_tutor,
    actualizar_tutor,
    nueva_mascota,
    antecedentes_salud
};

