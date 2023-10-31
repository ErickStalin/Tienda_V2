const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors"); 
const cloudinary = require("cloudinary").v2; // Importa la biblioteca Cloudinary

const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static("public"));

// Configura Cloudinary 
cloudinary.config({
  cloud_name: "dyrzihnrx",
  api_key: "725186379266327",
  api_secret: "SerMiIObG-I3y7g3_Q_LL-eFS1A",
});

const db = mysql.createConnection({
  host: "localhost",
  user: "Erick",
  password: "0986167219",
  database: "ventas",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

app.get("/buscar", (req, res) => {
  const query = `
    SELECT SKU, Nombre, Imagenes FROM productos
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ error: "Error al buscar productos." });
    } else {
      // Reemplaza la dirección IP con la URL de Cloudinary en los resultados
      results.forEach((producto) => {
        // Utiliza cloudinary.url para construir la URL de Cloudinary
        producto.Imagenes = cloudinary.url(producto.Imagenes, { secure: true });
      });

      res.json(results);
    }
  });
});

const puerto = 3000;

app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto ${puerto}`);
});
