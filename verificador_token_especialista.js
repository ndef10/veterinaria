const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;


// genera token
const genera_token_especialista = async (especialista) => {
    return jwt.sign({        
        data: especialista
    },
    secretKey, {
        expiresIn: Math.floor(Date.now() / 1000) + 180
    })
}

//verifica token
const verifica_token_especialista = (token) => {
    let datos;
    jwt.verify(token, secretKey, function(error, decoded) {
        if (error) {
                    return res.status(403).json({ message: 'token invalido'});        
        } else {
            datos = decoded;
        }
    });    
    return datos;
}

module.exports = {
    genera_token_especialista,
    verifica_token_especialista

}