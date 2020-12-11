'use strict'
const { Bayi } = require('../models/index')

class BayiController {
  static async show(req, res, next) {
    try {
      const data = await Bayi.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      let params = {
        nama: req.body.name,
        tanggal_lahir: req.body.tanggal_lahir,
        lingkar_kepala: req.body.lingkar_kepala,
        tinggi: req.body.tinggi,
        berat_badan: req.body.berat_badan
      }
      const data = await Bayi.create(params)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}


module.exports = BayiController