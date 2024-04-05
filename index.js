const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Ariel", "Brian"];

app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ usuarios });
});

app.get("/abracadabra/juego/:usuario", (req, res, next) => {
  const { usuario } = req.params;
  if (!usuarios.includes(usuario)) {
    return next(new Error("Usuario no encontrado"));
  }
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use((err, req, res, next) => {
  if (err.message === "Usuario no encontrado") {
    res.sendFile(path.join(__dirname, "public/who.html"));
  } else {
    next(err);
  }
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
  const { n } = req.params;
  if (numeroAleatorio === parseInt(n)) {
    res.sendFile(path.join(__dirname, "public/conejito.html"));
  } else {
    res.sendFile(path.join(__dirname, "public/voldemort.html"));
  }
});

app.get('*', (req, res) => {
    res.status(404).send('Esta página no existe');
  });

app.listen(3000, () => {
  console.log("Servidor funcionando en el puerto 3000");
});
