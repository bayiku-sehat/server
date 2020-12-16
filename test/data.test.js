const request = require('supertest')
const app = require('../app')
const { LingkarKepala, BeratBadan, TinggiBadan } = require('../models/index')

describe("Test success CRUD Bayi", () => {
    it('Test success Get lingkar kepala', (done) => {
        request(app)
            .get('/lingkar-kepala')
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(200)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test success CRUD Bayi", () => {
    it('Test success Get tinggi badan', (done) => {
        request(app)
            .get('/tinggi')
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(200)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test success CRUD Bayi", () => {
    it('Test success Get berat badan', (done) => {
        request(app)
            .get('/berat-badan')
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(200)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})