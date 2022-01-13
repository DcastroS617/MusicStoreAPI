const mongoose = require('mongoose')
const AlbumSchema = new mongoose.Schema({
    band: {
        type: String,
        required: [true, 'introduce el nombre de la banda'],
        maxlength: 50
    },
    name: {
        type: String,
        required: [true, 'introduce el nombre del album'],
        maxlength: 90
    },
    producer: {
        type: String,
        required: [true, 'introduce el nombre del productor']
    }
})

module.exports = mongoose.model('Album', AlbumSchema)