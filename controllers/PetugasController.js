'use strict'
const { Petugas } = require('../models/index')

class PetugasController {
  static async show(req, res, next) {
    try {
      const data = await Petugas.findAll({ include: ['Bayis'] })
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
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }
      const data = await Petugas.create(params)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async editPetugas(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        usia: req.body.usia,
        no_hp: req.body.no_hp,
        jenis_kelamin: req.body.jenis_kelamin,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }
      const data = await Petugas.update(params, {
        where: {
          id: req.params.petugas_id
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async deletePetugas(req, res, next) {
    try {
      const deletePetugas = await Petugas.destroy({
        where: {
          id: req.params.petugas_id
        }
      })
      res.status(200).json({ name: "data orangtua has been delete." })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PetugasController
