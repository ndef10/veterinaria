require('dotenv').config();
// console.log(process.env)
const express = require('express');
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const methodOverride = require('method-override');
// const bcrypt = require('bcryptjs');
// const session = require('express-session');

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
    trae_especialista,
    eliminar_tutor,
    actualizar_tutor,
    nueva_mascota,
    antecedentes_salud,
    eliminar_especialista,
    actualizar_especialista,
    muestra_lista_especialistas,   
    trae_datos_especialista,
    trae_mascota,
    trae_contrasena_encriptada
     

} = require('./database');

const  { encripta, compara }  = require('./encriptador_tutor');

//servidor
const puerto = process.env.PORT || 4000
app.listen(puerto, console.log('servidor en puerto:', puerto));

//Middlewares

//recibe carga de imagenes
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({extended: true}));

//permite usar PUT o DELETE en lugares donde el cliente no lo admite
app.use(methodOverride('_method'))

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
    // console.log(req.body)

})

//CREAR CUENTA TUTOR

//ruta get con formulario para crear cuenta tutor
app.get('/crear_cuenta_tutor', (req, res) => {
    res.render('crear_cuenta_tutor');
})

//ruta post para ingresar datos y crear nuevo tutor, debe redireccionar a inicio de sesion
app.post('/nuevo_tutor', async (req, res) => {
    const { nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, repita_contrasena, perfil } = req.body;
    const estado = false;    
    // console.log(req.body);
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_tutor = (`http://localhost:`+ puerto +`/uploads/${name}`);    
    const contrasena_encriptada = await encripta(contrasena_tutor);  
    console.log(contrasena_encriptada);   
    
    try {
        
        const tutor = await nuevo_tutor( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_encriptada, perfil, foto_tutor, estado );
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            res.redirect('/inicio_sesion_tutor');            
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

//ruta post para ingresar datos y crear nuevo especialista, debe redireccionar a inicio de sesion
app.post('/nuevo_especialista', async (req, res) => {
    const { nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, repita_contrasena, especialidad, credenciales, perfil } = req.body;
    const estado = false;    
    // console.log(req.body);
    // console.log(estado);
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_especialista = (`http://localhost:`+ puerto +`/uploads/${name}`);
    //falta cifrar contrasena antes de guardar en la base de datos y validar    
    try {
        const especialista = await nuevo_especialista( nombre_especialista, cedula_de_identidad, correo_especialista, contrasena_especialista, especialidad, credenciales, perfil, foto_especialista, estado );
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            res.redirect('/inicio_sesion_especialista');            
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
    // console.log(req.body)    
    try {
        const tutor = await cambiar_estado_tutores(estado, cedula_de_identidad);
        res.status(200).send(JSON.stringify(tutor));
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
        // console.log(especialistas)   
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
    // console.log(req.body)    
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

//ruta post inicio de sesion para tutor
app.post('/inicio_sesion_tutor', async (req, res) => {
    const { cedula_de_identidad, contrasena_tutor } = req.body; 
    const tutor_id = await trae_contrasena_encriptada(cedula_de_identidad);     
    contrasena_encriptada = tutor_id.contrasena_tutor; 
    console.log(contrasena_encriptada)
    const compara_contrasena = await compara(contrasena_tutor, contrasena_encriptada); 
    console.log(compara_contrasena)
    if (compara_contrasena === false) {
        res.status(401).send({
            error: 'Credenciales incorrectas',
            code: 401,
        });
    }
    const tutor = await trae_tutor(cedula_de_identidad, contrasena_encriptada); 
     
    if(tutor) {
        if (tutor.estado) {
            const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 180,
                    data: tutor,
                },secretKey
            );             
            res.redirect(`/perfil_tutor?token=${token}`);           
            
        } else {
            res.status(401).send({
                error: 'Este tutor se encuentra en evaluacion',
                code: 401,
            });
        }                
    } else {
        res.status(404).send({
            error: 'Este tutor no se ha registrado',
            code: 404,
        });
    }
});

//PERFIL TUTOR

//ruta get con perfil de tutor, redirecciona a registro de mascota
app.get('/perfil_tutor' , function (req, res) {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        const { data } = decoded;
        const { id, nombre_tutor, cedula_de_identidad, telefono, correo_tutor, foto_tutor } = data;
        // console.log(data)       
        err
            ? res.status(401).send(
                res.send({
                    error: '401 Unauthorized',
                    message: 'Usted no esta autorizado para estar aqui',
                    token_error: err.message,
                })
            )
            : res.render('perfil_tutor', { id, nombre_tutor, cedula_de_identidad, telefono, correo_tutor, foto_tutor });
    });
});


//eliminar datos de tutor
app.delete('/eliminar/:cedula_de_identidad', async (req, res) => {          
    const cedula_de_identidad = req.params.cedula_de_identidad;   
    await eliminar_tutor(cedula_de_identidad);
    res.send('Su datos han sido eliminados');   
});

//actualizar datos de tutor
app.put('/actualizar/:cedula_de_identidad', async (req, res) => {      
    const { nombre_tutor, telefono, correo_tutor, cedula_de_identidad  } = req.body;
    // console.log(req.body)      
    await actualizar_tutor(nombre_tutor, telefono, correo_tutor, cedula_de_identidad );    
    res.redirect('/registro_mascota');   
})

//DATOS DE MASCOTA

//ruta get con formulario para registro de mascota
app.get('/registro_mascota', (req, res) => {
    res.render('registro_mascota');
})

//ruta post que crea nueva mascota, deberia redireccionar a completar antecedentes de salud
app.post('/nueva_mascota' , async (req, res) => {
    const { nombre_mascota, tipo_mascota, especie } = req.body;
    // console.log(req.body)

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_mascota = (`http://localhost:`+ puerto +`/uploads/${name}`);
    // console.log(foto_mascota)
    try {
        const mascota = await nueva_mascota( nombre_mascota, tipo_mascota, especie, foto_mascota );                
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            // const mascota_id = await consulta_id()
            res.redirect('/antecedentes');            
        })       
           
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }     
    
});

//ruta get con formulario para compleatr antecedentes de  salud
app.get('/antecedentes', async (req, res) => {
    res.render('antecedentes')
})

//ruta post para crear ficha con antecedentes de salud
app.post('/antecedentes_de_salud' , async (req, res) => {
    const { sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle } = req.body;
    // console.log(req.body)
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const img_estado_actual = (`http://localhost:`+ puerto +`/uploads/${name}`);
    // console.log(img_estado_actual)
    try {
        const antecedente = await antecedentes_salud( sintomas,edad, peso, tipo_de_alimentacion, es_vacunado, es_esterilizado, operaciones_detalle, img_estado_actual);
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            res.redirect('/lista_especialistas');            
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
    //console.log(req.body)   
    const especialista = await trae_especialista(cedula_de_identidad, contrasena_especialista);   
    if(especialista) {
        if (especialista.estado) {
            const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 180,
                    data: especialista,
                },secretKey
            );             
            res.redirect(`/perfil_especialista?token=${token}`);           
            
        } else {
            res.status(401).send({
                error: 'Este especialista se encuentra en evaluacion',
                code: 401,
            });
        }                
    } else {
        res.status(404).send({
            error: 'Este especialista no se ha registrado',
            code: 404,
        });
    }
});

