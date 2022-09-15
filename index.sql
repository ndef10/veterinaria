CREATE DATABASE veterinaria;
\c veterinaria;

CREATE TABLE tutor(
    id SERIAL PRIMARY KEY,
    nombre_tutor VARCHAR(50) NOT NULL,
    cedula_de_identidad VARCHAR(10) NOT NULL,    
    telefono VARCHAR(15),
    correo_tutor VARCHAR(60) NOT NULL,
    contrasena_tutor VARCHAR(100) NOT NULL,     
    perfil VARCHAR(20),
    foto_tutor VARCHAR(255) NOT NULL,
    estado BOOLEAN
);

veterinaria=# select * from tutor;
 id | nombre_tutor | cedula_de_identidad | telefono | correo_tutor | contrasena_tutor | perfil | foto_tutor | estado 
----+--------------+---------------------+----------+--------------+------------------+--------+------------+--------
(0 filas)



CREATE TABLE especialista(
    id_especialista SERIAL PRIMARY KEY,
    nombre_especialista VARCHAR(50) NOT NULL,
    cedula_de_identidad VARCHAR(10) NOT NULL,
    correo_especialista VARCHAR(60) NOT NULL,
    contrasena_especialista VARCHAR(100)NOT NULL,    
    especialidad VARCHAR(15),    
    credenciales VARCHAR(50),
    perfil VARCHAR(20),
    foto_especialista VARCHAR(255) NOT NULL,
    estado BOOLEAN
);

veterinaria=# SELECT * FROM especialista;
 id_especialista | nombre_especialista | cedula_de_identidad | correo_especialista | contrasena_especialista | especialidad | credenciales | perfil | foto_especialista | estado 
-----------------+---------------------+---------------------+---------------------+-------------------------+--------------+--------------+--------+-------------------+--------
(0 filas)

CREATE TABLE mascota(
    id SERIAL PRIMARY KEY,
    tutor_id SERIAL,
    FOREIGN KEY(tutor_id) REFERENCES tutor (id), 
    nombre_mascota VARCHAR(25) NOT NULL, 
    tipo_mascota VARCHAR(15),   
    especie VARCHAR(20),
    foto_mascota VARCHAR(255) NOT NULL
);

veterinaria=# select * from mascota;
 id | tutor_id | nombre_mascota | tipo_mascota | especie | foto_mascota 
----+----------+----------------+--------------+---------+--------------
(0 filas)

CREATE TABLE antecedentes_de_salud(
    id SERIAL PRIMARY KEY,
    mascota_id SERIAL,
    FOREIGN KEY(mascota_id) REFERENCES mascota (id),
    sintomas VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    peso FLOAT NOT NULL,
    tipo_de_alimentacion VARCHAR(30),
    es_vacunado BOOLEAN NOT NULL,
    es_esterilizado BOOLEAN NOT NULL,
    operaciones_detalle VARCHAR(100),
    img_estado_actual VARCHAR(255) NOT NULL    
);

veterinaria=# select * from antecedentes_de_salud;
 id | mascota_id | sintomas | edad | peso | tipo_de_alimentacion | es_vacunado | es_esterilizado | operaciones_detalle | antecedentes_mascota_id 
----+------------+----------+------+------+----------------------+-------------+-----------------+---------------------+-------------------------
(0 filas)


select * from mascota inner join especialista on mascota.tipo_mascota = especialista.especialidad;

