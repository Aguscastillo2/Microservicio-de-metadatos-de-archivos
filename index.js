const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
