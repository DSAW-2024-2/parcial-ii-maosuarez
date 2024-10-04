//AQUI SE HACEN TODOS LOS AJUSTES DE LA API EN GENERAL

//1. IMPORTAR DEPENDENCIAS
const express = require("express");
const app = express();

const cors = require("cors");

//2. CONFIGURACION DE LA API
app.use(express.json());
app.use(cors());

//USANDO ROUTES PARA SEPARAR EL CODIGO EN MODULOS
//RUTA DE LOGIN
app.use(require("./Routes/login.js"));
app.use(require("./Routes/weather.js"));

// Capturar rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json("Ruta no encontrada");
});

//3. INICIAR LA API
let port = process.env.PORT || 3000;
app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`server is running on port ${port}`);
});
