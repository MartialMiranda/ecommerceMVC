const multer = require('multer');
const path = require('path');

// Configuración de Multer para almacenar imágenes en una carpeta local 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const uploadImage = multer({ storage });

module.exports = { uploadImage };
