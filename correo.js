const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {        
        user: process.env.NMUSER,
        pass: process.env.NMPASS,
    },
});

const send = async (datos) => {    
    const correo_especialista = datos.especialista.correo_especialista;
    const correo_tutor = datos.data.correo_tutor;
    const nombre_mascota = datos.mascota.nombre_mascota;
    const nombre_tutor = datos.data.nombre_tutor;
    const nombre_especialista = datos.especialista.nombre_especialista;
    const especie = datos.mascota.especie;
    const sintomas = datos.antecedentes.sintomas;
    const edad = datos.antecedentes.edad;
    const peso = datos.antecedentes.peso;
    
    const vacuna = datos.antecedentes.es_vacunado;
    if (vacuna === true) {
        vac = 'está';
    } else if (vacuna === false) {
        vac = 'no está';
    };

    const esterilizado = datos.antecedentes.es_esterilizado;
    if (esterilizado === true) {
        est = 'está';
    } else if (esterilizado === false) {
        est = 'no está';
    };

    const operaciones = datos.antecedentes.operaciones_detalle;
    const adjunto = datos.antecedentes.img_estado_actual;

    let mailOptions = {
        from: [correo_tutor],                                                                   
        to: [correo_especialista],
        subject: `Consulta ${nombre_mascota}`,                                               
        html: `<h3>Hola Dr. ${nombre_especialista}!!<br><br>Mi nombre es ${nombre_tutor} y requiero orientación con la siguiente situación:<br> Tengo un(a) ${especie} llamado(a) ${nombre_mascota} que se encuentra con el siguiente sintoma:<br><br> ${sintomas}.<br><br> Como antecedente, cabe destacar que tiene ${edad} año(s), pesa ${peso} kilo(s), ${vac} vacunado(a) y ${est} esterilizado(a). <br>Intervenciones quirurgicas (Opcional*): ${operaciones}.</h3><br><p>Adjunto fotografía de su estado actual.</p>     

        <p>Quedo atento(a) a su respuesta</p><br>
        ${nombre_tutor}`, 
        attachments: [            
            {                
                path: `${adjunto}`,
            }
        ],      
    };
    await transporter.sendMail(mailOptions)
    
    console.log(`Estimado ${nombre_tutor} su correo ha sido enviado`)
    res.send(`Estimado ${nombre_tutor}  su correo ha sido enviado`)
    
};

module.exports = send;