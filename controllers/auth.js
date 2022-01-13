const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/BadRequest')
const UnauthorizedError = require('../errors/Unauthorized')

const login = async (req, res) => {
    const {email, contrasena} = req.body
    if(!email || !contrasena){
        throw new BadRequestError('Debes introducir tu email y contraseña para continuar...')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthorizedError('credenciales invalidas')
    }
    const compareContrasena = await user.CompareContrasena(contrasena)
    if(!compareContrasena){
        throw new UnauthorizedError('credenciales invalidas')
    }
    const token = user.CreateJWT()
    res.status(StatusCodes.OK).json({msg:'Inicio de sesion exitoso', token: token})
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    const token = user.CreateJWT()
    res.status(StatusCodes.CREATED).json({msg: 'register controller', body: user, token: token})
}

module.exports = {
    login, 
    register
}