const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
// Importar las rutas de categoría
const categoriaRoutes = require('./routes/categoria');
const productRoutes = require('./routes/productRoutes');

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth')

//initialize routes
app.use('/api', authRoutes)
// Registrar la ruta de categoría
app.use('/api/categorias', categoriaRoutes);
app.use('/api', productRoutes);
app.use('/uploads', express.static('uploads'));


//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
