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

// REGISTRAR MASCOTA

const nueva_mascota = async ( nombre_mascota, tipo_mascota, especie, foto_mascota ) => {    
    const consulta = {
        text: 'INSERT INTO mascota ( nombre_mascota, tipo_mascota, especie, foto_mascota ) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [ nombre_mascota, tipo_mascota, especie, foto_mascota]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
}

//ANTECEDENTES DE SALUD MASCOTA

const antecedentes_salud = async ( sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual) => {    
    const consulta = {
        text: 'INSERT INTO antecedentes_de_salud ( sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [ sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual]
    }
    const resultado = await pool.query(consulta);   
    const antecedente = resultado.rows[0];
    return antecedente;
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

async function eliminar_especialista(cedula_de_identidad) {
    const consulta = {
        text: 'DELETE FROM especialista WHERE cedula_de_identidad = $1 RETURNING *',
        values: [cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];
    return especialista;
    
}

async function actualizar_especialista(correo_especialista, credenciales, cedula_de_identidad) {    
    const consulta = {
        text: 'UPDATE especialista SET correo_especialista = $1, credenciales = $2 WHERE cedula_de_identidad = $3 RETURNING *',        
        values: [correo_especialista, credenciales, cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];
    console.log(especialista)
    return especialista;        
}


//TRAE LISTA DE ESPECIALISTAS

async function muestra_lista_especialistas() {
    const resultado = await pool.query(`SELECT * FROM especialista`);
    // console.log(resultado)
    return resultado.rows;
}

async function trae_datos_especialista(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
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
    antecedentes_salud,
    eliminar_especialista,
    actualizar_especialista,
    muestra_lista_especialistas,   
    trae_datos_especialista
};

