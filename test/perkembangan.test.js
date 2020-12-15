const request = require('supertest')
const app = require('../app')
const { User, Bayi, Perkembangan } = require('../models/index')
const { signToken } = require('../helpers/jwt')


const user = { username: "maryam", password: "Maryammaryam", role: "Orang Tua" }
const user2 = { username: "boyke", password: "Boykeboyke", role: "Dokter" }

const perkembangan = {
  lingkar_kepala: 32.7,
  tinggi: 47.3,
  berat_badan: 3.5
}
const bayi = {
  nama: "Marni",
  tanggal_lahir: "12-12-20",
  jenis_kelamin: "Perempuan",
  lingkar_kepala: 32.7,
  tinggi: 47.3,
  berat_badan: 3.5,
  foto: "foto"
}

let perkembanganBaru
let bayiBaru
// let dokterBaru = 0
let access_token = ''
let token = ''
let dokterBaru = ''
let orangTua = ''

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      const userInput = {
        id: data.id,
        username: data.username,
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
      dokterBaru = data
      token = signToken(user2Input)
      return Perkembangan.create(perkembangan)
    })
    .then((data) => {
      perkembanganBaru = data
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
      return done()
    })
    .catch(err => {
      return done(err)
    })
})

describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success post perkembangan bayi", (done) => {
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
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
describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test null value perkembangan bayi", (done) => {
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send({
        lingkar_kepala: null,
        tinggi: null,
        berat_badan: null
      })
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

describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success post perkembangan bayi", (done) => {
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
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
describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success delete perkembangan bayi", (done) => {
    request(app)
      .delete(`/bayi/perkembangan/${perkembanganBaru.id}`)
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
describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success add bayi to dokter", (done) => {
    request(app)
      .post(`/dokter/bayi/${bayiBaru.id}`)
      .set("access_token", token)
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

describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success delete bayi in dokter", (done) => {
    request(app)
      .delete(`/dokter/bayi/${bayiBaru.id}`)
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
describe("Test failed CRUD Perkembangan Bayi", () => {
  it("Test failed delete perkembangan id undefined", (done) => {
    request(app)
      .delete(`/bayi/${undefined}/perkembangan/${undefined}`)
      .set("access_token", access_token)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(404)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
