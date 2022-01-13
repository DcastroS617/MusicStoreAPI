require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'necesitamos tu nombre para registrarte'],
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "porfavor introduce tu correo electronico"],
        //regex para verificar si el correo es igual a lo esperado por
        //el server
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'porfavor introduce tu contraseña'],
        minlength: 8
    }
})

UserSchema.pre('save', async function(next){
    const saltPass = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, saltPass)
    next()
})

UserSchema.methods.CreateJWT = function(){
    return jwt.sign({UserID: this._id, Email: this.email}, process.env.JWT_SECRET, {
        expiresIn:'1d'
    })
}

UserSchema.methods.CompareContrasena = async function(contrasena){
    const validacion = await  bcrypt.compare(contrasena, this.password)
    return validacion
}
module.exports = mongoose.model('User', UserSchema)