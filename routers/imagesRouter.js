const router = require('express').Router()
const imagesCtrl = require('../controllers/imagesCtrl')
const authKey = require('../middlewares/authKey')

router.post('/add', imagesCtrl.addImage)
router.delete('/delete/:name', imagesCtrl.deleteImage)
router.patch('/update/:name', imagesCtrl.updateStatusImage)
router.get('/list_image_error', imagesCtrl.getListImagesError)
router.get('/list_image', imagesCtrl.getListImages)

module.exports = router
