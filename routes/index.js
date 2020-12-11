'use strict'

const BayiController = require('../controllers/BayiController')
const OrangTuaController = require('../controllers/OrangTuaController')

const router = require('express').Router()

router.get('/bayi', BayiController.show)
router.post('/bayi', BayiController.add)

router.get('/orangtua', OrangTuaController.show)
router.post('/orangtua', OrangTuaController.add)

module.exports = router