const request = require('supertest')
const app = require('../app')


// Succesfull create CRUD 

describe("Test success CRUD Bayi", () => {
  it('Test success Get Bayi', (done) => {
    request(app)
      .get('/bayi')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
  it("Test success Post Bayi ", (done) => {
    request(app)
      .post('/bayi')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
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

describe("Test Success CRUD Bayi", () => {
  it("Test success Put Bayi ", (done) => {
    request(app)
      .put('/bayi/2')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
  it("Test success Delete Bayi ", (done) => {
    request(app)
      .delete('/bayi/2')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
  it("Test failed with empty field", (done) => {
    request(app)
      .post('/bayi')
      .send({
        nama: '',
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
      .put('/bayi/2')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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
  it("Test failed id undefined", (done) => {
    request(app)
      .put('/bayi')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
      .then((response) => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty(Object.keys(response.body))
        dozne()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("Test Failed CRUD Bayi", () => {
  it("Test failed with empty field", (done) => {
    request(app)
      .put('/bayi/2')
      .send({
        nama: "",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
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

// delete

describe("Test Failed CRUD Bayi", () => {
  it("Test failed without access_token", (done) => {
    request(app)
      .delete('/bayi/2')
      .send({
        nama: "Marni",
        tanggal_lahir: 2020 - 12 - 12,
        jenis_kelamin: "Perempuan",
        lingkar_kepala: 32.7,
        tinggi: 47.3,
        berat_badan: 3.5,
        status_lingkar_kelapa: -1,
        status_tinggi: -1,
        status_berat_badan: 0
      })
      .then((response) => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty(Object.keys(response.body))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("Test Failed CRUD Bayi", () => {
  it("Test failed id undefined", (done) => {
    request(app)
    .delete('/bayi/')
    .send({
      nama: "Marni",
      tanggal_lahir: 2020 - 12 - 12,
      jenis_kelamin: "Perempuan",
      lingkar_kepala: 32.7,
      tinggi: 47.3,
      berat_badan: 3.5,
      status_lingkar_kelapa: -1,
      status_tinggi: -1,
      status_berat_badan: 0
    })
    .then((response) => {
      let {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty(Object.keys(response.body))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})