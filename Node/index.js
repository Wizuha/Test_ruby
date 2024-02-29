const express = require("express");
const port = 3000;
const app = express();

const bodyParser = require("body-parser");
const api = "https://moderation.logora.fr";

app.use(bodyParser.json());

app.post("/api/moderation/predict", async (req, res) => {
  const { text, language } = req.body;
  if (!text) {
    res.status(422).send("Nous pouvons pas vous donner une probabilité sans un text");
  }
  if (!language) {
    res.status(422).send("Nous pouvons pas vous donner une probabilité sans un language");
  }
  const response = await fetch(
    `${api}/predict?text=${text}&language=${language}`
  );
  const data = await response.json();
  res.json({ probability: data.prediction["0"] });
});

app.post("/api/moderation/score", async (req, res) => {
  const { text, language } = req.body;
  if (!text) {
    res.status(422).send("Nous pouvons pas vous donner une probabilité sans un text");
  }
  if (!language) {
    res.status(422).send("Nous pouvons pas vous donner une probabilité sans un language");
  }
  const response = await fetch(
    `${api}/score?text=${text}&language=${language}`
  );
  const data = await response.json();
  res.json({ score: data.score });
});

app.listen(port, () => {
  console.log(`J'écoute au port ${port}`);
});

module.exports = app
