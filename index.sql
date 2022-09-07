CREATE DATABASE veterinaria;
\c veterinaria;

CREATE TABLE tutor(
    id SERIAL PRIMARY KEY,
    nombre_tutor VARCHAR(50) NOT NULL,
    cedula_de_identidad VARCHAR(10) NOT NULL,    
    telefono VARCHAR(15),
    correo_tutor VARCHAR(60) NOT NULL,
    contrasena_tutor VARCHAR(100) NOT NULL,
    mascota_id INT,
    FOREIGN KEY(mascota_id) REFERENCES mascota (id_mascota),    
    perfil VARCHAR(20),
    foto_tutor VARCHAR(255) NOT NULL,
    estado BOOLEAN
);

veterinaria=# SELECT * FROM tutor;
 id | nombre_tutor | cedula_de_identidad | telefono | correo_tutor | contrasena_tutor | mascota_id | perfil | foto_tutor | estado 
----+--------------+---------------------+----------+--------------+------------------+------------+--------+------------+--------
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
    id_mascota SERIAL PRIMARY KEY,
    nombre_mascota VARCHAR(25) NOT NULL, 
    tipo_mascota VARCHAR(15),   
    especie VARCHAR(20),
    foto_mascota VARCHAR(255) NOT NULL
);

veterinaria=# SELECT * FROM mascota;
 id_mascota | nombre_mascota | tipo_mascota | especie | foto_mascota 
------------+----------------+--------------+---------+--------------
(0 filas)


CREATE TABLE antecedentes_de_salud(
    id_antecedentes SERIAL PRIMARY KEY,
    sintomas VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    peso FLOAT NOT NULL,
    tipo_de_alimentacion VARCHAR(30),
    es_vacunado BOOLEAN NOT NULL,
    es_esterilizado BOOLEAN NOT NULL,
    operaciones_detalle VARCHAR(100),
    antecedentes_mascota_id INT,
    FOREIGN KEY (antecedentes_mascota_id) REFERENCES mascota (id_mascota)
);

veterinaria=# SELECT * FROM antecedentes_de_salud;
 id_antecedentes | sintomas | edad | peso | tipo_de_alimentacion | es_vacunado | es_esterilizado | operaciones_detalle | antecedentes_mascota_id 
-----------------+----------+------+------+----------------------+-------------+-----------------+---------------------+-------------------------
(0 filas)


select * from mascota inner join especialista on mascota.tipo_mascota = especialista.especialidad;

INSERT INTO tutor 
(nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, mascota_id, perfil, foto_tutor, estado)
VALUES
('sol','11111111', '123456789', 'osoabarca@hotmail.com','123',1, 'tutor','art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg',true),
('luna','22222222', '123456789','osoabarca@hotmail.com','123',2,'tutor','ian-dooley-d1UPkiFd04A-unsplash.jpg',true),
('almendra','33333333', '123456789','osoabarca@hotmail.com','123',3,'tutor','edward-cisneros-_H6wpor9mjs-unsplash.jpg',true);

INSERT INTO especialista 
(nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, especialidad, credenciales, perfil, foto_especialista, estado)
VALUES
('pepe','44444444', 'osoabarca@hotmail.com','123','domestico', 'universidad de samoa','especialista', 'art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg', true),
('tito','55555555', 'osoabarca@hotmail.com','123','granja','universidad de samoa','especialista','ian-dooley-d1UPkiFd04A-unsplash.jpg', true),
('lolo','66666666','osoabarca@hotmail.com','123','exotico','universidad de samoa','especialista','edward-cisneros-_H6wpor9mjs-unsplash.jpg', true);

INSERT INTO mascota 
(nombre_mascota, tipo_mascota, especie, foto_mascota)
VALUES
('pelusa','domestico','gato', 'art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg'),
('rebequita','granja','vaca','ian-dooley-d1UPkiFd04A-unsplash.jpg'),
('fifi','exotico','iguana','edward-cisneros-_H6wpor9mjs-unsplash.jpg');


INSERT INTO antecedentes_de_salud
(sintomas, edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, antecedentes_mascota_id)
VALUES
('falta de apetito', 5, 3.0, 'pellet', true, true, '',1),
('embarazada', 3, 4.1, 'pellet', true,false, '',2),
('cojera', 2, 1.7, 'comida casera', false, false, '',3),
('come pasto', 1, 1.2, 'pellet', true, true, '',1),
('decaimiento del animo', 6, 6.2, 'comida casera', true, true, 'sutura  menor',2);