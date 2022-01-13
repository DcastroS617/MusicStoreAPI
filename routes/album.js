const express = require('express')
const router = express.Router()



const {createAlbum, filterAlbum, updateAlbum, deleteAlbum} = require('../controllers/album')

router.route('/album').post(createAlbum).get(filterAlbum)
router.route('/album/:id').patch(updateAlbum).delete(deleteAlbum)
module.exports = router