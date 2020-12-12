'use strict'
const { Bayi, TinggiBadan, BeratBadan, LingkarKepala, Perkembangan } = require('../models/index')

class PerkembanganController {
  static async addPerkembangan(req, res, next) {
    try {
      const bayiId = req.params.bayi_id
      const bayi = await Bayi.findByPk(bayiId)
      let params = {
        catatan: req.body.catatan,
        tanggal_pemeriksaan: new Date(),
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi_badan,
        berat_badan: +req.body.berat_badan,
        Bayi_id: bayi.id
      }
      const month = Math.round((new Date() - bayi.tanggal_lahir) / 2669599261)
      const whoTinggiBadan = await TinggiBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      const whoBeratBadan = await BeratBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      const whoLingkarKepala = await LingkarKepala.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      if (params.tinggi < whoTinggiBadan.sd_1 && params.tinggi > whoTinggiBadan.sd_n1) {
        params.status = 'Tinggi Normal, '
      } else if (params.tinggi >= whoTinggiBadan.sd_1 && params.tinggi < whoTinggiBadan.sd_2) {
        params.status = 'Ketinggian dikit, '
      } else if (params.tinggi >= whoTinggiBadan.sd_2 && params.tinggi < whoTinggiBadan.sd_3) {
        params.status = 'Ketinggian berlebih, '
      } else if (params.tinggi >= whoTinggiBadan.sd_3) {
        params.status = 'Ketinggian berlebih sekali, '
      } else if (params.tinggi <= whoTinggiBadan.sd_n1 && params.tinggi > whoTinggiBadan.sd_n2) {
        params.status = 'Ketinggian kurang dikit, '
      } else if (params.tinggi <= whoTinggiBadan.sd_n2 && params.tinggi >= whoTinggiBadan.sd_n3) {
        params.status = 'Ketinggian  kurang, '
      } else if (params.tinggi < whoTinggiBadan.sd_n3) {
        params.status = 'Ketinggian kurang sekali, '
      }
      if (params.berat_badan < whoBeratBadan.sd_1 && params.berat_badan > whoBeratBadan.sd_n1) {
        params.status += 'Berat Normal, '
      } else if (params.berat_badan >= whoBeratBadan.sd_1 && params.berat_badan < whoBeratBadan.sd_2) {
        params.status += 'Berat berlebih dikit, '
      } else if (params.berat_badan >= whoBeratBadan.sd_2 && params.berat_badan < whoBeratBadan.sd_3) {
        params.status += 'Berat berlebih, '
      } else if (params.berat_badan >= whoBeratBadan.sd_3) {
        params.status += 'Berat berlebih sekali, '
      } else if (params.berat_badan <= whoBeratBadan.sd_n1 && params.berat_badan > whoBeratBadan.sd_n2) {
        params.status += 'Berat kurang dikit, '
      } else if (params.berat_badan <= whoBeratBadan.sd_n2 && params.berat_badan >= whoBeratBadan.sd_n3) {
        params.status += 'Berat kurang, '
      } else if (params.berat_badan < whoBeratBadan.sd_n3) {
        params.status += 'Berat kurang sekali, '
      }
      if (params.lingkar_kepala < whoLingkarKepala.sd_1 && params.lingkar_kepala > whoLingkarKepala.sd_n1) {
        params.status += 'Lingkar kepala Normal.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_1 && params.lingkar_kepala < whoLingkarKepala.sd_2) {
        params.status += 'Lingkar kepala berlebih dikit.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_2 && params.lingkar_kepala < whoLingkarKepala.sd_3) {
        params.status += 'Lingkar kepala berlebih.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_3) {
        params.status += 'Lingkar kepala berlebih sekali.'
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n1 && params.lingkar_kepala > whoLingkarKepala.sd_n2) {
        params.status += 'Lingkar kepala kurang dikit.'
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n2 && params.lingkar_kepala >= whoLingkarKepala.sd_n3) {
        params.status += 'Lingkar kepala kurang.'
      } else if (params.lingkar_kepala < whoLingkarKepala.sd_n3) {
        params.status += 'Lingkar kepala kurang sekali.'
      }
      const data = await Perkembangan.create(params)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async editPerkembangan(req, res, next) {
    try {
      const bayiId = req.params.bayi_id
      const bayi = await Bayi.findByPk(bayiId)
      let params = {
        catatan: req.body.catatan,
        tanggal_pemeriksaan: new Date(),
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi_badan,
        berat_badan: +req.body.berat_badan,
        Bayi_id: bayi.id
      }
      const month = Math.round((new Date() - bayi.tanggal_lahir) / 2669599261)
      const whoTinggiBadan = await TinggiBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      const whoBeratBadan = await BeratBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      const whoLingkarKepala = await LingkarKepala.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin
        }
      })
      if (params.tinggi < whoTinggiBadan.sd_1 && params.tinggi > whoTinggiBadan.sd_n1) {
        params.status = 'Tinggi Normal, '
      } else if (params.tinggi >= whoTinggiBadan.sd_1 && params.tinggi < whoTinggiBadan.sd_2) {
        params.status = 'Ketinggian dikit, '
      } else if (params.tinggi >= whoTinggiBadan.sd_2 && params.tinggi < whoTinggiBadan.sd_3) {
        params.status = 'Ketinggian berlebih, '
      } else if (params.tinggi >= whoTinggiBadan.sd_3) {
        params.status = 'Ketinggian berlebih sekali, '
      } else if (params.tinggi <= whoTinggiBadan.sd_n1 && params.tinggi > whoTinggiBadan.sd_n2) {
        params.status = 'Ketinggian kurang dikit, '
      } else if (params.tinggi <= whoTinggiBadan.sd_n2 && params.tinggi >= whoTinggiBadan.sd_n3) {
        params.status = 'Ketinggian  kurang, '
      } else if (params.tinggi < whoTinggiBadan.sd_n3) {
        params.status = 'Ketinggian kurang sekali, '
      }
      if (params.berat_badan < whoBeratBadan.sd_1 && params.berat_badan > whoBeratBadan.sd_n1) {
        params.status += 'Berat Normal, '
      } else if (params.berat_badan >= whoBeratBadan.sd_1 && params.berat_badan < whoBeratBadan.sd_2) {
        params.status += 'Berat berlebih dikit, '
      } else if (params.berat_badan >= whoBeratBadan.sd_2 && params.berat_badan < whoBeratBadan.sd_3) {
        params.status += 'Berat berlebih, '
      } else if (params.berat_badan >= whoBeratBadan.sd_3) {
        params.status += 'Berat berlebih sekali, '
      } else if (params.berat_badan <= whoBeratBadan.sd_n1 && params.berat_badan > whoBeratBadan.sd_n2) {
        params.status += 'Berat kurang dikit, '
      } else if (params.berat_badan <= whoBeratBadan.sd_n2 && params.berat_badan >= whoBeratBadan.sd_n3) {
        params.status += 'Berat kurang, '
      } else if (params.berat_badan < whoBeratBadan.sd_n3) {
        params.status += 'Berat kurang sekali, '
      }
      if (params.lingkar_kepala < whoLingkarKepala.sd_1 && params.lingkar_kepala > whoLingkarKepala.sd_n1) {
        params.status += 'Lingkar kepala Normal.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_1 && params.lingkar_kepala < whoLingkarKepala.sd_2) {
        params.status += 'Lingkar kepala berlebih dikit.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_2 && params.lingkar_kepala < whoLingkarKepala.sd_3) {
        params.status += 'Lingkar kepala berlebih.'
      } else if (params.lingkar_kepala >= whoLingkarKepala.sd_3) {
        params.status += 'Lingkar kepala berlebih sekali.'
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n1 && params.lingkar_kepala > whoLingkarKepala.sd_n2) {
        params.status += 'Lingkar kepala kurang dikit.'
      } else if (params.lingkar_kepala <= whoLingkarKepala.sd_n2 && params.lingkar_kepala >= whoLingkarKepala.sd_n3) {
        params.status += 'Lingkar kepala kurang.'
      } else if (params.lingkar_kepala < whoLingkarKepala.sd_n3) {
        params.status += 'Lingkar kepala kurang sekali.'
      }
      const data = await Perkembangan.update(params, {
        where: {
          id: req.params.perkembangan_id
        },
        returning: true
      })
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deletePerkembangan(req, res, next) {
    try {
      const deletePerkembangan = await Perkembangan.destroy({
        where: {
          id: req.params.perkembangan_id
        }
      })
      if (deletePerkembangan === 1) {
        res.status(200).json({ name: "Data perkembangan bayi telah dihapus." })
      } else {
        res.status(400).json({ message: "Data perkembangan bayi tidak ditemukan." })
      }
    } catch (error) {
      next(error)
    }
  }
}


module.exports = PerkembanganController