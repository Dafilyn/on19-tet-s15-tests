const request = require("supertest");
const app = require("../app.js");

let elementId;

describe("Teste API", () => {
  test("Rota /tarefas", (done) => {
    request(app)
      .get("/tarefas")
      .expect(200)
      .expect((res) => {
        expect(res.body.lenght).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test("Rota /novaTarefa", (done) => {
    request(app)
      .post("/novaTarefa")
      .expect("Content-Type", /json/)
      .send({
        descricao: "Nova Colaboradora",
        dataInclusao: "04/01/2022",
        concluido: true,
        nomeColaboradora: "Dafilyn",
        password: "S3nh@S3gur@",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.descricao._id;
        return done();
      });
  });

  test("Rota /delete/:id", (done) => {
    request(app)
      .delete(`/delete/${elementId}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.tarefas.descricao).toBe("");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
