require('dotenv').config();
// console.log(process.env)
const express = require('express');
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const app = express();

//base de datos
const { 
    nuevo_tutor,
    muestra_tutores,
    nuevo_especialista,     
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
    
     

} = require('./database');

const  { encripta, compara }  = require('./encriptador_tutor');
const { genera_token, verifica_token } = require('./verificador_token');
const { cookie } = require('./cookie');

const { encripta_especialista, compara_especialista } = require('./encriptador_especialista');
const { genera_token_especialista, verifica_token_especialista } = require('./verificador_token_especialista');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
//servidor
const puerto = process.env.PORT || 4000
app.listen(puerto, console.log('servidor en puerto:', puerto));

//Middlewares

//recibe carga de imagenes
app.use(bodyParser.urlencoded({ extended: true }));

//permite usar PUT o DELETE en lugares donde el cliente no lo admite
app.use(methodOverride('_method'))

//parsear cookies
app.use(cookieParser());

//recibir payload de consultas put y post
app.use(bodyParser.json());

//contenido de carpeta public declarado como estatico
app.use(express.static(__dirname + '/public'));

//configuracion de FileUpload
app.use(
    expressFileUpload({
        limits: { fileSize: 100000000 },
        abortOnLimit: true,
        responseOnLimit: 'El tamaño de la imagen supera el limite permitido',
    })
);

//configuracion de css, que accedera directamente a carpeta de bootstrap descargado en node_modules
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Condiguracion handlebars
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: `${__dirname}/views/Layout`,
    })
);
app.set('view engine', 'handlebars');


//RUTAS


//ruta raiz con pagina principal y formulario para elegir perfil
app.get('/', async (req, res) => {
    res.render('elige_perfil');
})

//ELEGIR PERFIL


//ruta post con formulario para elegir perfil y ser redireccionado a crear cuenta
app.post('/elige_perfil', async (req, res) => {
    const { perfil } = req.body;
    if (perfil === 'tutor') {
        res.redirect('crear_cuenta_tutor')
    }else if (perfil === 'especialista') {
        res.redirect('crear_cuenta_especialista')
    }    
})

//CREAR CUENTA TUTOR

//ruta get con formulario para crear cuenta tutor
app.get('/crear_cuenta_tutor', (req, res) => {
    res.render('crear_cuenta_tutor');
})

//ruta post para ingresar datos y crear nuevo tutor, debe redireccionar a inicio de sesion
app.post('/nuevo_tutor', async (req, res) => {
    const { nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, repita_contrasena} = req.body;
    const estado = false;
    const perfil = 'tutor';    
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    } 

    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_tutor = (`http://localhost:`+ puerto +`/uploads/${name}`);    
    const contrasena_encriptada = await encripta(contrasena_tutor);  
        
    try {
        
        const tutor = await nuevo_tutor( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_encriptada, perfil, foto_tutor, estado );
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            }) 
            res.status(200).json({ message: 'Bienvenido!! su cuenta ha sido creada' });                             
        })       
          
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }           
})

//CREAR CUENTA ESPECIALISTA

//ruta get con formulario para crear cuenta especialista
app.get('/crear_cuenta_especialista', (req, res) => {
    res.render('crear_cuenta_especialista');
})

//ruta post para ingresar datos y crear nuevo especialista
app.post('/nuevo_especialista', async (req, res) => {
    const { nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, repita_contrasena, especialidad, credenciales} = req.body;
    const estado = false;
    const perfil = 'especialista';    
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    } 

    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_especialista = (`http://localhost:`+ puerto +`/uploads/${name}`);    
    const contrasena_encriptada = await encripta_especialista(contrasena_especialista);  
        
    try {
        
        const especialista = await nuevo_especialista( nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_encriptada, especialidad, credenciales, perfil, foto_especialista, estado);
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            }) 
            res.status(200).json({ message: 'Bienvenido!! su cuenta ha sido creada' });                             
        })       
          
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }           
})

//AUTORIZAR TUTORES

