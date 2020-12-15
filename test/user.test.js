const request = require('supertest')
const app = require('../app')
const { User, Bayi } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { makeHash } = require('../helpers/hash')

let user = { username: "maryam", password: "Maryammaryam", role: "Orang Tua" }
let user2 = { username: "ani", password: "Aniani", role: "Petugas" }
const bayi = {
    nama: "Marni",
    tanggal_lahir: "12-12-20",
    jenis_kelamin: "Perempuan",
    lingkar_kepala: 32.7,
    tinggi: 47.3,
    berat_badan: 3.5
}
let userBaru = {
    username: user.username,
    password: makeHash(user.password),
    role: user.role
}
let bayiBaru = 0
let access_token = ''
let token = '';
let petugas = '';
let orangTua = '';
beforeAll((done) => {
    User.create(userBaru)
    .then((data) => {
        const userInput = {
            id: data.id,
            username: data.username.toLowerCase(),
            role: data.role
        }
        access_token = signToken(userInput)
            orangTua = data
            return User.create(user2)
        })
        .then((data) => {
            const user2Input = {
                id: data.id,
                username: data.username,
                role: data.role
            }
            petugas = data
            token = signToken(user2Input)
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
                username: "maryam",
                password: "Maryammaryam"
            })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
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
                username: "marya",
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
                username: "maryam",
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
describe("Test Success CRUD Bayi", () => {
    const user = {
        nama: 'Melody',
        alamat: 'Jakarta',
        usia: 25,
        jenis_kelamin: 'Perempuan',
        username: 'Melody',
        password: '123',
        no_hp: 82512,
        role: 'Orang Tua',
        foto:
          'https://cdn1-production-images-kly.akamaized.net/CASsRi73DznnCPVGy_MO48zCeMA=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2786209/original/029379000_1556018610-Melody_Nurramdhani.jpg',
      }
    it("Test success Post users ", (done) => {
        request(app)
            .post('/user')
            .send(user)
            .set('Accept', 'application/json')
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(201)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})