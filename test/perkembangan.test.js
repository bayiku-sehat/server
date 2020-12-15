const request = require('supertest')
const app = require('../app')
const { User, Bayi, Perkembangan } = require('../models/index')
const { signToken } = require('../helpers/jwt')


const user = { username: "Maryam", password: "Maryammaryam", role: "Orang Tua" }
const user2 = { username: "Boyke", password: "Boykeboyke", role: "Dokter" }

const bayi = {
  lingkar_kepala: 32.7,
  tinggi: 47.3,
  berat_badan: 3.5
}

let bayiBaru = 0
let dokterBaru = 0
let access_token = ''
let token = ''
let dokter = ''
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
      dokter = data
      token = signToken(user2)
      return Perkembangan.create(bayi)
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
      .set("access_token", access_token)
      .send(bayi)
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
      .delete(`/bayi/${bayiBaru.id}/perkembangan`)
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

describe("Test success add Bayi to Dokter", () => {
  it("Test success add bayi to dokter", (done) => {
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send({
        Bayi_id: bayiBaru.id,
        status: "Normal",
        DokterId: dokterBaru.id
      })
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err);
      })
  })
})

describe("Test success delete Bayi to Dokter", () => {
  it("Test success delete bayi to dokter", (done) => {
    request(app)
      .delete(`/bayi/${bayiBaru.id}/perkembangan`)
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