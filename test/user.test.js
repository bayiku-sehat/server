const request = require("supertest");
const { response, use } = require("../app");
const app = require("../app");
const { User, Bayi, Perkembangan } = require("../models/index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
let id;
let access_token;

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
    beforeAll(done => {
      User.create(userData2)
        .then(_ => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    afterAll(done => {
      queryInterface
        .bulkDelete("Users", {})
        .then(() => done())
        .catch(err => done(err));
    });

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

    test("400 Failed user - should return error if username is null", done => {
      request(app)
        .post("/user")
        .send({
          password: "qweqwe",
        })
        .then(response => {
          const { body, status } = response;
          console.log(body, "dsfsdfds");
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
      beforeAll(done => {
        User.create({
          username: "farah",
          password: "farah",
        })
          .then(_ => {
            done();
          })
          .catch(err => {
            done(err);
          });
      });

      afterAll(done => {
        queryInterface
          .bulkDelete("Users", {})
          .then(() => done())
          .catch(err => done(err));
      });

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
      //           console.log("yayayya");
      //           return User.findOne({
      //             where: {
      //               username: "ajeng",
      //             },
      //           });
      //         })
      //         .then(user => {
      //           id = user.id;
      //           console.log(id, "id", user);
      //           access_token = signToken({
      //             id: user.id,
      //             username: user.username,
      //             role: user.role,
      //           });
      //           console.log(access_token, "hjhjhjhjh");
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
      //           console.log(access_token);
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
