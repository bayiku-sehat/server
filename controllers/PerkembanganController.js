'use strict'
const {
  Bayi,
  TinggiBadan,
  BeratBadan,
  LingkarKepala,
  Perkembangan,
} = require('../models/index')
const user = require('../models/user')

class PerkembanganController {
  static async addPerkembangan(req, res, next) {
    console.log(req.body, '<<< req.body')
    console.log(req.params, '<<< req.params')
    try {
      const bayiId = req.params.bayiId
      const bayi = await Bayi.findByPk(bayiId)
      let updateBayi = {
        lingkar_kepala: +req.body.lingkar_kepala,
        tinggi: +req.body.tinggi_badan,
        berat_badan: +req.body.berat_badan,
      }
      const month = Math.round((new Date() - bayi.tanggal_lahir) / 2669599261)
      const whoTinggiBadan = await TinggiBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin,
        },
      })
      const whoBeratBadan = await BeratBadan.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin,
        },
      })
      const whoLingkarKepala = await LingkarKepala.findOne({
        where: {
          bulan: month,
          jenisKelamin: bayi.jenis_kelamin,
        },
      })
      if (
        updateBayi.tinggi < whoTinggiBadan.sd_1 &&
        updateBayi.tinggi > whoTinggiBadan.sd_n1
      ) {
        updateBayi.status_tinggi = 0
      } else if (
        updateBayi.tinggi >= whoTinggiBadan.sd_1 &&
        updateBayi.tinggi < whoTinggiBadan.sd_2
      ) {
        updateBayi.status_tinggi = 1
      } else if (
        updateBayi.tinggi >= whoTinggiBadan.sd_2 &&
        updateBayi.tinggi < whoTinggiBadan.sd_3
      ) {
        updateBayi.status_tinggi = 2
      } else if (updateBayi.tinggi >= whoTinggiBadan.sd_3) {
        updateBayi.status_tinggi = 3
      } else if (
        updateBayi.tinggi <= whoTinggiBadan.sd_n1 &&
        updateBayi.tinggi > whoTinggiBadan.sd_n2
      ) {
        updateBayi.status_tinggi = -1
      } else if (
        updateBayi.tinggi <= whoTinggiBadan.sd_n2 &&
        updateBayi.tinggi >= whoTinggiBadan.sd_n3
      ) {
        updateBayi.status_tinggi = -2
      } else if (updateBayi.tinggi < whoTinggiBadan.sd_n3) {
        updateBayi.status_tinggi = -3
      }
      if (
        updateBayi.berat_badan < whoBeratBadan.sd_1 &&
        updateBayi.berat_badan > whoBeratBadan.sd_n1
      ) {
        updateBayi.status_berat_badan = 0
      } else if (
        updateBayi.berat_badan >= whoBeratBadan.sd_1 &&
        updateBayi.berat_badan < whoBeratBadan.sd_2
      ) {
        updateBayi.status_berat_badan = 1
      } else if (
        updateBayi.berat_badan >= whoBeratBadan.sd_2 &&
        updateBayi.berat_badan < whoBeratBadan.sd_3
      ) {
        updateBayi.status_berat_badan = 2
      } else if (updateBayi.berat_badan >= whoBeratBadan.sd_3) {
        updateBayi.status_berat_badan = 3
      } else if (
        updateBayi.berat_badan <= whoBeratBadan.sd_n1 &&
        updateBayi.berat_badan > whoBeratBadan.sd_n2
      ) {
        updateBayi.status_berat_badan = -1
      } else if (
        updateBayi.berat_badan <= whoBeratBadan.sd_n2 &&
        updateBayi.berat_badan >= whoBeratBadan.sd_n3
      ) {
        updateBayi.status_berat_badan = -2
      } else if (updateBayi.berat_badan < whoBeratBadan.sd_n3) {
        updateBayi.status_berat_badan = -3
      }
      if (
        updateBayi.lingkar_kepala < whoLingkarKepala.sd_1 &&
        updateBayi.lingkar_kepala > whoLingkarKepala.sd_n1
      ) {
        updateBayi.status_lingkar_kepala = 0
      } else if (
        updateBayi.lingkar_kepala >= whoLingkarKepala.sd_1 &&
        updateBayi.lingkar_kepala < whoLingkarKepala.sd_2
      ) {
        updateBayi.status_lingkar_kepala = 1
      } else if (
        updateBayi.lingkar_kepala >= whoLingkarKepala.sd_2 &&
        updateBayi.lingkar_kepala < whoLingkarKepala.sd_3
      ) {
        updateBayi.status_lingkar_kepala = 2
      } else if (updateBayi.lingkar_kepala >= whoLingkarKepala.sd_3) {
        updateBayi.status_lingkar_kepala = 3
      } else if (
        updateBayi.lingkar_kepala <= whoLingkarKepala.sd_n1 &&
        updateBayi.lingkar_kepala > whoLingkarKepala.sd_n2
      ) {
        updateBayi.status_lingkar_kepala = -1
      } else if (
        updateBayi.lingkar_kepala <= whoLingkarKepala.sd_n2 &&
        updateBayi.lingkar_kepala >= whoLingkarKepala.sd_n3
      ) {
        updateBayi.status_lingkar_kepala = -2
      } else if (updateBayi.lingkar_kepala < whoLingkarKepala.sd_n3) {
        updateBayi.status_lingkar_kepala = -3
      }
      if (
        updateBayi.status_berat_badan !== 0 ||
        updateBayi.status_lingkar_kepala !== 0 ||
        updateBayi.status_tinggi !== 0
      ) {
        if (!bayi.status_kasus) {
          updateBayi.status_kasus = 'Open'
        } else {
          updateBayi.status_kasus = 'In Progress'
        }
      } else {
        if (!bayi.status_kasus) {
          updateBayi.status_kasus = ''
        } else {
          updateBayi.status_kasus = 'Closed'
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
        BayiId: bayi.id,
      }
      const data = await Perkembangan.create(input)
      const newData = await Bayi.update(updateBayi, {
        where: {
          id: bayiId,
        },
      })
      res.status(201).json(newData)
    } catch (error) {
      next(error)
    }
  }

  static async deletePerkembangan(req, res, next) {
    try {
      const deletePerkembangan = await Perkembangan.destroy({
        where: {
          id: req.params.perkembangan_id,
        },
      })
      if (deletePerkembangan === 1) {
        res.status(200).json({ name: 'Data perkembangan bayi telah dihapus.' })
      } else {
        res
          .status(400)
          .json({ message: 'Data perkembangan bayi tidak ditemukan.' })
      }
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
        DokterId: dokterId,
      }
      const data = await Pasien(pasien)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async deleteBayiInDokter(req, res, next) {
    try {
      const bayiId = req.updateBayi.bayi_id
      const data = await Pasien.destroy({
        where: {
          id: bayiId,
        },
      })
      res.status(200).json({ msg: 'Data perkembangan bayi sudah dihapus.' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PerkembanganController
