const ConectarBD = require('./ConectarBD');
const conectarBD = new ConectarBD();

const ProductoBD = {
    mostrarProductos: async () => {
        await conectarBD.crearConexion();
        const conexion = conectarBD.conexion;
        try {
            const [resultados] = await conexion.query('SELECT * FROM productos ORDER BY idProducto');
            await conectarBD.cerrarConexion();
            return resultados;
        } catch (error) {
            await conectarBD.cerrarConexion();
            throw error;
        }
    },
    obtenerProductoPorId: async (id) => {
        await conectarBD.crearConexion();
        const conexion = conectarBD.conexion;
        try {
            const [resultados] = await conexion.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
            await conectarBD.cerrarConexion();
            return resultados[0];
        } catch (error) {
            await conectarBD.cerrarConexion();
            throw error;
        }
    },
    insertarProducto: async (producto) => {
        await conectarBD.crearConexion();
        const conexion = conectarBD.conexion;
        try {
            const [resultados] = await conexion.query('INSERT INTO productos SET ?', producto);
            await reindexarProductos(conexion);
            await conectarBD.cerrarConexion();
            return resultados;
        } catch (error) {
            await conectarBD.cerrarConexion();
            throw error;
        }
    },
    actualizarProducto: async (producto) => {
        await conectarBD.crearConexion();
        const conexion = conectarBD.conexion;
        const { idProducto, nombre, precio, descripcion } = producto;
        try {
            const [resultados] = await conexion.query('UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE idProducto = ?', 
            [nombre, precio, descripcion, idProducto]);
            await conectarBD.cerrarConexion();
            return resultados;
        } catch (error) {
            await conectarBD.cerrarConexion();
            throw error;
        }
    },
    eliminarProducto: async (id) => {
        await conectarBD.crearConexion();
        const conexion = conectarBD.conexion;
        try {
            const [resultados] = await conexion.query('DELETE FROM productos WHERE idProducto = ?', [id]);
            await reindexarProductos(conexion); // Reindexar después de eliminar
            await conectarBD.cerrarConexion();
            return resultados;
        } catch (error) {
            await conectarBD.cerrarConexion();
            throw error;
        }
    }
};

const reindexarProductos = async (conexion) => {
    try {
        const [productos] = await conexion.query('SELECT * FROM productos ORDER BY idProducto');
        for (let i = 0; i < productos.length; i++) {
            await conexion.query('UPDATE productos SET idProducto = ? WHERE idProducto = ?', [i + 1, productos[i].idProducto]);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = ProductoBD;
