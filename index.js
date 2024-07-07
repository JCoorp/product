const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Configuración de EJS como el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productosRutas = require('./routes/productosRutas');
const usuariosRutas = require('./routes/usuariosRutas');

app.use('/productos', productosRutas);
app.use('/usuarios', usuariosRutas);

// Redirigir a la ruta de agregar usuario cuando se accede a la raíz
app.get('/', (req, res) => {
    res.redirect('/usuarios/agregarUsuario');
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('error', { title: '404 - Página no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
