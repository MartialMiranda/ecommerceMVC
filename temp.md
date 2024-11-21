backend
npm i bcryptjs cookie-parser cors dotenv express express-validator jsonwebtoken nodemo
n passport passport-jwt pg
nom run dev


frontend
npx create-react-app client --template redux
npm i axios react-router-dom
npm start




estructure:

ecommerce/
│
├── backend/
│   ├── controllers/
│   │   ├── usuarioController.js # Controlador para usuario
│   ├── models/
│   │   ├── dao.js          # Modelo para productos
│   │   ├── usuarioModel.js          # Modelo para usuario
│   ├── routes/
│   │   ├── usuarioRoutes.js    # Rutas para usuario
│   ├── server.js               # Servidor principal de Express
│   ├── package-lock.json
│   ├── package.json
│   └── .env                    # Variables de entorno
│
└── frontend/
    ├── public/
    │   ├── css/                # Archivos CSS
    │   │   └── bootstrap.css
    │   │   └── Site.css
    │   │   └── toastr.css
    │   ├── icons/              # Iconos svg
    │   └── js/                 # Archivos JavaScript
    │       └── bootstrap.js
    │       └── jquery-3.7.1.js
    │       └── toastr.js
    │       └── usuario.js       # js para usuario
    │       └── utiles.js       # Maneja la solicitux Ajax y GetUrlBackend
    ├── views/
    │   ├── login.html           # Vista para login
    │   ├── register.html        # Vista para registro
    │   ├── home.html            # Vista para la página principal
    └── index.html    


📦backend
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜auth.js
 ┃ ┣ 📂models
 ┃ ┣ 📂db
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth-middleware.js
 ┃ ┃ ┣ 📜passport-middleware.js
 ┃ ┃ ┗ 📜validations-middleware.js
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜auth.js
 ┃ ┣ 📂validators
 ┃ ┃ ┗ 📜auth.js
 ┃ ┗ 📜index.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜database.sql
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js