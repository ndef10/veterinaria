const bcrypt = require('bcryptjs');

const encripta = async (contrasena_tutor) => {
    const salt = await bcrypt.genSalt(10);
     return bcrypt.hash(contrasena_tutor, salt);   
}

const compara = async (contrasena_tutor, contrasena_encriptada) => {
    return await bcrypt.compare(contrasena_tutor, contrasena_encriptada)
}

module.exports = {
    encripta,
    compara

}  