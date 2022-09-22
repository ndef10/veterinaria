const bcrypt = require('bcryptjs');

const encripta_especialista = async (contrasena_especialista) => {
    const salt = await bcrypt.genSalt(10);
     return bcrypt.hash(contrasena_especialista, salt);   
}

const compara_especialista = async (contrasena_especialista, contrasena_encriptada) => {
    return await bcrypt.compare(contrasena_especialista, contrasena_encriptada)
}

module.exports = {
    encripta_especialista,
    compara_especialista

}  