//ruta que trae lista de tutores para su autorizacion
app.get('/autorizacion_tutores', async (req, res) => {    
    try {
        const tutores = await muestra_tutores();   
        res.render('autorizacion_tutores', { tutores });     
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        });        
    }
})

//ruta put que cambia estado de tutores
app.put('/autorizacion_tutores', async (req, res)=>{
    const { estado, cedula_de_identidad } = req.body;
       
    try {
        const tutor = await cambiar_estado_tutores(estado, cedula_de_identidad);
        res.status(200).send(tutor);
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })
    }
    
})

//AUTORIZAR ESPECIALISTAS

//ruta que trae lista de especialistas para su autorizacion
app.get('/autorizacion_especialistas', async (req, res) => {    
    try {
        const especialistas = await muestra_especialistas();           
        res.render('autorizacion_especialistas', { especialistas });     
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        });        
    }
})

//ruta put que cambia estado de especialistas
app.put('/autorizacion_especialistas', async (req, res)=>{
    const { estado, cedula_de_identidad } = req.body;
       
    try {
        const especialista = await cambiar_estado_especialistas(estado, cedula_de_identidad);
        res.status(200).send(JSON.stringify(especialista));
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })
    }
    
})

//INICIO SESION TUTOR

//ruta get con formulario para inicio de sesion tutor
app.get('/inicio_sesion_tutor', (req, res) => {
    res.render('inicio_sesion_tutor');
})


//ruta post para iniciar sesion tutor, redirecciona al perfil del tutor con cookie
app.post('/inicio_sesion_tutor', async (req, res) => {
    const { cedula_de_identidad, contrasena_tutor } = req.body; 
    if(!cedula_de_identidad || !contrasena_tutor) return res.status(400).json(({error: 'Faltan parametros'}))    
    const tutor = await tutor_ci(cedula_de_identidad);
         
    if(!tutor) {
        res.status(404).send({
            error: 'Este tutor no se ha registrado',
            code: 404,
        }); 

    }if (!tutor.estado) {        
        res.status(401).send({
        error: 'Este tutor se encuentra en evaluacion',
        code: 401,
        });               
                         
    } else {
        const tutor_id = await trae_contrasena_encriptada(cedula_de_identidad);           
        contrasena_encriptada = tutor_id.contrasena_tutor;    
        const compara_contrasena = await compara(contrasena_tutor, contrasena_encriptada); 
        
        if (compara_contrasena === false) {
            res.status(401).send({
                error: 'Credenciales incorrectas',
                code: 401,
            });
        }
        const tutor = await trae_tutor(cedula_de_identidad, contrasena_encriptada);        
        const token = await genera_token(tutor);
        res.cookie('retoken', token, {httpOnly: true});
        res.redirect('/perfil_tutor');

    }                
   
});


//PERFIL TUTOR

// ruta get con perfil de tutor, rcibe cookie, verifica el token, muestra datos del tutor 
// (tiene links hacia registrar mascota  ver datos de mascota)
app.get('/perfil_tutor' , cookie, async (req, res) => { 
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {nombre_tutor, cedula_de_identidad, telefono, correo_tutor, foto_tutor} = data;

    res.render('perfil_tutor', {nombre_tutor, cedula_de_identidad, telefono, correo_tutor, foto_tutor });    
});


//eliminar datos de tutor
app.delete('/eliminar/:cedula_de_identidad', async (req, res) => {         
    const cedula_de_identidad = req.params.cedula_de_identidad;    
    const tutor = await tutor_ci(cedula_de_identidad); 
    console.log(tutor)    
    const tutor_id = tutor.id
    console.log(tutor_id)
    const mascota = await trae_id_mascota(tutor_id);
    
    if(!mascota) {
        await eliminar_tutor(cedula_de_identidad);
        res.status(200).json({ message: 'Su datos han sido eliminados' });

    }else {
        
    }
    try {
        const id_mascota = mascota.id;
        await eliminar_ant_y_tutor(id_mascota);
        await eliminar_mascota_y_tutor(tutor_id);
        await eliminar_tutor(cedula_de_identidad);

        res.status(200).json({ message: 'Su datos han sido eliminados' });
        
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error'});        
    }           
});

