// class/ProductoClase.js

class Producto {
    constructor(producto) {
        this._id = producto.idProducto;
        this._nombre = producto.nombre;
        this._precio = producto.precio;
        this._descripcion = producto.descripcion;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    set precio(precio) {
        this._precio = precio;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get nombre() {
        return this._nombre;
    }

    get precio() {
        return this._precio;
    }

    get descripcion() {
        return this._descripcion;
    }

    get obtenerDatos() {
        return {
            id: this._id,
            nombre: this._nombre,
            precio: this._precio,
            descripcion: this._descripcion
        };
    }
}

module.exports = Producto;
