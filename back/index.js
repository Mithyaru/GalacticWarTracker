const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const planetEndPoint = "/planets";
const capmaingEndPoint = "/campaigns";

const headersList = {
  Accept: "*/*",
  "User-Agent": "GalaticWarTest-Mithyaru",
  "X-Super-Client": "GalacticWarTest",
  "X-Super-Contact": "Discord: mithyaru",
};
const reqPlanets = {
  url: "https://api.helldivers2.dev/api/v1" + planetEndPoint,
  method: "GET",
  headers: headersList,
};
const reqCampaings = {
  url: "https://api.helldivers2.dev/api/v1" + capmaingEndPoint,
  method: "GET",
  headers: headersList,
};

app.get('/campanhas', async (req, res) => {
  let campaigns = [];
  const call = await axios.request(reqCampaings)
    .then(async (response) => response)
    .catch((error) => error);
    campaigns = call.data
    res.json(campaigns)
})

app.get('/planets', async (req, res) => {
  let campaigns = [];
  const call = await axios.request(reqPlanets)
    .then(async (response) => response)
    .catch((error) => error);
    campaigns = call.data
    console.log(campaigns)
    res.json(campaigns)
})


app.listen(4000, function () {
  console.log("Iniciou na porta 4000");
});
