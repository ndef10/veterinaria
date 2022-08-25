--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg21.04+1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1.pgdg21.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animal; Type: TABLE; Schema: public; Owner: marceladefranchi
--

CREATE TABLE public.animal (
    id_mascota integer NOT NULL,
    nombre_mascota character varying(25) NOT NULL,
    foto_mascota character varying(255) NOT NULL,
    especie character varying(20)
);


ALTER TABLE public.animal OWNER TO marceladefranchi;

--
-- Name: animal_id_mascota_seq; Type: SEQUENCE; Schema: public; Owner: marceladefranchi
--

CREATE SEQUENCE public.animal_id_mascota_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.animal_id_mascota_seq OWNER TO marceladefranchi;

--
-- Name: animal_id_mascota_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marceladefranchi
--

ALTER SEQUENCE public.animal_id_mascota_seq OWNED BY public.animal.id_mascota;


--
-- Name: antecedentes_de_salud; Type: TABLE; Schema: public; Owner: marceladefranchi
--

CREATE TABLE public.antecedentes_de_salud (
    id_antecedentes integer NOT NULL,
    sintomas character varying(100) NOT NULL,
    edad integer NOT NULL,
    peso double precision NOT NULL,
    tipo_de_alimentacion character varying(30),
    vacunas boolean NOT NULL,
    esterilizado boolean NOT NULL,
    operaciones_detalle character varying(50),
    antecedentes_mascota_id integer
);


ALTER TABLE public.antecedentes_de_salud OWNER TO marceladefranchi;

--
-- Name: antecedentes_de_salud_id_antecedentes_seq; Type: SEQUENCE; Schema: public; Owner: marceladefranchi
--

CREATE SEQUENCE public.antecedentes_de_salud_id_antecedentes_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.antecedentes_de_salud_id_antecedentes_seq OWNER TO marceladefranchi;

--
-- Name: antecedentes_de_salud_id_antecedentes_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marceladefranchi
--

ALTER SEQUENCE public.antecedentes_de_salud_id_antecedentes_seq OWNED BY public.antecedentes_de_salud.id_antecedentes;


--
-- Name: tipo_animal; Type: TABLE; Schema: public; Owner: marceladefranchi
--

CREATE TABLE public.tipo_animal (
    id_tipo_animal integer NOT NULL,
    domestico boolean,
    granja boolean,
    exotico boolean
);


ALTER TABLE public.tipo_animal OWNER TO marceladefranchi;

--
-- Name: tipo_animal_id_tipo_animal_seq; Type: SEQUENCE; Schema: public; Owner: marceladefranchi
--

CREATE SEQUENCE public.tipo_animal_id_tipo_animal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_animal_id_tipo_animal_seq OWNER TO marceladefranchi;

--
-- Name: tipo_animal_id_tipo_animal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marceladefranchi
--

ALTER SEQUENCE public.tipo_animal_id_tipo_animal_seq OWNED BY public.tipo_animal.id_tipo_animal;


--
-- Name: tutor; Type: TABLE; Schema: public; Owner: marceladefranchi
--

CREATE TABLE public.tutor (
    id integer NOT NULL,
    nombre_tutor character varying(50) NOT NULL,
    cedula_de_identidad character varying(10) NOT NULL,
    foto_tutor character varying(255) NOT NULL,
    telefono character varying(15),
    correo_tutor character varying(50) NOT NULL,
    contrasena_tutor character varying(25) NOT NULL,
    mascota_id integer,
    tipo_mascota integer
);


ALTER TABLE public.tutor OWNER TO marceladefranchi;

--
-- Name: tutor_id_seq; Type: SEQUENCE; Schema: public; Owner: marceladefranchi
--

CREATE SEQUENCE public.tutor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tutor_id_seq OWNER TO marceladefranchi;

--
-- Name: tutor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marceladefranchi
--

ALTER SEQUENCE public.tutor_id_seq OWNED BY public.tutor.id;


--
-- Name: veterinario; Type: TABLE; Schema: public; Owner: marceladefranchi
--

CREATE TABLE public.veterinario (
    id_especialista integer NOT NULL,
    nombre_especialista character varying(50) NOT NULL,
    cedula_de_identidad character varying(10) NOT NULL,
    correo_especialista character varying(50) NOT NULL,
    contrasena_especialista character varying(25) NOT NULL,
    foto_especialista character varying(255) NOT NULL,
    especialidad integer,
    credenciales character varying(50)
);


ALTER TABLE public.veterinario OWNER TO marceladefranchi;

--
-- Name: veterinario_id_especialista_seq; Type: SEQUENCE; Schema: public; Owner: marceladefranchi
--

