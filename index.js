const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


// Configurar Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta principal
app.get('/', (req, res) => {
  res.send('Microservicio de Metadatos de Archivos funcionando');
});

// Ruta para subir archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileInfo);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
