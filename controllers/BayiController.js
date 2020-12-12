'use strict'
const { Bayi, TinggiBadan, BeratBadan, LingkarKepala } = require('../models/index')

class BayiController {
  static async show(req, res, next) {
    try {
      const data = await Bayi.findAll({ include: ['Orangtua_Wali', "Dokters"] })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async showDetail(req, res, next) {
    try {
      const data = await Bayi.findOne({
        where: {
          id: req.params.bayi_id
        },
        include: ['Orangtua_Wali', 'Perkembangans']
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async add(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        tanggal_lahir: new Date(req.body.tanggal_lahir),
        jenis_kelamin: req.body.jenis_kelamin,
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi_badan,
        berat_badan: +req.body.berat_badan,
        catatan: req.body.catatan,
        Dokter_id: 1,
        Petugas_id: 1,
        OrangTua_Wali_id: 1
      }
      const month = Math.round((new Date() - params.tanggal_lahir) / 2669599261)
      const whoTinggiBadan = await TinggiBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      const whoBeratBadan = await BeratBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      const whoLingkarKepala = await LingkarKepala.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      if (params.tinggi < whoTinggiBadan.sd_1 && params.tinggi > whoTinggiBadan.sd_n1) {
        params.status_tinggi = 0
      } else if (params.tinggi >= whoTinggiBadan.sd_1 && params.tinggi < whoTinggiBadan.sd_2) {
        params.status_tinggi = 1
      } else if (params.tinggi >= whoTinggiBadan.sd_2 && params.tinggi < whoTinggiBadan.sd_3) {
        params.status_tinggi = 2
      } else if (params.tinggi >= whoTinggiBadan.sd_3) {
        params.status_tinggi = 3
      } else if (params.tinggi <= whoTinggiBadan.sd_n1 && params.tinggi > whoTinggiBadan.sd_n2) {
        params.status_tinggi = -1
      } else if (params.tinggi <= whoTinggiBadan.sd_n2 && params.tinggi >= whoTinggiBadan.sd_n3) {
        params.status_tinggi = -2
      } else if (params.tinggi < whoTinggiBadan.sd_n3) {
        params.status_tinggi = -3
      }
      if (params.berat_badan < whoBeratBadan.sd_1 && params.berat_badan > whoBeratBadan.sd_n1) {
        params.status_berat_badan = 0
      } else if (params.berat_badan >= whoBeratBadan.sd_1 && params.berat_badan < whoBeratBadan.sd_2) {
        params.status_berat_badan = 1
      } else if (params.berat_badan >= whoBeratBadan.sd_2 && params.berat_badan < whoBeratBadan.sd_3) {
        params.status_berat_badan = 2
      } else if (params.berat_badan >= whoBeratBadan.sd_3) {
        params.status_berat_badan = 3
      } else if (params.berat_badan <= whoBeratBadan.sd_n1 && params.berat_badan > whoBeratBadan.sd_n2) {
        params.status_berat_badan = -1
      } else if (params.berat_badan <= whoBeratBadan.sd_n2 && params.berat_badan >= whoBeratBadan.sd_n3) {
        params.status_berat_badan = -2
      } else if (params.berat_badan < whoBeratBadan.sd_n3) {
        params.status_berat_badan = -3
      }
      if (params.lingkar_kepala < whoLingkarKepala.sd_1 && params.lingkar_kepala > whoLingkarKepala.sd_n1) {
        params.status_lingkar_kepala = 0
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_1 && params.lingkar_kepala < whoLingkarKepala.sd_2) {
        params.status_lingkar_kepala = 1
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_2 && params.lingkar_kepala < whoLingkarKepala.sd_3) {
        params.status_lingkar_kepala = 2
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_3) {
        params.status_lingkar_kepala = 3
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n1 && params.lingkar_kepala > whoLingkarKepala.sd_n2) {
        params.status_lingkar_kepala = -1
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n2 && params.lingkar_kepala >= whoLingkarKepala.sd_n3) {
        params.status_lingkar_kepala = -2
      } else if (params.lingkar_kepala < whoLingkarKepala.sd_n3) {
        params.status_lingkar_kepala = -3
      }
      const data = await Bayi.create(params)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async editBayi(req, res, next) {
    try {
      let params = {
        nama: req.body.nama,
        tanggal_lahir: new Date(req.body.tanggal_lahir),
        jenis_kelamin: req.body.jenis_kelamin,
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi_badan,
        berat_badan: +req.body.berat_badan,
        catatan: req.body.catatan,
        Dokter_id: 1,
        Petugas_id: 1,
        OrangTua_Wali_id: req.body.OrangTua_Wali_id
      }
      const month = Math.round((new Date() - params.tanggal_lahir) / 2669599261)
      const whoTinggiBadan = await TinggiBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      const whoBeratBadan = await BeratBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      const whoLingkarKepala = await LingkarKepala.findOne({
        where: {
          bulan: month,
          jenisKelamin: params.jenis_kelamin
        }
      })
      if (params.tinggi < whoTinggiBadan.sd_1 && params.tinggi > whoTinggiBadan.sd_n1) {
        params.status_tinggi = 0
      } else if (params.tinggi >= whoTinggiBadan.sd_1 && params.tinggi < whoTinggiBadan.sd_2) {
        params.status_tinggi = 1
      } else if (params.tinggi >= whoTinggiBadan.sd_2 && params.tinggi < whoTinggiBadan.sd_3) {
        params.status_tinggi = 2
      } else if (params.tinggi >= whoTinggiBadan.sd_3) {
        params.status_tinggi = 3
      } else if (params.tinggi <= whoTinggiBadan.sd_n1 && params.tinggi > whoTinggiBadan.sd_n2) {
        params.status_tinggi = -1
      } else if (params.tinggi <= whoTinggiBadan.sd_n2 && params.tinggi >= whoTinggiBadan.sd_n3) {
        params.status_tinggi = -2
      } else if (params.tinggi < whoTinggiBadan.sd_n3) {
        params.status_tinggi = -3
      }
      if (params.berat_badan < whoBeratBadan.sd_1 && params.berat_badan > whoBeratBadan.sd_n1) {
        params.status_berat_badan = 0
      } else if (params.berat_badan >= whoBeratBadan.sd_1 && params.berat_badan < whoBeratBadan.sd_2) {
        params.status_berat_badan = 1
      } else if (params.berat_badan >= whoBeratBadan.sd_2 && params.berat_badan < whoBeratBadan.sd_3) {
        params.status_berat_badan = 2
      } else if (params.berat_badan >= whoBeratBadan.sd_3) {
        params.status_berat_badan = 3
      } else if (params.berat_badan <= whoBeratBadan.sd_n1 && params.berat_badan > whoBeratBadan.sd_n2) {
        params.status_berat_badan = -1
      } else if (params.berat_badan <= whoBeratBadan.sd_n2 && params.berat_badan >= whoBeratBadan.sd_n3) {
        params.status_berat_badan = -2
      } else if (params.berat_badan < whoBeratBadan.sd_n3) {
        params.status_berat_badan = -3
      }
      if (params.lingkar_kepala < whoLingkarKepala.sd_1 && params.lingkar_kepala > whoLingkarKepala.sd_n1) {
        params.status_lingkar_kepala = 0
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_1 && params.lingkar_kepala < whoLingkarKepala.sd_2) {
        params.status_lingkar_kepala = 1
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_2 && params.lingkar_kepala < whoLingkarKepala.sd_3) {
        params.status_lingkar_kepala = 2
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_3) {
        params.status_lingkar_kepala = 3
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n1 && params.lingkar_kepala > whoLingkarKepala.sd_n2) {
        params.status_lingkar_kepala = -1
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n2 && params.lingkar_kepala >= whoLingkarKepala.sd_n3) {
        params.status_lingkar_kepala = -2
      } else if (params.lingkar_kepala < whoLingkarKepala.sd_n3) {
        params.status_lingkar_kepala = -3
      }
      const data = await Bayi.update(params, {
        where: {
          id: req.params.bayi_id
        },
        returning: true
      })
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }
  static async deleteBayi(req, res, next) {
    try {
      const deleteBayi = await Bayi.destroy({
        where: {
          id: req.params.bayi_id
        }
      })
      if (deleteBayi === 1) {
        res.status(200).json({ message: "data bayi sudah dihapus." })
      } else {
        res.status(400).json({ message: "data bayi tidak ditemukan." })
      }
    } catch (error) {
      next(error)
    }
  }

}


module.exports = BayiController