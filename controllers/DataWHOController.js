'use strict'
const { LingkarKepala, TinggiBadan, BeratBadan } = require('../models')

class DataWHOController {
    static async beratBadan(req, res, next) {
        try {
            const data = await BeratBadan.findAll()
                res.status(200).json(data)
        } catch (error) {
           res.status(400).status({msg: "Data lingkar kepala tidak ada."})
        }
    }
    static async tinggiBadan(req, res, next) {
        try {
            const data = await TinggiBadan.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async lingkarKepala(req, res, next) {
        try {
            const data = await LingkarKepala.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = DataWHOController