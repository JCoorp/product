document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.eliminar-form').forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const id = form.querySelector('input[name="id"]').value;

            try {
                const response = await fetch(`/usuarios/eliminarUsuario/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        // Eliminar la fila de la tabla
                        form.closest('tr').remove();
                    }
                } else {
                    console.error('Error al eliminar usuario:', response.statusText);
                }
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            }
        });
    });
});
