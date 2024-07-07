document.addEventListener('DOMContentLoaded', function() {
    var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
    var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regexTelefonoNacional = /^\d{10}$/;

    var nombre = document.getElementById("nombre"),
        tachenombre = document.getElementsByClassName("tacheNombre")[0],
        buenanombre = document.getElementsByClassName("buenaNombre")[0],
        mensajeNombre = document.getElementsByClassName("mensajeNombre")[0];
    var celular = document.getElementById("celular"),
        tachecelular = document.getElementsByClassName("tacheCelular")[0],
        buenacelular = document.getElementsByClassName("buenaCelular")[0],
        mensajecelular = document.getElementsByClassName("mensajeCelular")[0];
    var correo = document.getElementById("correo"),
        tachecorreo = document.getElementsByClassName("tacheCorreo")[0],
        buenacorreo = document.getElementsByClassName("buenaCorreo")[0],
        mensajecorreo = document.getElementsByClassName("mensajeCorreo")[0];

    if (nombre) {
        nombre.addEventListener("blur", () => {
            if (!regexNombre.test(nombre.value)) {
                buenanombre.classList.add("ocultar");
                nombre.classList.remove("input-buena");
                mensajeNombre.classList.remove("ocultar");
                nombre.classList.add("input-tache");
                tachenombre.classList.remove("ocultar");
            } else {
                mensajeNombre.classList.add("ocultar");
                tachenombre.classList.add("ocultar");
                nombre.classList.remove("input-tache");
                nombre.classList.add("input-buena");
                buenanombre.classList.remove("ocultar");
            }
        });
    }

    if (celular) {
        celular.addEventListener("blur", () => {
            if (!regexTelefonoNacional.test(celular.value)) {
                buenacelular.classList.add("ocultar");
                celular.classList.remove("input-buena");
                mensajecelular.classList.remove("ocultar");
                celular.classList.add("input-tache");
                tachecelular.classList.remove("ocultar");
            } else {
                mensajecelular.classList.add("ocultar");
                tachecelular.classList.add("ocultar");
                celular.classList.remove("input-tache");
                celular.classList.add("input-buena");
                buenacelular.classList.remove("ocultar");
            }
        });
    }

    if (correo) {
        correo.addEventListener("blur", () => {
            if (!regexCorreo.test(correo.value)) {
                buenacorreo.classList.add("ocultar");
                correo.classList.remove("input-buena");
                mensajecorreo.classList.remove("ocultar");
                correo.classList.add("input-tache");
                tachecorreo.classList.remove("ocultar");
            } else {
                mensajecorreo.classList.add("ocultar");
                tachecorreo.classList.add("ocultar");
                correo.classList.remove("input-tache");
                correo.classList.add("input-buena");
                buenacorreo.classList.remove("ocultar");
            }
        });
    }

    const deleteButtons = document.querySelectorAll('.delete-button');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = button.dataset.productId;

            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                fetch(`/productos/eliminarProducto/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: productId })
                })
                .then(response => {
                    if (response.ok) {
                        alert('Producto eliminado correctamente.');
                        window.location.reload();
                    } else {
                        alert('Error al eliminar el producto.');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