CREATE SEQUENCE public.veterinario_id_especialista_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.veterinario_id_especialista_seq OWNER TO marceladefranchi;

--
-- Name: veterinario_id_especialista_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marceladefranchi
--

ALTER SEQUENCE public.veterinario_id_especialista_seq OWNED BY public.veterinario.id_especialista;


--
-- Name: animal id_mascota; Type: DEFAULT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.animal ALTER COLUMN id_mascota SET DEFAULT nextval('public.animal_id_mascota_seq'::regclass);


--
-- Name: antecedentes_de_salud id_antecedentes; Type: DEFAULT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.antecedentes_de_salud ALTER COLUMN id_antecedentes SET DEFAULT nextval('public.antecedentes_de_salud_id_antecedentes_seq'::regclass);


--
-- Name: tipo_animal id_tipo_animal; Type: DEFAULT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tipo_animal ALTER COLUMN id_tipo_animal SET DEFAULT nextval('public.tipo_animal_id_tipo_animal_seq'::regclass);


--
-- Name: tutor id; Type: DEFAULT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tutor ALTER COLUMN id SET DEFAULT nextval('public.tutor_id_seq'::regclass);


--
-- Name: veterinario id_especialista; Type: DEFAULT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.veterinario ALTER COLUMN id_especialista SET DEFAULT nextval('public.veterinario_id_especialista_seq'::regclass);


--
-- Data for Name: animal; Type: TABLE DATA; Schema: public; Owner: marceladefranchi
--

COPY public.animal (id_mascota, nombre_mascota, foto_mascota, especie) FROM stdin;
1	Chimuelo	nathan-riley-_ir1D49PRqM-unsplash.jpg	gato
2	Hollo	edgar-nKC772R_qog-unsplash.jpg	gato
3	Holly	bogdan-farca-CEx86maLUSc-unsplash.jpg	gata
4	Carlota	mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg	gata
5	Kitty	kote-puerto-so5nsYDOdxw-unsplash.jpg	gata
6	Pelusa	kanashi-BLW_KQ0Rkn0-unsplash.jpg	gato
\.


--
-- Data for Name: antecedentes_de_salud; Type: TABLE DATA; Schema: public; Owner: marceladefranchi
--

COPY public.antecedentes_de_salud (id_antecedentes, sintomas, edad, peso, tipo_de_alimentacion, vacunas, esterilizado, operaciones_detalle, antecedentes_mascota_id) FROM stdin;
1	negritis	4	3.7	carne	t	f	nada	1
2	falta de apetito	5	3	pellet	t	t		2
3	embarazada	3	4.1	pellet	t	f		3
4	cojera	2	1.7	comida casera	f	f		4
5	come pasto	1	1.2	pellet	t	t		5
6	decaimiento del animo	6	6.2	comida casera	t	t	sutura  menor	6
\.


--
-- Data for Name: tipo_animal; Type: TABLE DATA; Schema: public; Owner: marceladefranchi
--

COPY public.tipo_animal (id_tipo_animal, domestico, granja, exotico) FROM stdin;
1	t	f	f
2	f	t	f
3	f	f	t
\.


--
-- Data for Name: tutor; Type: TABLE DATA; Schema: public; Owner: marceladefranchi
--

COPY public.tutor (id, nombre_tutor, cedula_de_identidad, foto_tutor, telefono, correo_tutor, contrasena_tutor, mascota_id, tipo_mascota) FROM stdin;
1	Maritza Abarca	12123123-8	art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg	+56229644791	maetillanes@hotmail.com	123	1	1
2	Ovaldo Abrigo	12123123-8	ian-dooley-d1UPkiFd04A-unsplash.jpg	+56229644791	osoabarca@hotmail.com	123	2	1
3	Camila Abrigo	12123123-8	edward-cisneros-_H6wpor9mjs-unsplash.jpg	+56229644791	cabrigor@garmendia.cl	123	3	1
4	Francisca Abumohor	12123123-8	mateus-campos-felipe-JoM_lC1WAnE-unsplash.jpg	+56229644791	fran.afulle@live.cl	123	4	1
5	Carlos Aguilera	12123123-8	joseph-gonzalez-iFgRcqHznqg-unsplash.jpg	+56229644791	carlosaguileramo@hotmail.com	123	5	1
6	Catalina Rojo	12123123-8	gabriel-silverio-u3WmDyKGsrY-unsplash.jpg	+56229644791	ikis_rojos@hotmail.com	123	6	1
7	Marcela Defranchi	12123123-8	art-hauntington-jzY0KRJopEI-unsplasian-dooley-d1UPkiFd04A-unsplash.jpgh.jpg	+56229644791	nodemailerMD@gmail.com	123	1	1
\.


