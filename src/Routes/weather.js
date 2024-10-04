const { Router } = require("express");
const router = Router();
const { decode } = require("../Security/secure");

// Middleware para proteger rutas
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Token requerido");
  }

  if (decode(token)) {
    next();
  } else {
    return res.status(401).send("Token invalido");
  }
};

router.get("/weather", authMiddleware, (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current_weather=true";

  const promise = fetch(url);

  promise
    .then((response) => response.json())
    .then((data) => {
      const answer = {
        weather_current_temperature:
          data.current_weather.temperature +
          " " +
          data.current_weather_units.temperature,
      };
      res.json(answer);
    });
});

module.exports = router;
