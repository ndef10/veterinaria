require('dotenv').config();
//console.log(process.env)
const express = require('express');
// const exphbs = require('express-handlebars');
// const expressFileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const secretKey = process.env.SECRETKEY;
// const methodOverride = require('method-override');


const app = express();

const { getDate } = require('./database');

//servidor
const puerto = process.env.PORT || 4000
app.listen(puerto, console.log('servidor en puerto:', puerto));

// //Middlewares

// //recibe carga de imagenes
// app.use(bodyParser.urlencoded({ extended: false }));

// //permite usar PUT o DELETE en lugares donde el cliente no lo admite
// app.use(methodOverride('_method'))

// //recibir peilot de consultas put y post
// app.use(bodyParser.json());

// //contenido de carpeta public declarado como estatico
// app.use(express.static(__dirname + '/public'));

// //configuracion de FileUpload
// app.use(
//     expressFileUpload({
//         limits: { fileSize: 5000000 },
//         abortOnLimit: true,
//         responseOnLimit: 'El tamaño de la imagen supera el limite permitido',
//     })
// );

// //configuracion de css, que accedera directamente a carpeta de bootstrap descargado en node_modules
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// // Condiguracion handlebars
// app.engine(
//     'handlebars',
//     exphbs.engine({
//         defaultLayout: 'main',
//         layoutsDir: `${__dirname}/views/mainLayout`,
//     })
// );
// app.set('view engine', 'handlebars');

//routes
app.get('/', (req, res) => {
    res.send('Conectada!!');
})