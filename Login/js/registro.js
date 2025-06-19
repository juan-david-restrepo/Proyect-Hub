const correoInput = document.getElementById('correoInput');
const contraseñaInput = document.getElementById('contraseñaInput');
const nombreInput = document.getElementById("nombreInput");
const documentoInput = document.getElementById('documentoInput');
const rol = document.getElementById('rol');
const mensaje = document.getElementById('mensaje');
const botonRegistro = document.getElementById('botonRegistro');

// Función para mostrar mensajes en pantalla
function mostrarMensaje(msg, isError = false) {
    mensaje.textContent = msg;
    mensaje.className = 'mensaje ' + (isError ? 'error' : 'exito');
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

function guardarUsuario() {
        const correo = correoInput.value.trim();
        const contraseña = contraseñaInput.value.trim();
        const nombre = nombreInput.value.trim();
        const documento = documentoInput.value.trim();
        const rolSeleccionado = rol.value.trim();

    if (!correo || !contraseña || !nombre || !documento || !rolSeleccionado) {
        return mostrarMensaje("hay algun campo sin llenar", true);
        
    }

    const nuevoUsuario = {
        correo,
        contraseña,
        nombre,
        documento,
        rolSeleccionado,
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = listaUsuarios.some(u => u.documento === nuevoUsuario.documento);
    if (existe) {
        return mostrarMensaje("Ya existe un usuario con este documento.", true);
    }



    listaUsuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    mostrarMensaje("Usuario registrado con éxito", false);

    // Limpiar campos
    correoInput.value = "";
    contraseñaInput.value = "";
    nombreInput.value = "";
    documentoInput.value = "";
    rol.value = "";
}

botonRegistro.addEventListener('click', function(e) {
    e.preventDefault();
    guardarUsuario();
});



