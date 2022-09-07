require('dotenv').config();
console.log(process.env)
const express = require('express');
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//base de datos
const { nuevo_usuario} = require('./database');

//servidor
const puerto = process.env.PORT || 4000
app.listen(puerto, console.log('servidor en puerto:', puerto));

//Middlewares

//recibe carga de imagenes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));

//sesiones
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//mensajes  bonitos al usuario
app.use(flash());

//variable global para flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();

})

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
    console.log(req.body);
    
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('no se encontro ningun archivo en la consulta');
    }  
    const {files}=req
    const { foto }= files;
    const{name}= foto;    
    const foto_tutor = (`http://localhost:`+ puerto +`/uploads/${name}`);
    //falta cifrar contrasena antes de guardar en la base de datos y validar    
    try {
        const usuario = await nuevo_usuario( nombre_tutor, cedula_de_identidad, telefono, correo_tutor, contrasena_tutor, perfil, foto_tutor, estado );
        foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
            if (err) return res.status(500).send({
                error: `algo salio mal... ${err}`,
                code: 500
            })
            res.redirect('/inicio_sesion');            
        })       
           
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal...${e}`,
            code: 500
        })       
    }           
}) 
