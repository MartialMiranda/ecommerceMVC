const { Router } = require('express');
const multer = require('multer');
const { createProduct, uploadProductImage, deleteProductImage } = require('../controllers/productController');

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Configuración de Multer para subir imágenes

// Ruta para crear producto
router.post('/producto', createProduct);

// Ruta para subir imagen a un producto
router.post('/producto/:producto_id/imagen', upload.single('imagen'), uploadProductImage);

// Ruta para eliminar imagen de un producto
router.delete('/producto/:producto_id/imagen/:imagen_id', deleteProductImage);

module.exports = router;
