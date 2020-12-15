const request = require('supertest')
const app = require('../app')
const { User, Bayi } = require('../models/index')
const { signToken } = require('../helpers/jwt')

const user = { username: ("Maryam").toLocaleLowerCase(), password: "Maryammaryam", role: "Orang Tua" }
const user2 = { username: ("Ani").toLocaleLowerCase(), password: "Aniani", role: "Petugas" }
const bayi = {
    nama: "Marni",
    tanggal_lahir: "12-12-20",
    jenis_kelamin: "Perempuan",
    lingkar_kepala: 32.7,
    tinggi: 47.3,
    berat_badan: 3.5,
    foto:"foto"
}

let bayiBaru = ''
let access_token = ''
let token = '';
let petugas = '';
let orangTua = '';

beforeAll((done) => {
    User.create(user)
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

// Succesfull create CRUD 

describe("Test success CRUD Bayi", () => {
    it('Test success Get Bayi', (done) => {
        request(app)
            .get('/bayi')
            .set("access_token", access_token)
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

describe("Test Success CRUD Bayi", () => {
    it("Test null value Bayi ", (done) => {
        request(app)
            .post('/bayi')
            .set("access_token", access_token)
            .send({
                nama: "Marni",
                tanggal_lahir: "12-12-20",
                jenis_kelamin: "Perempuan",
                lingkar_kepala: null,
                tinggi: null,
                berat_badan: null,
                foto:"foto"
            })
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
describe("Test Success CRUD Bayi", () => {
    it("Test success Post Bayi ", (done) => {
        request(app)
            .post('/bayi')
            .set("access_token", access_token)
            .send(bayi)
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
describe("Test Success CRUD Bayi", () => {
    it("Test success get Bayi detail ", (done) => {
        request(app)
            .get(`/bayi/${bayiBaru.id}`)
            .set("access_token", token)
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
describe("Test Success CRUD Bayi", () => {
    it("Test success get Bayi detail ", (done) => {
        request(app)
            .get(`/bayi/${bayiBaru.id}`)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(401)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test Success CRUD Bayi", () => {
    it("Test success Put Bayi ", (done) => {
        request(app)
            .put(`/bayi/${bayiBaru.id}`)
            .set("access_token", token)
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
describe("Test Success CRUD Bayi", () => {
    it("Test failed id bayi Put Bayi ", (done) => {
        request(app)
            .put(`/bayi/${1000000000000000000}`)
            .set("access_token", token)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(400)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
describe("Test Success CRUD Bayi", () => {
    it("Test success Delete Bayi ", (done) => {
        request(app)
            .delete(`/bayi/${bayiBaru.id}`)
            .set("access_token", access_token)
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

// CRUD FAILED

// post

describe("Test Failed CRUD Bayi", () => {
    it("Test failed without access_token", (done) => {
        request(app)
            .post('/bayi')
            .send(bayi)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty(Object.keys(response.body))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("Test Failed CRUD Bayi", () => {
    it("Test failed name with empty field", (done) => {
        request(app)
            .post('/bayi')
            .send({
                nama: "",
                tanggal_lahir: "12-12-20",
                jenis_kelamin: "Perempuan",
                lingkar_kepala: 32.7,
                tinggi: 47.3,
                berat_badan: 3.5
            })
            .set("access_token", access_token)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("errors", expect.any(Array))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// put

describe("Test Failed CRUD Bayi", () => {
    it("Test failed without access_token", (done) => {
        request(app)
            .put(`/bayi/${bayiBaru.id}`)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty(Object.keys(response.body))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("Test Success CRUD Bayi", () => {
    it("Test failed validation Put Bayi ", (done) => {
        request(app)
            .put(`/bayi/${bayiBaru.id}`)
            .set("access_token", access_token)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(403)
                expect(response).toHaveProperty("body", expect.any(Object))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})



// // delete

describe("Test Failed CRUD Bayi", () => {
    it("Test failed without access_token", (done) => {
        request(app)
        .delete(`/bayi/${bayiBaru.id}`)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty(Object.keys(response.body))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("Test Failed CRUD Bayi", () => {
    it("Test failed failed delete", (done) => {
        request(app)
            .delete(`/bayi/${bayiBaru.id}`)
            .set("access_token", access_token)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty(Object.keys(response.body))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})