--
-- Data for Name: veterinario; Type: TABLE DATA; Schema: public; Owner: marceladefranchi
--

COPY public.veterinario (id_especialista, nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, foto_especialista, especialidad, credenciales) FROM stdin;
1	Catalina Perez	12123123-8	marceladefranchi59@yahoo.es	123	ani-kolleshi-7jjnJ-QA9fY-unsplash.jpg	3	Universidad de Samoa
2	Rene Sarmiento	12123123-8	marceladefranchi59@yahoo.es	123	austin-distel-7bMdiIqz_J4-unsplash.jpg	2	Universidad de Samoa
3	Mariana Shulz	12123123-8	marceladefranchi59@yahoo.es	123	humberto-chavez-FVh_yqLR9eA-unsplash.jpg	1	Universidad de Samoa
4	Pedro Aguilera	12123123-8	marceladefranchi59@yahoo.es	123	karlo-tottoc-ybZ5hRxaWS4-unsplash.jpg	1	Universidad de Samoa
5	Carlos Chavez	12123123-8	marceladefranchi59@yahoo.es	123	marina-hanna-ZzEgfT9Fxn4-unsplash.jpg	1	Universidad de Samoa
6	Cristian Pardo	12123123-8	marceladefranchi59@yahoo.es	123	sander-sammy-38Un6Oi5beE-unsplash.jpg	2	Universidad de Samoa
7	Felipe Acosta	12123123-8	marceladefranchi59@yahoo.es	123	usman-yousaf-pTrhfmj2jDA-unsplash.jpg	1	Universidad de Samoa
\.


--
-- Name: animal_id_mascota_seq; Type: SEQUENCE SET; Schema: public; Owner: marceladefranchi
--

SELECT pg_catalog.setval('public.animal_id_mascota_seq', 6, true);


--
-- Name: antecedentes_de_salud_id_antecedentes_seq; Type: SEQUENCE SET; Schema: public; Owner: marceladefranchi
--

SELECT pg_catalog.setval('public.antecedentes_de_salud_id_antecedentes_seq', 6, true);


--
-- Name: tipo_animal_id_tipo_animal_seq; Type: SEQUENCE SET; Schema: public; Owner: marceladefranchi
--

SELECT pg_catalog.setval('public.tipo_animal_id_tipo_animal_seq', 1, false);


--
-- Name: tutor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marceladefranchi
--

SELECT pg_catalog.setval('public.tutor_id_seq', 7, true);


--
-- Name: veterinario_id_especialista_seq; Type: SEQUENCE SET; Schema: public; Owner: marceladefranchi
--

SELECT pg_catalog.setval('public.veterinario_id_especialista_seq', 7, true);


--
-- Name: animal animal_pkey; Type: CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (id_mascota);


--
-- Name: antecedentes_de_salud antecedentes_de_salud_pkey; Type: CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.antecedentes_de_salud
    ADD CONSTRAINT antecedentes_de_salud_pkey PRIMARY KEY (id_antecedentes);


--
-- Name: tipo_animal tipo_animal_pkey; Type: CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tipo_animal
    ADD CONSTRAINT tipo_animal_pkey PRIMARY KEY (id_tipo_animal);


--
-- Name: tutor tutor_pkey; Type: CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tutor
    ADD CONSTRAINT tutor_pkey PRIMARY KEY (id);


--
-- Name: veterinario veterinario_pkey; Type: CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.veterinario
    ADD CONSTRAINT veterinario_pkey PRIMARY KEY (id_especialista);


--
-- Name: antecedentes_de_salud antecedentes_de_salud_antecedentes_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.antecedentes_de_salud
    ADD CONSTRAINT antecedentes_de_salud_antecedentes_mascota_id_fkey FOREIGN KEY (antecedentes_mascota_id) REFERENCES public.animal(id_mascota);


--
-- Name: tutor tutor_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tutor
    ADD CONSTRAINT tutor_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.animal(id_mascota);


--
-- Name: tutor tutor_tipo_mascota_fkey; Type: FK CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.tutor
    ADD CONSTRAINT tutor_tipo_mascota_fkey FOREIGN KEY (tipo_mascota) REFERENCES public.tipo_animal(id_tipo_animal);


--
-- Name: veterinario veterinario_especialidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: marceladefranchi
--

ALTER TABLE ONLY public.veterinario
    ADD CONSTRAINT veterinario_especialidad_fkey FOREIGN KEY (especialidad) REFERENCES public.tipo_animal(id_tipo_animal);


--
-- PostgreSQL database dump complete
--

