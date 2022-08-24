CREATE DATABASE veterinaria;
\c veterinaria;

CREATE TABLE tutor(
    id SERIAL PRIMARY KEY,
    nombre_tutor VARCHAR(50) NOT NULL,
    foto_tutor VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    correo_tutor VARCHAR(50) NOT NULL,
    contrasena_tutor VARCHAR(25) NOT NULL,
    mascota_id SERIAL,
    FOREIGN KEY(mascota_id) REFERENCES animal (id_mascota),
    tipo_mascota SERIAL,
    FOREIGN KEY(tipo_mascota) REFERENCES tipo_animal (id_tipo_animal)
);

veterinaria=# select * from tutor;
 id | nombre_tutor | foto_tutor | telefono | correo_tutor | contrasena_tutor | mascota_id | tipo_mascota 
----+--------------+------------+----------+--------------+------------------+------------+--------------
(0 filas)

INSERT INTO tutor 
(nombre_tutor, foto_tutor, telefono, correo_tutor, contrasena_tutor, mascota_id, tipo_mascota)
VALUES
('Maritza Abarca','art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg','+56229644791', 'maetillanes@hotmail.com','123',1,1),
('Ovaldo Abrigo','ian-dooley-d1UPkiFd04A-unsplash.jpg','+56229644791', 'osoabarca@hotmail.com','123',2,1),
('Camila Abrigo','edward-cisneros-_H6wpor9mjs-unsplash.jpg','+56229644791', 'cabrigor@garmendia.cl','123',3,1),
('Francisca Abumohor','mateus-campos-felipe-JoM_lC1WAnE-unsplash.jpg','+56229644791', 'fran.afulle@live.cl','123',4,1),
('Carlos Aguilera','joseph-gonzalez-iFgRcqHznqg-unsplash.jpg','+56229644791', 'carlosaguileramo@hotmail.com', '123',5,1),
('Catalina Rojo','gabriel-silverio-u3WmDyKGsrY-unsplash.jpg', '+56229644791','ikis_rojos@hotmail.com','123',6,1);

CREATE TABLE animal(
    id_mascota SERIAL PRIMARY KEY,
    nombre_mascota VARCHAR(25) NOT NULL,
    foto_mascota VARCHAR(255) NOT NULL,
    especie VARCHAR(20)
);


veterinaria=# select * from animal;
 id_mascota | nombre_mascota | foto_mascota | especie 
------------+----------------+--------------+---------
(0 filas)

INSERT INTO animal 
(nombre_mascota, foto_mascota, especie)
VALUES
('Chimuelo', 'nathan-riley-_ir1D49PRqM-unsplash.jpg', 'gato'),
('Hollo', 'edgar-nKC772R_qog-unsplash.jpg', 'gato'),
('Holly', 'bogdan-farca-CEx86maLUSc-unsplash.jpg', 'gata'),
('Carlota', 'mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg', 'gata'),
('Kitty', 'kote-puerto-so5nsYDOdxw-unsplash.jpg', 'gata'),
('Pelusa', 'kanashi-BLW_KQ0Rkn0-unsplash.jpg', 'gato');


CREATE TABLE antecedentes_de_salud(
    id_antecedentes SERIAL PRIMARY KEY,
    sintomas VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    peso FLOAT NOT NULL,
    tipo_de_alimentacion VARCHAR(30),
    vacunas BOOLEAN NOT NULL,
    esterilizado BOOLEAN NOT NULL,
    operaciones_detalle VARCHAR(50),
    antecedentes_mascota_id INT,
    FOREIGN KEY (antecedentes_mascota_id) REFERENCES animal (id_mascota)
);

veterinaria=# select * from antecedentes_de_salud;
id_antecedentes | sintomas | edad | peso | tipo_de_alimentacion | vacunas | esterilizado | operaciones_detalle | antecedentes_mascota_id 
-----------------+----------+------+------+----------------------+---------+--------------+---------------------+-------------------------
(0 filas)

INSERT INTO antecedentes_de_salud
(sintomas, edad, peso, tipo_de_alimentacion, vacunas, esterilizado, operaciones_detalle, antecedentes_mascota_id)
VALUES
('negritis', 4, 3.7, 'carne', true, false, 'nada', 1);

INSERT INTO antecedentes_de_salud
(sintomas, edad, peso, tipo_de_alimentacion, vacunas, esterilizado, operaciones_detalle, antecedentes_mascota_id)
VALUES
('falta de apetito', 5, 3.0, 'pellet', true, true, '',2),
('embarazada', 3, 4.1, 'pellet', true,false, '',3),
('cojera', 2, 1.7, 'comida casera', false, false, '',4),
('come pasto', 1, 1.2, 'pellet', true, true, '',5),
('decaimiento del animo', 6, 6.2, 'comida casera', true, true, 'sutura  menor',6);


CREATE TABLE veterinario(
    id_especialista SERIAL PRIMARY KEY,
    nombre_especialista VARCHAR(50) NOT NULL,
    correo_especialista VARCHAR(50) NOT NULL,
    contrasena_especialista VARCHAR(25)NOT NULL,
    foto_especialista VARCHAR(255) NOT NULL,
    especialidad INT,
    FOREIGN KEY (especialidad) REFERENCES tipo_animal (id_tipo_animal),
    credenciales VARCHAR(50)
);

veterinaria=# select * from veterinario;
 id_especialista | nombre_especialista | correo_especialista | contrasena_especialista | foto_especialista | especialidad | credenciales 
-----------------+---------------------+---------------------+-------------------------+-------------------+--------------+--------------
(0 filas)

INSERT INTO veterinario 
(nombre_especialista, correo_especialista, contrasena_especialista, foto_especialista, especialidad, credenciales )
VALUES
('Catalina Perez','cperez@veterinaria.com', '123', 'ani-kolleshi-7jjnJ-QA9fY-unsplash.jpg', 3, 'Universidad de Samoa'),
('Rene Sarmiento', 'rsarmiento@veterinaria.com','123', 'austin-distel-7bMdiIqz_J4-unsplash.jpg', 2,'Universidad de Samoa'),
('Mariana Shulz', 'mshulz@veterinaria.com','123', 'humberto-chavez-FVh_yqLR9eA-unsplash.jpg', 1, 'Universidad de Samoa'),
('Pedro Aguilera', 'paguilera@veterinaria.com','123', 'karlo-tottoc-ybZ5hRxaWS4-unsplash.jpg', 1, 'Universidad de Samoa'),
('Carlos Chavez', 'cchavez@veterinaria.com','123', 'marina-hanna-ZzEgfT9Fxn4-unsplash.jpg', 1,'Universidad de Samoa'),
('Cristian Pardo','cpardo@veterinaria.com','123', 'sander-sammy-38Un6Oi5beE-unsplash.jpg', 2,'Universidad de Samoa'),
('Felipe Acosta', 'facosta@veterinaria.com','123', 'usman-yousaf-pTrhfmj2jDA-unsplash.jpg', 1,'Universidad de Samoa');


CREATE TABLE tipo_animal(
    id_tipo_animal SERIAL PRIMARY KEY,
    domestico BOOLEAN,
    granja BOOLEAN,
    exotico BOOLEAN
);

veterinaria=# select * from tipo_animal;
 id_tipo_animal | domestico | granja | exotico 
----------------+-----------+--------+---------
(0 filas)

INSERT INTO tipo_animal 
(id_tipo_animal,domestico, granja, exotico)
VALUES
(1, true, false, false),
(2,false, true, false),
(3, false, false, true);






