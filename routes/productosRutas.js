const express = require('express');
const router = express.Router();
const ProductoBD = require('../DB/ProductoBD');

router.get('/agregarProducto', (req, res) => {
    res.render('formProducto', { title: 'Agregar Producto' });
});

router.get('/mostrarProductos', async (req, res) => {
    try {
        const productos = await ProductoBD.mostrarProductos();
        res.render('mostrarProductos', { productos, title: 'Lista de Productos' });
    } catch (error) {
        console.error('Error al mostrar productos:', error);
        res.status(500).render('error', { error: 'Error al mostrar productos' });
    }
});

router.get('/editarProducto/:id', async (req, res) => {
    const idProducto = req.params.id;
    try {
        const producto = await ProductoBD.obtenerProductoPorId(idProducto);
        res.render('editarProducto', { producto, title: 'Editar Producto' });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).render('error', { error: 'Error al obtener el producto' });
    }
});

router.post('/agregarProducto', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = { nombre, precio, descripcion };
    try {
        await ProductoBD.insertarProducto(nuevoProducto);
        res.redirect('/productos/mostrarProductos');
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).render('error', { error: 'Error al agregar producto' });
    }
});

router.post('/editarProducto/:id', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const productoActualizado = { idProducto: req.params.id, nombre, precio, descripcion };
    try {
        await ProductoBD.actualizarProducto(productoActualizado);
        res.redirect('/productos/mostrarProductos');
    } catch (error) {
        console.error('Error al editar producto:', error);
        res.status(500).render('error', { error: 'Error al editar producto' });
    }
});

router.post('/eliminarProducto/:id', async (req, res) => {
    try {
        await ProductoBD.eliminarProducto(req.params.id);
        res.redirect('/productos/mostrarProductos');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).render('error', { error: 'Error al eliminar producto' });
    }
});

module.exports = router;
