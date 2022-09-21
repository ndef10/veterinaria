const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;


// genera token
const genera_token = async (tutor) => {
    return jwt.sign({        
        data: tutor
    },
    secretKey, {
        expiresIn: Math.floor(Date.now() / 1000) + 180
    })
}

//verifica token
const verifica_token = (token) => {
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
    genera_token,
    verifica_token

}