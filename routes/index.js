'use strict'
const BayiController = require('../controllers/BayiController')
const OrangTuaController = require('../controllers/OrangTuaController')
const PetugasController = require('../controllers/PetugasController')
const PerkembanganController = require('../controllers/PerkembanganController')
const DokterController = require('../controllers/DokterController')
const DataWHOController = require('../controllers/DataWHOController')

const router = require('express').Router()

router.get('/lingkar-kepala', DataWHOController.lingkarKepala)
router.get('/tinggi', DataWHOController.tinggiBadan)
router.get('/berat-badan', DataWHOController.beratBadan)

router.get('/bayi', BayiController.show)
router.get('/bayi/:bayi_id', BayiController.showDetail)
router.post('/bayi', BayiController.add)
router.put('/bayi/:bayi_id', BayiController.editBayi)
router.delete('/bayi/:bayi_id', BayiController.deleteBayi)

router.post('/bayi/:bayi_id/perkembangan', PerkembanganController.addPerkembangan)
router.put('/bayi/:bayi_id/perkembangan/:perkembangan_id', PerkembanganController.editPerkembangan)


router.get('/orangtua', OrangTuaController.show)
router.post('/orangtua', OrangTuaController.add)
router.put('/orangtua/:orangtua_id', OrangTuaController.editOrangtua)
router.delete('/orangtua/:orangtua_id', OrangTuaController.deleteOrangtua)

router.get('/petugas', PetugasController.show)
router.post('/petugas', PetugasController.add)
router.put('/petugas/:petugas_id', PetugasController.editPetugas)
router.delete('/petugas/:petugas_id', PetugasController.deletePetugas)

router.get('/dokter', DokterController.show)
router.post('/dokter', DokterController.add)
router.put('/dokter/:dokter_id', DokterController.editDokter)
router.delete('/dokter/:dokter_id', DokterController.deleteDokter)
router.post('/dokter/bayi/:bayi_id', DokterController.addBayiToDokter)
router.delete('/dokter/bayi/:bayi_id', DokterController.deleteBayiInDokter)


module.exports = router