const request = require('supertest')
const app = require('../app')
const { User, Bayi, Perkembangan } = require('../models/index')
const { signToken } = require('../helpers/jwt')


const user = { username: "maryam", password: "Maryammaryam", role: "Orang Tua" }
const user2 = { username: "boyke", password: "Boykeboyke", role: "Dokter" }

const perkembangan = {
  lingkar_kepala: 34,
  tinggi: 49.1,
  berat_badan: 3.2
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

describe("Test Success CRUD Perkembangan Bayi", () => {
  it("Test success post perkembangan bayi normal", (done) => {
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", 0)
        expect(body).toHaveProperty("status_tinggi", 0)
        expect(body).toHaveProperty("status_berat_badan", 0)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd -1", (done) => {
    const perkembangan = {
      lingkar_kepala: 32.7,
      tinggi: 47.3,
      berat_badan: 2.8
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", -1)
        expect(body).toHaveProperty("status_tinggi", -1)
        expect(body).toHaveProperty("status_berat_badan", -1)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd -2", (done) => {
    const perkembangan = {
      lingkar_kepala: 31.5,
      tinggi: 45.4,
      berat_badan: 2.4
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", -2)
        expect(body).toHaveProperty("status_tinggi", -2)
        expect(body).toHaveProperty("status_berat_badan", -2)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd -3", (done) => {
    const perkembangan = {
      lingkar_kepala: 30,
      tinggi: 40,
      berat_badan: 1
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", -3)
        expect(body).toHaveProperty("status_tinggi", -3)
        expect(body).toHaveProperty("status_berat_badan", -3)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd 1", (done) => {
    const perkembangan = {
      lingkar_kepala: 35.1,
      tinggi: 51,
      berat_badan: 3.7
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", 1)
        expect(body).toHaveProperty("status_tinggi", 1)
        expect(body).toHaveProperty("status_berat_badan", 1)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd 2", (done) => {
    const perkembangan = {
      lingkar_kepala: 36.2,
      tinggi: 52.9,
      berat_badan: 4.2
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", 2)
        expect(body).toHaveProperty("status_tinggi", 2)
        expect(body).toHaveProperty("status_berat_badan", 2)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd 3", (done) => {
    const perkembangan = {
      lingkar_kepala: 37.4,
      tinggi: 54.7,
      berat_badan: 4.8
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty("status_lingkar_kepala", 3)
        expect(body).toHaveProperty("status_tinggi", 3)
        expect(body).toHaveProperty("status_berat_badan", 3)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it("Test success post perkembangan bayi sd 3", (done) => {
    const perkembangan = {
      lingkar_kepala: -37.4,
      tinggi: -54.7,
      berat_badan: -4.8
    }
    request(app)
      .post(`/bayi/${bayiBaru.id}/perkembangan`)
      .set("access_token", token)
      .send(perkembangan)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "Tidak boleh negatif.")
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
  it("Test failed delete perkembangan bayi", (done) => {
    request(app)
      .delete(`/bayi/perkembangan/${-1}`)
      .set("access_token", token)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Data perkembangan bayi tidak ditemukan.")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
describe("Test Add Bayi Dokter", () => {
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
  it("Test failed add bayi to dokter", (done) => {
    request(app)
      .post(`/dokter/bayi/${null}`)
      .set("access_token", token)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "Gagal menambah bayi.")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("Test CRUD delete Dokter Bayi", () => {
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
  it("Test failed delete bayi in dokter", (done) => {
    request(app)
      .delete(`/dokter/bayi/${-1}`)
      .set("access_token", token)
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Data bayi tidak ditemukan.")
        done()
      })
      .catch(err => {
        done(err)
      })
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