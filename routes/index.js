'use strict'

const BayiController = require('../controllers/BayiController')
const OrangTuaController = require('../controllers/OrangTuaController')
const PetugasController = require('../controllers/PetugasController')
const PerkembanganController = require('../controllers/PerkembanganController')

const router = require('express').Router()

router.get('/bayi', BayiController.show)
router.get('/bayi/:bayi_id', BayiController.showDetail)
router.post('/bayi', BayiController.add)
router.put('/bayi/:bayi_id', BayiController.editBayi)
router.delete('/bayi/:bayi_id', BayiController.deleteBayi)

router.post('/bayi/:bayi_id/perkembangan', PerkembanganController.addPerkembangan)
router.post('/bayi/:bayi_id/perkembangan/:perkembangan_id', PerkembanganController.editPerkembangan)


router.get('/orangtua', OrangTuaController.show)
router.post('/orangtua', OrangTuaController.add)
router.put('/orangtua/:orangtua_id', OrangTuaController.editOrangtua)
router.delete('/orangtua/:orangtua_id', OrangTuaController.deleteOrangtua)

router.get('/petugas', PetugasController.show)
router.post('/petugas', PetugasController.add)
router.put('/petugas/:petugas_id', PetugasController.editPetugas)
router.delete('/petugas/:petugas_id', PetugasController.deletePetugas)


module.exports = router