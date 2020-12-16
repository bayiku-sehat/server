'use strict'
const { Bayi, TinggiBadan, BeratBadan, LingkarKepala, Perkembangan, BayiUser } = require('../models/index')

class PerkembanganController {
  static async addPerkembangan(req, res, next) {
    try {
      const bayiId = req.params.bayiId
      const bayi = await Bayi.findByPk(bayiId)
      let updateBayi = {
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi,
        berat_badan: +req.body.berat_badan,
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
      if (updateBayi.tinggi < 0 || updateBayi.berat_badan < 0 || updateBayi.lingkar_kepala < 0) {
        throw (error)
      } else {
        if (updateBayi.tinggi < whoTinggiBadan.sd_1 && updateBayi.tinggi > whoTinggiBadan.sd_n1) {
          updateBayi.status_tinggi = 0
        } else if (updateBayi.tinggi >= whoTinggiBadan.sd_1 && updateBayi.tinggi < whoTinggiBadan.sd_2) {
          updateBayi.status_tinggi = 1
        } else if (updateBayi.tinggi >= whoTinggiBadan.sd_2 && updateBayi.tinggi < whoTinggiBadan.sd_3) {
          updateBayi.status_tinggi = 2
        } else if (updateBayi.tinggi >= whoTinggiBadan.sd_3) {
          updateBayi.status_tinggi = 3
        } else if (updateBayi.tinggi <= whoTinggiBadan.sd_n1 && updateBayi.tinggi > whoTinggiBadan.sd_n2) {
          updateBayi.status_tinggi = -1
        } else if (updateBayi.tinggi <= whoTinggiBadan.sd_n2 && updateBayi.tinggi >= whoTinggiBadan.sd_n3) {
          updateBayi.status_tinggi = -2
        } else if (updateBayi.tinggi < whoTinggiBadan.sd_n3 && updateBayi.tinggi > 0) {
          updateBayi.status_tinggi = -3
        }
        if (updateBayi.berat_badan < whoBeratBadan.sd_1 && updateBayi.berat_badan > whoBeratBadan.sd_n1) {
          updateBayi.status_berat_badan = 0
        } else if (updateBayi.berat_badan >= whoBeratBadan.sd_1 && updateBayi.berat_badan < whoBeratBadan.sd_2) {
          updateBayi.status_berat_badan = 1
        } else if (updateBayi.berat_badan >= whoBeratBadan.sd_2 && updateBayi.berat_badan < whoBeratBadan.sd_3) {
          updateBayi.status_berat_badan = 2
        } else if (updateBayi.berat_badan >= whoBeratBadan.sd_3) {
          updateBayi.status_berat_badan = 3
        } else if (updateBayi.berat_badan <= whoBeratBadan.sd_n1 && updateBayi.berat_badan > whoBeratBadan.sd_n2) {
          updateBayi.status_berat_badan = -1
        } else if (updateBayi.berat_badan <= whoBeratBadan.sd_n2 && updateBayi.berat_badan >= whoBeratBadan.sd_n3) {
          updateBayi.status_berat_badan = -2
        } else if (updateBayi.berat_badan < whoBeratBadan.sd_n3 && updateBayi.berat_badan > 0) {
          updateBayi.status_berat_badan = -3
        }
        if (updateBayi.lingkar_kepala < whoLingkarKepala.sd_1 && updateBayi.lingkar_kepala > whoLingkarKepala.sd_n1) {
          updateBayi.status_lingkar_kepala = 0
        } else if (updateBayi.lingkar_kepala >= whoLingkarKepala.sd_1 && updateBayi.lingkar_kepala < whoLingkarKepala.sd_2) {
          updateBayi.status_lingkar_kepala = 1
        } else if (updateBayi.lingkar_kepala >= whoLingkarKepala.sd_2 && updateBayi.lingkar_kepala < whoLingkarKepala.sd_3) {
          updateBayi.status_lingkar_kepala = 2
        } else if (updateBayi.lingkar_kepala >= whoLingkarKepala.sd_3) {
          updateBayi.status_lingkar_kepala = 3
        } else if (updateBayi.lingkar_kepala <= whoLingkarKepala.sd_n1 && updateBayi.lingkar_kepala > whoLingkarKepala.sd_n2) {
          updateBayi.status_lingkar_kepala = -1
        } else if (updateBayi.lingkar_kepala <= whoLingkarKepala.sd_n2 && updateBayi.lingkar_kepala >= whoLingkarKepala.sd_n3) {
          updateBayi.status_lingkar_kepala = -2
        } else if (updateBayi.lingkar_kepala < whoLingkarKepala.sd_n3 && updateBayi.lingkar_kepala > 0) {
          updateBayi.status_lingkar_kepala = -3
        }
      }
      if (updateBayi.status_berat_badan !== 0 || updateBayi.status_lingkar_kepala !== 0 || updateBayi.status_tinggi !== 0) {
        if (!bayi.status_kasus) {
          updateBayi.status_kasus = "Open"
        } else {
          updateBayi.status_kasus = "In Progress"
        }
      } else {
        if (!bayi.status_kasus) {
          updateBayi.status_kasus = ""
        } else {
          updateBayi.status_kasus = "Closed"
        }
      }
      const input = {
        lingkar_kepala: bayi.lingkar_kepala,
        berat_badan: bayi.berat_badan,
        tinggi: bayi.tinggi,
        tanggal_pemeriksaan: bayi.createdAt,
        status_lingkar_kepala: +bayi.status_lingkar_kepala,
        status_berat_badan: +bayi.status_berat_badan,
        status_tinggi: +bayi.status_tinggi,
        UserId: req.userData.id,
        BayiId: bayi.id
      }
      const data = await Perkembangan.create(input)
      const newData = await Bayi.update(updateBayi, {
        where: {
          id: bayiId
        },
        returning: true
      })
      res.status(201).json(newData[1][0])
    } catch (error) {
      next({ name: "negativeValue" })
    }
  }

  static async deletePerkembangan(req, res, next) {
    try {
      const deletePerkembangan = await Perkembangan.destroy({
        where: {
          id: req.params.perkembanganId,
        }
      })
      if (deletePerkembangan === 1) {
        res.status(200).json({ name: "Data perkembangan bayi telah dihapus." })
      } else {
        throw (error)
      }
    } catch (error) {
      next({ name: "notDataPerkembaganBayi" })
    }
  }
  static async addBayiToDokter(req, res, next) {
    try {
      const dokterId = req.userData.id
      const bayiId = req.params.bayiId
      const pasien = {
        BayiId: bayiId,
        UserId: dokterId
      }
      const data = await BayiUser.create(pasien)
      res.status(201).json(data)
    } catch (error) {
      next({ name: "BadRequestAddBayi" })
    }
  }
  static async deleteBayiInDokter(req, res, next) {
    try {
      const bayiId = req.params.bayiId
      const data = await BayiUser.destroy({
        where: {
          BayiId: bayiId,
        }
      })
      if (data === 1) {
        res.status(200).json({ msg: "Data bayi sudah dihapus." })
      } else if (data !== 1) {
        throw (error)
      }
    } catch (error) {
      next({ name: "notDataBayi" })
    }
  }
}

module.exports = PerkembanganController