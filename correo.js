const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {        
        user: process.env.NMUSER,
        pass: process.env.NMPASS,
    },
});

const send = async (datos) => {    
    console.log('llegaron los datos?')
    console.log(datos)
    const correo_especialista = datos.especialista.correo_especialista;
console.log(correo_especialista)
    const correo_tutor = datos.data.correo_tutor;
console.log(correo_tutor);
    const nombre_mascota = datos.mascota.nombre_mascota;
console.log(nombre_mascota)
const nombre_tutor = datos.data.nombre_tutor;
console.log(nombre_tutor);
    const nombre_especialista = datos.especialista.nombre_especialista;
console.log(nombre_especialista)
    const especie = datos.mascota.especie;
console.log(especie);
    const sintomas = datos.antecedentes.sintomas;
console.log(sintomas);
    const edad = datos.antecedentes.edad;
console.log(edad);
    const peso = datos.antecedentes.peso;
console.log(peso);
    const vacuna = datos.antecedentes.es_vacunado;
console.log(vacuna);
    const esterilizado = datos.antecedentes.es_esterilizado;
console.log(esterilizado);
    const operaciones = datos.antecedentes.operaciones_detalle;
console.log(operaciones);
    const adjunto = datos.antecedentes.img_estado_actual;
console.log(adjunto);


    let mailOptions = {
        from: [correo_tutor],                                                                   
        to: [correo_especialista],
        subject: `Consulta ${nombre_mascota}`,                                               
        html: `<h3>Hola Dr. ${nombre_especialista}!!<br>Mi nombre es ${nombre_tutor} y requiero orientación con la siguiente situación:<br> Tengo un ${especie} llamado ${nombre_mascota} que se encuentra con ${sintomas}.<br> Como antecedente, cabe destacar que tiene ${edad} años, pesa ${peso} kilos, ${vacuna} se encuentra vacunado y ${esterilizado} esta esterilizado. <br>Intervenciones quirurgicas (Opcional*): ${operaciones}.</h3><br><br>Adejunto fotografía de su estado actual.
        </h3>
        <div>                
            <img src="${adjunto}" height="55" Width="75">                
        </div>`,       
    };
    await transporter.sendMail(mailOptions)
};

module.exports = send;