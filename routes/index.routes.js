const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('crear');
})

router.get('/inicio', (req, res) => {
    res.render('inicio');
})

router.get('/perfil-tutor', (req, res) => {
    res.render('perfil-tutor');
})

router.get('/reg-mascota', (req, res) => {
    res.render('reg-mascota');
})

router.get('/antecedentes', (req, res) => {
    res.render('antecedentes');
})

router.get('/datos-tutor', (req, res) => {
    res.render('datos-tutor');
})

router.get('/datos-mascota', (req, res) => {
    res.render('datos-mascota');
})

router.get('/perfil-especialista', (req, res) => {
    res.render('perfil-especialista');
})

router.get('/datos-especialista', (req, res) => {
    res.render('datos-especialista');
})

router.get('/autorizacion-tutores', (req, res) => {
    res.render('autorizacion-tutores');
})

router.get('/autorizacion-especialistas', (req, res) => {
    res.render('autorizacion-especialistas');
})

router.get('/lista-especialistas', (req, res) => {
    res.render('lista-especialistas');
})

router.get('/contacto', (req, res) => {
    res.render('contacto');
})

module.exports = router;