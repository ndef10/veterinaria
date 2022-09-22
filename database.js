const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

//CREAR TUTORES

const nuevo_tutor = async ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_encriptada, perfil, foto_tutor, estado ) => {    
    const consulta = {
        text: 'INSERT INTO tutor ( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [ nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_encriptada, perfil, foto_tutor, estado]
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

async function trae_contrasena_encriptada(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM tutor WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

async function trae_tutor(cedula_de_identidad, compara_contrasena) {
    const consulta = {
        text: 'SELECT * FROM tutor WHERE cedula_de_identidad = $1 AND contrasena_tutor = $2',
        values: [cedula_de_identidad, compara_contrasena]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

async function tutor_ci(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM tutor WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

//MODIFICACION Y ELIMINACION DE MASCOTA, ANTECEDENTES DE SALUD Y TUTOR

async function trae_id_mascota(tutor_id) {
    const consulta = {
        text: 'SELECT * FROM mascota WHERE tutor_id = $1',
        values: [tutor_id]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

async function eliminar_ant_y_tutor(id_mascota) {
    const consulta = {
        text: 'DELETE FROM antecedentes_de_salud WHERE mascota_id = $1 RETURNING *',
        values: [id_mascota]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
    
}

async function eliminar_mascota_y_tutor(tutor_id) {
    const consulta = {
        text: 'DELETE FROM mascota WHERE tutor_id = $1 RETURNING *',
        values: [tutor_id]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
    
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

//ACTUALIZAR TUTOR

async function actualizar_tutor(nombre_tutor, telefono, correo_tutor, cedula_de_identidad) {
    const consulta = {
        text: 'UPDATE tutor SET nombre_tutor = $1, telefono = $2, correo_tutor = $3 WHERE cedula_de_identidad = $4 RETURNING *',        
        values: [nombre_tutor, telefono, correo_tutor, cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const tutor = resultado.rows[0];
    return tutor;        
}

//

// REGISTRAR MASCOTA

const nueva_mascota = async ( tutor_id, nombre_mascota, tipo_mascota, especie, foto_mascota ) => {    
    const consulta = {
        text: 'INSERT INTO mascota ( tutor_id, nombre_mascota, tipo_mascota, especie, foto_mascota ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [ tutor_id, nombre_mascota, tipo_mascota, especie, foto_mascota]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
}

//ANTECEDENTES DE SALUD MASCOTA

const antecedentes_salud = async ( mascota_id, sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual) => {    
    const consulta = {
        text: 'INSERT INTO antecedentes_de_salud ( mascota_id, sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [ mascota_id, sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual]
    }
    const resultado = await pool.query(consulta);   
    const antecedente = resultado.rows[0];
    return antecedente;
}

//TRAE, ELIMINA Y ACTUALIZA DATOS DE TABLA MASCOTA Y ANTECEDENTES DE SALUD

async function trae_mascota(mascota_id) {
    const consulta = {
        text: 'SELECT * FROM mascota WHERE tutor_id = $1',
        values: [mascota_id]
    };
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];   
    return mascota;    
}

async function trae_antecedentes_mascota(mascota_id) {
    const consulta = {
        text: 'SELECT * FROM antecedentes_de_salud WHERE mascota_id = $1',
        values: [mascota_id]
    };
    const resultado = await pool.query(consulta);   
    const antecedentes= resultado.rows[0];    
    return antecedentes;
}

async function eliminar_antecedentes(mascota_id) {
    const consulta = {
        text: 'DELETE FROM antecedentes_de_salud WHERE antecedentes_de_salud.mascota_id = $1 RETURNING *',
        values: [mascota_id]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
    
}

async function eliminar_mascota(mascota_id) {
    const consulta = {
        text: 'DELETE FROM mascota WHERE mascota.id = $1 RETURNING *',
        values: [mascota_id]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;
    
}

async function actualizar_antecedentes(sintomas, edad_num, peso_num, tipo_de_alimentacion,mascota_id) {
    const consulta = {
        text: 'UPDATE antecedentes_de_salud SET sintomas = $1, edad = $2, peso = $3, tipo_de_alimentacion = $4 WHERE mascota_id = $5 RETURNING *',        
        values: [sintomas, edad_num, peso_num, tipo_de_alimentacion, mascota_id]
    }
    const resultado = await pool.query(consulta);   
    const antecedente = resultado.rows[0];
    return antecedente;        
}

async function actualizar_mascota(nombre_mascota, tipo_mascota, especie, mascota_id) {
    const consulta = {
        text: 'UPDATE mascota SET nombre_mascota = $1, tipo_mascota = $2, especie = $3 WHERE id = $4 RETURNING *',        
        values: [nombre_mascota, tipo_mascota, especie, mascota_id]
    }
    const resultado = await pool.query(consulta);   
    const mascota = resultado.rows[0];
    return mascota;        
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INICIO SESION ESPECIALISTA

async function trae_contrasena_encriptada_especialista(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

async function trae_especialista(cedula_de_identidad, compara_contrasena) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1 AND contrasena_especialista = $2',
        values: [cedula_de_identidad, compara_contrasena]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

async function especialista_ci(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
    };
    const result = await pool.query(consulta);
    return result.rows[0];
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
//de administarcion
// async function trae_especialista(cedula_de_identidad, contrasena_especialista) {
//     const consulta = {
//         text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1 AND contrasena_especialista = $2',
//         values: [cedula_de_identidad, contrasena_especialista]
//     };
//     const result = await pool.query(consulta);
//     return result.rows[0];
// }

async function eliminar_especialista(cedula_de_identidad) {
    const consulta = {
        text: 'DELETE FROM especialista WHERE cedula_de_identidad = $1 RETURNING *',
        values: [cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];
    return especialista;
    
}

async function actualizar_especialista(nombre_especialista, correo_especialista, especialidad, credenciales, cedula_de_identidad) {    
    const consulta = {
        text: 'UPDATE especialista SET nombre_especialista = $1, correo_especialista = $2, especialidad = $3, credenciales = $4 WHERE cedula_de_identidad = $5 RETURNING *',        
        values: [nombre_especialista, correo_especialista, especialidad, credenciales, cedula_de_identidad]
    }
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];    
    return especialista;        
}


//TRAE LISTA DE ESPECIALISTAS

async function muestra_lista_especialistas(tipo_mascota) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE especialidad = $1',
        values: [tipo_mascota]
    };
    const resultado = await pool.query(consulta);   
    return resultado.rows;

}

async function trae_datos_especialista(cedula_de_identidad) {
    const consulta = {
        text: 'SELECT * FROM especialista WHERE cedula_de_identidad = $1',
        values: [cedula_de_identidad]
    };
    const resultado = await pool.query(consulta);   
    const especialista = resultado.rows[0];    
    return especialista;
}

//////////////////////////////////////////////////////////////////////////////////////////

module.exports = { 
    nuevo_tutor,
    nuevo_especialista, 
    muestra_tutores, 
    cambiar_estado_tutores, 
    muestra_especialistas, 
    cambiar_estado_especialistas,
    trae_tutor,    
    eliminar_tutor,
    actualizar_tutor,
    nueva_mascota,
    antecedentes_salud,
    eliminar_especialista,
    actualizar_especialista,
    muestra_lista_especialistas,   
    trae_datos_especialista,
    trae_mascota,
    trae_contrasena_encriptada, 
    tutor_ci,
    trae_antecedentes_mascota,
    eliminar_antecedentes,
    eliminar_mascota,
    actualizar_antecedentes,
    actualizar_mascota,
    trae_id_mascota,
    eliminar_ant_y_tutor,
    eliminar_mascota_y_tutor,
    trae_contrasena_encriptada_especialista,
    trae_especialista,
    especialista_ci

};

 