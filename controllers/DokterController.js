'use strict'
const { Dokter } = require('../models/index')

class DokterController {
  static async show(req, res, next) {
    try {
      const data = await Dokter.findall({ include: ['Bayis'] })
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
        no_hp: req.body.no_hp,
        jenis_kelamin: req.body.jenis_kelamin,
        spesialisasi: req.body.spesialisasi,
        username: req.body.username,
        password: req.body.password
      }
      const data = await Dokter.create(params)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async editDokter(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        usia: req.body.usia,
        no_hp: req.body.no_hp,
        jenis_kelamin: req.body.jenis_kelamin,
        spesialisasi: req.body.spesialisasi,
        username: req.body.username,
        password: req.body.password
      }
      const data = await Dokter.update(params, {
        where: {
          id: req.params.Dokter_id
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteDokter(req, res, next) {
    try {
      const data = await Dokter.destroy({
        where: {
          id: req.params.Dokter_id
        }
      })
      res.status(200).json({ msg: "Dokter has been deleted" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DokterController
