const request = require('supertest')
const app = require('../app')
const { Bayi } = require('../models/index')

describe("Test success CRUD Bayi", () => {
  it('Test success Get Bayi', (done) => {
    request(app)
    .get('/bayi')
    .send({
      nama: "Marni",
      tanggal_lahir: 2020-12-12,
      jenis_kelamin: "Perempuan",
      lingkar_kepala: 32.7,
      tinggi: 47.3,
      berat_badan: 3.5,
      status_lingkar_kelapa: -1,
      status_tinggi: -1,
      status_berat_badan: 0,
      catatan: "Perkembangan terlalu cepat"
    })
    .then((response) => {
      let { body, status } = response
      console.log(response.status, '<<<<<< ini status');
      expect(status).toBe(200)
      expect(response).toHaveProperty("body", expect.any(Object))
      done()
    })
    .catch(err => {
      done(err)
    })
  }) 
})