//actualizar datos de tutor
app.put('/actualizar/:cedula_de_identidad', async (req, res) => {      
    const { nombre_tutor, telefono, correo_tutor, cedula_de_identidad  } = req.body;         
    await actualizar_tutor(nombre_tutor, telefono, correo_tutor, cedula_de_identidad );    
    res.status(200).json({ message: 'Sus datos han sido actualizados' });   
})

//ACCESO DENEGADO

//ruta get con acceso denegado e invitacion a crear cuenta
app.get('/403', async (req, res) => {
    res.render('403');
})


//DATOS DE MASCOTA

//ruta get con formulario para registro de mascota
app.get('/registro_mascota', async (req, res) => {
    res.render('registro_mascota');
})

//ruta post que crea nueva mascota, al terminar conduce a completar antecedentes de salud
app.post('/nueva_mascota', cookie, async (req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;   
    const { nombre_mascota, tipo_mascota, especie } = req.body;
    const tutor_id = id;

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }

    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_mascota = (`http://localhost:`+ puerto +`/uploads/${name}`);
    
    try {
        const mascota = await nueva_mascota( tutor_id, nombre_mascota, tipo_mascota, especie, foto_mascota );                
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })            
            res.redirect('/antecedentes');            
        })       
           
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }     
    
});

//ruta get con formulario para completar antecedentes de  salud
app.get('/antecedentes', async (req, res) => {
    res.render('antecedentes')
})

//ruta post para crear ficha con antecedentes de salud
app.post('/antecedentes_de_salud', cookie , async (req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;    
    const mascota = await trae_mascota(id);    
    console.log(mascota)
    const mascota_id = mascota.id;
        
    const { sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle } = req.body;
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const img_estado_actual = (`http://localhost:`+ puerto +`/uploads/${name}`);
    
    try {
        const antecedente = await antecedentes_salud( mascota_id, sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual);
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            res.status(200).json({ message: 'Los datos de su mascota han sido registrados' });          
        })       
           
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }     
})

/////////////////////////////////////////////////////////////////////////////////////////////////

//INICIO SESION ESPECIALISTA

//ruta get con formulario para inicio de sesion especialista
app.get('/inicio_sesion_especialista', (req, res) => {
    res.render('inicio_sesion_especialista');
})

//ruta post inicio de sesion para especialista
app.post('/inicio_sesion_especialista', async (req, res) => {
    const { cedula_de_identidad, contrasena_especialista } = req.body;     
    if(!cedula_de_identidad || !contrasena_especialista) return res.status(400).json(({error: 'Faltan parametros'}))    
    const especialista = await especialista_ci(cedula_de_identidad);   
         
    if(!especialista) {
        res.status(404).send({
            error: 'Este especialista no se ha registrado',
            code: 404,
        }); 

    }if (!especialista.estado) {        
        res.status(401).send({
        error: 'Este especialista se encuentra en evaluacion',
        code: 401,
        });               
                         
    } else {
        const especialista_id = await trae_contrasena_encriptada_especialista(cedula_de_identidad);                 
        contrasena_encriptada = especialista_id.contrasena_especialista;       
        const compara_contrasena = await compara_especialista(contrasena_especialista, contrasena_encriptada); 
        
        if (compara_contrasena === false) {
            res.status(401).send({
                error: 'Credenciales incorrectas',
                code: 401,
            });
        }
        const especialista = await trae_especialista(cedula_de_identidad, contrasena_encriptada);        
        const token = await genera_token_especialista(especialista);
        res.cookie('retoken', token, {httpOnly: true});
        res.redirect('/perfil_especialista');

    }                
   
});


//PERFIL ESPECIALISTA

