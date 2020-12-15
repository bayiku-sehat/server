"use strict";
const BayiController = require("../controllers/BayiController");
const UserController = require("../controllers/UserController");
const PerkembanganController = require("../controllers/PerkembanganController");
const DataWHOController = require("../controllers/DataWHOController");
const authentication = require("../middlewares/auth");

const router = require("express").Router();

router.get("/lingkar-kepala", DataWHOController.lingkarKepala);
router.get("/tinggi", DataWHOController.tinggiBadan);
router.get("/berat-badan", DataWHOController.beratBadan);

router.post("/login", UserController.login);
router.get("/user/dokter", UserController.showDokter);
router.get("/user/orangtua", UserController.showOrangTua);
router.get("/user/petugas", UserController.showPerawat);
router.post("/user", UserController.add);
router.use(authentication);
router.get("/user-detail", UserController.showDetail);
router.put("/user/:userId", UserController.editUser);
router.delete("/user/:userId", UserController.deleteUser);
router.post("/user/bayi/:bayiId", UserController.userGetBayi);

router.get('/bayi', BayiController.show)
router.post('/bayi', BayiController.addBayi)
router.get('/bayi/:bayiId', BayiController.showDetail)
router.put('/bayi/:bayiId', BayiController.verifyBayi)
router.delete('/bayi/:bayiId', BayiController.deleteBayi)

router.post(
  "/bayi/:bayiId/perkembangan",
  PerkembanganController.addPerkembangan
)
router.delete('/bayi/perkembangan/:perkembanganId', PerkembanganController.deletePerkembangan)
router.post('/dokter/bayi/:bayiId/', PerkembanganController.addBayiToDokter)
router.delete('/dokter/bayi/:bayiId', PerkembanganController.deleteBayiInDokter)
module.exports = router
