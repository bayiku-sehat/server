'use strict'
const { Orangtua_Wali } = require('../models/index')

class OrangTuaController {
  static async show(req, res, next) {
    try {
      const data = await Orangtua_Wali.findAll({ include: ['Bayis'] })
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
        password: req.body.password
      }
      const data = await Orangtua_Wali.create(params)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async editOrangtua(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        usia: req.body.usia,
        no_hp: req.body.no_hp, jenis_kelamin: req.body.jenis_kelamin,
        username: req.body.username,
        password: req.body.password
      }
      const data = await Orangtua_Wali.update(params, {
        where: {
          id: req.params.orangtua_id
        },
        returning: true
      })
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }
  static async deleteOrangtua(req, res, next) {
    try {
      const deleteOrangtua = await Orangtua_Wali.destroy({
        where: {
          id: req.params.orangtua_id
        }
      })
      if (deleteOrangtua === 1) {
        res.status(200).json({ message: "data orang tua/wali telah dihapus." })
      } else {
        res.status(400).json({ message: "data orang tua/wali tidak ditemukan." })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrangTuaController