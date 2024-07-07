const ConectarBD = require('./ConectarBD');

const mostrarUsuarios = async () => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        const [rows] = await db.conexion.query('SELECT * FROM usuarios');
        await db.cerrarConexion();
        return rows;
    } catch (error) {
        throw error;
    }
};

const insertarUsuario = async (nombre, celular, correo) => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        await db.conexion.query('INSERT INTO usuarios (nombre, celular, correo) VALUES (?, ?, ?)', [nombre, celular, correo]);
        await db.cerrarConexion();
    } catch (error) {
        throw error;
    }
};

const obtenerUsuarioPorId = async (id) => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        const [rows] = await db.conexion.query('SELECT * FROM usuarios WHERE idusuario = ?', [id]);
        await db.cerrarConexion();
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const actualizarUsuario = async (id, nombre, celular, correo) => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        await db.conexion.query('UPDATE usuarios SET nombre = ?, celular = ?, correo = ? WHERE idusuario = ?', [nombre, celular, correo, id]);
        await db.cerrarConexion();
    } catch (error) {
        throw error;
    }
};

const eliminarUsuario = async (id) => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        await db.conexion.query('DELETE FROM usuarios WHERE idusuario = ?', [id]);
        await reindexarUsuarios(); // Reindexar después de eliminar
        await db.cerrarConexion();
    } catch (error) {
        throw error;
    }
};

const reindexarUsuarios = async () => {
    const db = new ConectarBD();
    try {
        await db.crearConexion();
        const [usuarios] = await db.conexion.query('SELECT * FROM usuarios ORDER BY idusuario');
        for (let i = 0; i < usuarios.length; i++) {
            await db.conexion.query('UPDATE usuarios SET idusuario = ? WHERE idusuario = ?', [i + 1, usuarios[i].idusuario]);
        }
        await db.cerrarConexion();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarUsuarios,
    insertarUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};
