const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static('public'));

// Configurar Multer para recibir archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta principal: muestra directamente el formulario
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta POST para analizar archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileInfo); // Devuelve solo JSON
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
