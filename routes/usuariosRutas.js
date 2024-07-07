const express = require('express');
const router = express.Router();
const { mostrarUsuarios, insertarUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } = require('../DB/UsuarioBD');

router.get('/mostrarUsuarios', async (req, res) => {
    try {
        const usuarios = await mostrarUsuarios();
        res.render('mostrarUsuarios', { usuarios, title: 'Lista de Usuarios' });
    } catch (error) {
        res.status(500).send('Error al mostrar usuarios');
    }
});

router.get('/agregarUsuario', (req, res) => {
    res.render('formUsuario', { title: 'Agregar Usuario' });
});

router.post('/agregarUsuario', async (req, res) => {
    const { nombre, celular, correo } = req.body;
    try {
        await insertarUsuario(nombre, celular, correo);
        res.redirect('/usuarios/mostrarUsuarios');
    } catch (error) {
        res.status(500).send('Error al agregar usuario');
    }
});

router.get('/editarUsuario/:id', async (req, res) => {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id);
        if (usuario) {
            res.render('editarUsuario', { usuario, title: 'Editar Usuario' });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener usuario para editar');
    }
});

router.post('/editarUsuario/:id', async (req, res) => {
    const { nombre, celular, correo } = req.body;
    try {
        await actualizarUsuario(req.params.id, nombre, celular, correo);
        res.redirect('/usuarios/mostrarUsuarios');
    } catch (error) {
        res.status(500).send('Error al editar usuario');
    }
});

router.post('/eliminarUsuario/:id', async (req, res) => {
    try {
        await eliminarUsuario(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).send('Error al eliminar usuario');
    }
});

module.exports = router;
