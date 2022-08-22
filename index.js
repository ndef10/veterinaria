require('dotenv').config();
//console.log(process.env)
const express = require('express');

const app = express();

const { getDate } = require('./database');

//servidor
const puerto = process.env.PORT || 4000
app.listen(puerto, console.log('servidor en puerto:', puerto));


//routes
app.get('/', (req, res) => {
    res.send('Conectada');
})