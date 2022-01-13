const Album = require('../models/Album')
const {StatusCodes, NOT_FOUND} = require('http-status-codes')
const BadRequestError = require('../errors/BadRequest')
const NotFoundError = require('../errors/NotFound')

const createAlbum = async (req, res) => {
    const album = await Album.create(req.body)
    res.json({msg:'hello, u bout to create a new album', bod: album})
}

const filterAlbum = async (req, res) => {
    const {band, name, producer, sort, fields} = req.query
    const queryObject = {}

    if(band){
        queryObject.band = {$regex: band, $options: 'i'}
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if(producer){
        queryObject.producer = {$regex: producer, $options: 'i'}
    }

    let result = Album.find(queryObject)

    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }

    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const albums = await result

    res.status(StatusCodes.OK).json({
        successful: true,
        msg: `cantidad de resultados: ${albums.length}`,
        data: albums,
        count: albums.length
    })
}

const updateAlbum = async (req, res) => {
    //de-estructuracion del objeto request
    const {
        params: {id: AlbumID},
        body: {band, name, producer}
    } = req
    if(band==='' ||name==='' ||producer ===''){
        throw new BadRequestError('debe introducir todos los atributos del album')
    }
    const album = await Album.findOneAndUpdate({_id: AlbumID}, req.body, {
        new: true,
        runValidators:true
    })
    if(!album){
        throw new NotFoundError('El album no se encuentra en nuestro catalogo')
    }
    res.status(StatusCodes.OK).json({
        msg: "till the end ill knock u down",
        album: album
    })
}

const deleteAlbum = async (req, res) => {
    const {params: {id: AlbumID}} = req
    const album = await Album.findOneAndDelete({_id: AlbumID})
    if(!album) throw new NotFoundError('El album no se encuentra en nuestro catalogo')
    res.status(StatusCodes.OK).json({
        msg: "he pukes based shark",
        album: album
    })
}

module.exports = {
    createAlbum,
    filterAlbum,
    updateAlbum,
    deleteAlbum
}