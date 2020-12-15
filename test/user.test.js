const request = require('supertest')
const app = require('../app')
const { User, Bayi, Perkembangan } = require('../models/index')




describe("Test success CRUD User", () => {
    it('Test success Get dokter', (done) => {
        request(app)
            .get('/user/dokter')
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

describe("Test success CRUD User", () => {
    it('Test success Get orang tua', (done) => {
        request(app)
            .get('/user/orangtua')
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

describe("Test success CRUD User", () => {
    it('Test success Get petugas', (done) => {
        request(app)
            .get('/user/petugas')
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

describe("Test success CRUD User", () => {
    it('Test success login', (done) => {
        request(app)
            .post('/login')
            .send({
                username: "Maryam",
                password: "Maryammaryam"
            })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                console.log(body,">>>>>>>>>>>>>>")
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test success CRUD User", () => {
    it('Test login failed username', (done) => {
        request(app)
            .post('/login')
            .send({
                username: "Marya",
                password: "Maryammaryam"
            })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test success CRUD User", () => {
    it('Test login failed password', (done) => {
        request(app)
            .post('/login')
            .send({
                username: "Maryam",
                password: "Maryammarya"
            })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})