//ruta get con perfil de especialista, redirecciona 
app.get('/perfil_especialista' , cookie, async (req, res) => { 
    const token = await verifica_token_especialista(req.cookies.retoken);
    const data = token.data;
    const {nombre_especialista, cedula_de_identidad, correo_especialista, especialidad, credenciales, foto_especialista} = data;

    res.render('perfil_especialista', {nombre_especialista, cedula_de_identidad, correo_especialista, especialidad, credenciales, foto_especialista });    
});


//eliminar datos de especialista
app.delete('/eliminar_especialista/:cedula_de_identidad', async (req, res) => {         
    const cedula_de_identidad = req.params.cedula_de_identidad;
    
    try {
        await eliminar_especialista(cedula_de_identidad);
        res.status(200).json({ message: 'Su datos han sido eliminados' });        
        
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error'});        
    }           
});

//actualizar datos de especialista
app.put('/actualizar_especialista/:cedula_de_identidad', async (req, res) => {       
    const { nombre_especialista, correo_especialista, especialidad, credenciales, cedula_de_identidad  } = req.body;         
    await actualizar_especialista(nombre_especialista, correo_especialista, especialidad, credenciales, cedula_de_identidad );    
    res.status(200).json({ message: 'Sus datos han sido actualizados' });   
})

//LISTA DE ESPECIALISTAS


app.get('/lista_especialistas', cookie, async(req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;
    // console.log(data)
    const mascota = await trae_mascota(id);    
    // console.log(mascota.tipo_mascota)
    const tipo_mascota = mascota.tipo_mascota;   

    try {
        const especialistas = await muestra_lista_especialistas(tipo_mascota);          
        res.render('lista_especialistas', { especialistas });     
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        });        
    }
});

//ruta put que selecciona un especialista de la lista
app.put('/seleccion_especialista', cookie, async (req, res)=>{
    const { cedula_de_identidad } = req.body; 
     
    try {
        const especialista = await trae_datos_especialista(cedula_de_identidad);        
    console.log(especialista);
        
        res.render('contacto', { especialista });        
        
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })
    }
    
})

//ruta get, con formulario de contacto
app.get('/contacto', async(req, res) => {
    res.render('contacto');
})


///////////////////////////////////////////////////////////////////////////

// DATOS MASCOTA


//ruta get que muestra datos de mascota
app.get('/datos_mascota', cookie , async (req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;   
    
    try {
    const mascota = await trae_mascota(id);            
    const mascota_id = mascota.id
    const antecedentes = await trae_antecedentes_mascota(mascota_id);
    
    res.render('datos_mascota', { mascota, antecedentes});  
        
    } catch (error) {        
        res.send('aun no has registrado a tu mascota');               
    }         
});

// eliminar datos de mascota
app.delete('/eliminar_datos_mascota/:id', cookie, async (req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;
    try {
        const mascota = await trae_mascota(id);        
        const mascota_id = mascota.id
        await eliminar_antecedentes(mascota_id); 
        await eliminar_mascota(mascota_id);
        res.send('Los datos de su mascota han sido eliminados');  

    } catch (error) {
        res.send('no hay nada que eliminar');        
    }      
});

//AQUI VOY

// actualizar datos de mascota     
app.put('/actualizar_datos_mascota/:id', cookie, async (req, res) => {
    const token = await verifica_token(req.cookies.retoken);
    const data = token.data;
    const {id} = data;    
    const { sintomas, edad, peso, tipo_de_alimentacion } = req.body;
    const { nombre_mascota, tipo_mascota, especie } = req.body;
    try {
        const mascota = await trae_mascota(id);        
        const mascota_id = mascota.id;        
        const edad_num = +edad;
        const peso_num = +peso;        
        await actualizar_antecedentes(sintomas, edad_num, peso_num, tipo_de_alimentacion, mascota_id); 
        await actualizar_mascota(nombre_mascota, tipo_mascota, especie, mascota_id);
        res.send('Los datos de su mascota han sido actualizados');  
    
    } catch (error) {       
            return res.status(403).json({ message: 'ha ocurrido un error'});        
    }
});


//EN OBRA


//agregar ruta get con notificacion de correos


