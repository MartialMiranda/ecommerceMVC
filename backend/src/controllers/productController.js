const path = require('path');
const fs = require('fs');
const { query } = require('../db');
const { uploadImage } = require('../utils/imageUtils.js');

// Crear producto
const createProduct = async (req, res) => {
  const { titulo, descripcion, precio, stock, categoria_id, usuario_id } = req.body;

  try {
    const newProduct = await query(
      'INSERT INTO producto (titulo, descripcion, precio, stock, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, descripcion, precio, stock, categoria_id, usuario_id]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Subir imagen a un producto
const uploadProductImage = async (req, res) => {
  const { producto_id } = req.params;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }

  const imagePath = path.join(__dirname, '../uploads', imageFile.filename);
  const imageUrl = `/uploads/${imageFile.filename}`;

  try {
    await query('INSERT INTO imagen_producto (producto_id, url_imagen) VALUES ($1, $2)', [producto_id, imageUrl]);

    res.status(200).json({ message: 'Imagen subida con éxito', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};

// Eliminar imagen de un producto
const deleteProductImage = async (req, res) => {
  const { producto_id, imagen_id } = req.params;

  try {
    const result = await query('SELECT url_imagen FROM imagen_producto WHERE id = $1 AND producto_id = $2', [imagen_id, producto_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    const imagePath = path.join(__dirname, '../uploads', result.rows[0].url_imagen);
    fs.unlinkSync(imagePath); // Elimina el archivo físicamente

    await query('DELETE FROM imagen_producto WHERE id = $1', [imagen_id]);

    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};

module.exports = {
  createProduct,
  uploadProductImage,
  deleteProductImage,
};
