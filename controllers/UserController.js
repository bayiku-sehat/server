"use strict";
const { compareHash } = require("../helpers/hash");
const { signToken } = require("../helpers/jwt");
const { User, Bayi, BayiUser } = require("../models/index");

class UserController {
  static async showDokter(req, res, next) {
    try {
      const data = await User.findAll({
        include: ["Bayis"],
        where: {
          role: "Dokter",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showOrangTua(req, res, next) {
    try {
      const data = await User.findAll({
        where: {
          role: "Orang Tua",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showPerawat(req, res, next) {
    try {
      const data = await User.findAll({
        where: {
          role: "Petugas",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
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
        role: req.body.role,
      };
      const data = await User.create(params);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    console.log("masuk edit User");
    try {
      let params = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        usia: req.body.usia,
        no_hp: req.body.no_hp,
        jenis_kelamin: req.body.jenis_kelamin,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };
      const data = await User.update(params, {
        where: {
          id: req.params.userId,
        },
        returning: true,
      });
      res.status(200).json(data[1][0]);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const deleteUser = await User.destroy({
        where: {
          id: req.params.userId,
        },
      });
      if (deleteUser == 1) {
        res.status(200).json({ msg: "data has been delete." });
      } else {
        res.status(404).json({ msg: "data not found." });
      }
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const account = {
        username: req.body.username,
        password: req.body.password,
      };
      if (account.username === "" || account.password === "") {
        throw {
          name: "Bad Request",
          message: "you should input something to the field",
          status: 400,
        };
      }
      const user = await User.findOne({
        where: {
          username: account.username,
        },
      });
      if (!user) {
        res.status(403).json({ message: "username dan password salah" });
      } else if (!compareHash(account.password, user.password)) {
        res.status(403).json({ message: "username dan password salah" });
      } else {
        const access_token = signToken({
          id: user.id,
          username: user.username,
          role: user.role,
        });
        res.status(200).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }
  static async showDetail(req, res, next) {
    console.log("masuk sini show detail, 137");
    res.status(200).json(req.userData);
  }
  static async userGetBayi(req, res, next) {
    console.log("masuk userGetBayi line 141");
    const bayiId = +req.params.bayiId;
    try {
      if (req.userData.role !== "Dokter") {
        throw {
          name: "Unauthorized",
          status: 401,
          message: "Anda tidak berhak menangani pasien.",
        };
      } else {
        const getBayi = await Bayi.findByPk(bayiId);
        const data = {
          BayiId: getBayi.id,
          UserId: req.userData.id,
        };
        const bayiUser = await BayiUser.create(data);
        res.status(201).json(bayiUser);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
