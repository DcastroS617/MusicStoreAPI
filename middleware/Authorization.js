const jwt = require('jsonwebtoken')
const User = require('../models/User')

const UnauthorizedError = require('../errors/Unauthorized')

const auth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer')){
        throw new UnauthorizedError('La autenticacion de usuario a sido erronea, porfavor inicia sesion o registrate para continuar')
    }
    const token = authorizationHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = {UserID: payload.UserID, Email: payload.Email}
        next()
    } catch (error) {
        throw new UnauthorizedError('La autenticacion de usuario a sido erronea, porfavor inicia sesion o registrate para continuar')
    }
}

module.exports = auth