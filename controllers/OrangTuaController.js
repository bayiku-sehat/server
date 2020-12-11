'use strict'

const { Orangtua_Wali } = require('../models/index')

class OrangTuaController {
  static async show(req, res, next) {
    try {
      const data = await Orangtua_Wali.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        usia: req.body.usia,
        no_hp: req.body.no_hp
      }
      const data = await Orangtua_Wali.create(params)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = OrangTuaController