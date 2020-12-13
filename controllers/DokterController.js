'use strict'
const { Dokter, Pasien } = require('../models/index')

class DokterController {
  static async show(req, res, next) {
    try {
      const data = await Dokter.findAll({ include: ['Bayis'] })
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
        Bayi_id: req.body.Bayi_id,
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
        Bayi_id: req.body.Bayi_id,
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

  static async addBayiToDokter(req, res, next) {
    try {
      const dokterId = 1
      const bayiId = req.params.bayi_id
      const pasien = {
        Bayi_id: bayiId,
        status: req.body.status,
        DokterId: dokterId
      }
      const data = await Pasien(pasien)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async deleteBayiInDokter(req, res, next) {
    try {
      const bayiId = req.params.bayi_id
      const data = await Pasien.destroy({
        where: {
          id: bayiId
        }
      })
      res.status(200).json({ msg: "data pasien sudah dihapus" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DokterController
