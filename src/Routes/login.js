const { Router } = require("express");
const router = Router();
const { codify } = require("../Security/secure");

const validUser = {
  email: "admin@admin.com",
  password: "admin",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== validUser.email) {
    return res.status(401).send("Usuario no encontrado");
  }

  if (password !== validUser.password) {
    return res.status(401).send("Contraseña incorrecta");
  }

  const token = codify(req.body);

  res.send(token);
});

module.exports = router;
