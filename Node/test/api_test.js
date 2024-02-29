const request = require("supertest");
const assert = require("assert");
const app = require("../index");

describe(" POST testing API request for predict", () => {
  it("send text and language with good word", () => {
    return request(app)
      .post("/api/moderation/predict")
      .send({ text: "Je suis un beau garcon", language: "fr-FR" })
      .expect(200)
      .then((res) => {
        probability = res.body.probability;
        assert(probability < 0.8);
      });
  });
  it("send text and language with bad word", () => {
    return request(app)
      .post("/api/moderation/predict")
      .send({ text: "Je suis un belle merde", language: "fr-FR" })
      .expect(200)
      .then((res) => {
        probability = res.body.probability;
        assert(probability > 0.8);
      });
  });
  it("send information with no text", () => {
    return request(app)
      .post("/api/moderation/predict")
      .send({ language: "fr-FR" })
      .expect(422);
  });
});

describe("POST testing API request for score", () => {
  it("send text and language receive response", () => {
    return request(app)
      .post("/api/moderation/score")
      .send({ text: "Je suis un beau garcon", language: "fr-FR" })
      .expect(200);
  });
  it("send only text", () => {
    return request(app)
      .post("/api/moderation/score")
      .send({ language: "fr-FR" })
      .expect(422);
  });
  it("send only language", () => {
    return request(app)
      .post("/api/moderation/score")
      .send({ text: "Je suis un beau garcon" })
      .expect(422);
  });
});
