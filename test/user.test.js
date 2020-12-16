const request = require('supertest')
const app = require('../app')
const { User, Bayi, Perkembangan } = require('../models/index')
const { signToken } = require('../helpers/jwt')

const user = { username: "Maryam", password: "Maryammaryam", role: "Orang Tua" }
const user2 = { username: "Ani", password: "Aniani", role: "Petugas" }
const bayi = {
    nama: "Marni",
    tanggal_lahir: "12-12-20",
    jenis_kelamin: "Perempuan",
    lingkar_kepala: 32.7,
    tinggi: 47.3,
    berat_badan: 3.5
}

let bayiBaru = 0
let access_token = ''
let token = ''
let petugas = ''
let orangTua = ''

beforeAll((done) => {
    User.create(user)
        .then((data) => {
            const user = {
                id: data.id,
                username: data.username
            }
            access_token = signToken(user)
            orangTua = data
            return User.create(user2)
        })
        .then((data) => {
            const user2 = {
                id: data.id,
                username: data.username
            }
            petugas = data
            token = signToken(user2)
            return Bayi.create(bayi)
        })
        .then((data) => {
            bayiBaru = data

            return done()
        })
        .catch(err => {
            return done(err)
        })
})

afterAll((done) => {
    User.destroy({
        truncate: true
    })
        .then(_ => {
            return Bayi.destroy({
                truncate: true
            })
        })
        .then(_ => {
            return done()
        })
        .catch(err => {
            return done(err)
        })
})


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
                console.log(body)
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})