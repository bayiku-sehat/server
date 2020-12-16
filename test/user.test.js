const request = require("supertest");
const app = require("../app");
const { User, Bayi, Perkembangan } = require("../models/index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken, verifyToken } = require("../helpers/jwt");
let id;

const user = { username: ("Maryam").toLocaleLowerCase(), password: "Maryammaryam", role: "Dokter" }
const user2 = { username: ("Ani").toLocaleLowerCase(), password: "Aniani", role: "Petugas" }
const bayi = {
  nama: "Marni",
  tanggal_lahir: "12-12-20",
  jenis_kelamin: "Perempuan",
  lingkar_kepala: 34,
  tinggi: 49.1,
  berat_badan: 3.2,
  foto: "foto"
}

let bayiBaru = ''
let access_token = ''
let token = '';
let petugas = '';
let dokter = '';

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      const userInput = {
        id: data.id,
        username: data.username.toLowerCase(),
        role: data.role
      }
      access_token = signToken(userInput)
      dokter = data
      console.log(verifyToken(access_token).id, "1dokter")
      return User.create(user2)
    })
    .then((data) => {
      console.log(data, "22222")
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



describe("Test success CRUD User", () => {
  it("Test success Get dokter", done => {
    request(app)
      .get("/user/dokter")
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Test success CRUD User", () => {
  it("Test success Get orang tua", done => {
    request(app)
      .get("/user/orangtua")
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Test success CRUD User", () => {
  it("Test success Get petugas", done => {
    request(app)
      .get("/user/petugas")
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("User Routes Test", () => {
  const userData = {
    username: "ajeng",
    password: "ajeng",
    nama: "Fitri",
    alamat: "Jakarta",
    usia: 25,
    no_hp: 685212345,
    jenis_kelamin: "perempuan",
    role: "Dokter",
  };

  const userData2 = {
    username: "aulia",
    password: "aulia",
    nama: "Shelli",
    alamat: "Jakarta",
    usia: 26,
    no_hp: 685212347,
    jenis_kelamin: "perempuan",
    role: "Orang Tua",
  };

  describe("POST /user - create new user", () => {
    test("201 Success user - should create new User", done => {
      request(app)
        .post("/user")
        .send(userData)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("username", userData.username);
          done();
        });
    });
    test("201 Success user - should create new User", done => {
      request(app)
        .post("/user")
        .send({
          username: "ajeng",
          password: "ajeng",
          nama: "",
          alamat: "Jakarta",
          usia: null,
          no_hp: 685212345,
          jenis_kelamin: "perempuan",
          role: "Dokter",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("username", userData.username);
          done();
        });
    });

    test("400 Failed user - should return error if username is null", done => {
      request(app)
        .post("/user")
        .send({
          password: "qweqwe",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "field must be not empty");
          done();
        });
    });

    test("400 Failed user - should return error if username is empty string", done => {
      request(app)
        .post("/user")
        .send({
          username: "",
          password: "qweqwe",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "field must be not empty");
          done();
        });
    });

    test("400 Failed user - should return error if password is null", done => {
      request(app)
        .post("/user")
        .send({
          username: "lola",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "field must be not empty");
          done();
        });
    });

    test("400 Failed user - should return error if password is empty", done => {
      request(app)
        .post("/user")
        .send({
          username: "lala",
          password: "",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "field must be not empty");
          done();
        });
    });

    test("400 Failed user - should return error if username is already used", done => {
      request(app)
        .post("/user")
        .send({
          username: "ajeng",
          password: "qweqwes",
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "user already exists");
          done();
        });
    });
    describe("POST /login - user authentication process", () => {
      test("200 Success login - should return access_token", done => {
        request(app)
          .post("/login")
          .send({
            username: "farah",
            password: "farah",
          })
          .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
            done();
          });
      });

      test("400 Failed login - should return access_token", done => {
        request(app)
          .post("/login")
          .send({
            username: "d@mailssss.com",
            password: "farah",
          })
          .then(response => {
            const { body, status } = response;
            expect(status).toBe(403);
            expect(body).toHaveProperty(
              "message",
              "username dan password salah"
            );
            done();
          });
      });
      test("400 Failed login - should return access_token", done => {
        request(app)
          .post("/login")
          .send({
            username: "farah",
            password: "faraha",
          })
          .then(response => {
            const { body, status } = response;
            expect(status).toBe(403);
            expect(body).toHaveProperty(
              "message",
              "username dan password salah"
            );
            done();
          });
      });
      //   describe("PUT / user", () => {
      //     beforeAll(done => {
      //       User.create(userData)
      //         .then(() => {
      //           return User.findOne({
      //             where: {
      //               username: "ajeng",
      //             },
      //           });
      //         })
      //         .then(user => {
      //           id = user.id;
      //           access_token = signToken({
      //             id: user.id,
      //             username: user.username,
      //             role: user.role,
      //           });
      //           done();
      //         })
      //         .catch(err => {
      //           done(err);
      //         });
      //     });
      //     afterAll(done => {
      //       queryInterface
      //         .bulkDelete("Users", {})
      //         .then(() => done())
      //         .catch(err => done(err));
      //     });
      //     test("sukses edit", done => {
      //       request(app)
      //         .put(`/user/${id}`)
      //         // .set("access_token", access_token)
      //         .send({
      //           username: "ajengputri",
      //           password: "ajeng",
      //           nama: "Fitri",
      //           alamat: "Jakarta",
      //           usia: 25,
      //           no_hp: 685212345,
      //           jenis_kelamin: "perempuan",
      //           role: "Dokter",
      //         })
      //         .then(response => {
      //           const { body, status } = response;
      //           //expect(status).toBe(200);
      //           expect(response).toHaveProperty("body", expect.any(Object));
      //           done();
      //         })
      //         .catch(err => {
      //           done(err);
      //         });
      //     });
      //   });
    });
  });
});
console.log(dokter.id, "iddok")
describe("Test success CRUD User detail", () => {
  it("Test success Get user detail", done => {
    request(app)
      .post(`/user/${dokter.id}`)
      .set("access_token", access_token)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  it("Test failed Get user detail", done => {
    request(app)
      .post(`/user/${undefined}`)
      .set("access_token", token)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
describe("Test success CRUD dokter get bayi", () => {
  it("Test success Get dokter get bayi", done => {
    request(app)
      .post(`/user/bayi/${bayiBaru.id}`)
      .set("access_token", access_token)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(201);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  it("Test failed Get not dokter get bayi", done => {
    request(app)
      .post(`/user/bayi/${bayiBaru.id}`)
      .set("access_token", token)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(403);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});


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