//PERFIL ESPECIALISTA

//ruta get con perfil de especialista, redirecciona ................................
app.get('/perfil_especialista' , function (req, res) {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        const { data } = decoded;
        const { nombre_especialista, cedula_de_identidad, correo_especialista, especialidad, credenciales, foto_especialista } = data;
        // console.log(data)       
        err
            ? res.status(401).send(
                res.send({
                    error: '401 Unauthorized',
                    message: 'Usted no esta autorizado para estar aqui',
                    token_error: err.message,
                })
            )
            : res.render('perfil_especialista', { nombre_especialista, cedula_de_identidad, correo_especialista, especialidad, credenciales, foto_especialista });
    });
});


//eliminar datos de especialista
app.delete('/eliminar_especialista/:cedula_de_identidad', async (req, res) => {          
    const cedula_de_identidad = req.params.cedula_de_identidad;   
    await eliminar_especialista(cedula_de_identidad);
    res.send('Su datos han sido eliminados');   
});

//actualizar datos de especialista
app.put('/actualizar_especialista/:cedula_de_identidad', async (req, res) => {      
    const { cedula_de_identidad, correo_especialista, credenciales} = req.body;
    // console.log(req.body)      
    await actualizar_especialista(correo_especialista, credenciales, cedula_de_identidad);    
    res.redirect('/lista_especialistas');   
})

//LISTA DE ESPECIALISTAS


app.get('/lista_especialistas', async(req, res) => {
    try {
        const especialistas = await muestra_lista_especialistas();
        // console.log(especialistas)   
        res.render('lista_especialistas', { especialistas });     
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        });        
    }
});

//ruta put que selecciona un especialista de la lista
app.put('/seleccion_especialista', async (req, res)=>{
    const { cedula_de_identidad } = req.body;
    // console.log(req.body)    
    try {
        const especialista = await trae_datos_especialista(cedula_de_identidad);
        // console.log(especialista)
        
        res.status(200).send(JSON.stringify(especialista));
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

//DATOS MASCOTA

// ruta get con datos de mascota
// app.get('/datos_mascota', async(req, res) => {
//     res.render('datos_mascota');
// })



//EN OBRA

//agregar ruta put para modificar datos mascota
//agregar ruta put para modificar antecedentes de salud
//agregar ruta delete para eliminar mascota y sus antecedentes
//agregar ruta get con notificacion de correos


