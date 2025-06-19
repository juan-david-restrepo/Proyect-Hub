const documentoInput = document.getElementById('documentoInput')
const contraseñaInput = document.getElementById('contraseñaInput')
const botonConfirmar = document.getElementById('botonSesion')
const mensaje = document.getElementById('mensaje');


function mostrarMensaje(msg, isError = false) {
    mensaje.textContent = msg;
    mensaje.className = 'mensaje ' + (isError ? 'error' : 'exito');
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

function Loguearme() {
    const documento = documentoInput.value.trim(); // Obtener el valor del input y quitar espacios extra
    const contraseña = contraseñaInput.value.trim(); // Obtener el valor del input y quitar espacios extra

        if (!documento || !contraseña) {
        return mostrarMensaje("hay algun campo sin llenar", true);
        
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // el json.parse convierte un aobeto string a un objeto array
    documentoInput.value = '';
    contraseñaInput.value = '';

    const usuario = listaUsuarios.find(u => u.documento === documento && u.contraseña === contraseña);
    if (usuario) {
        return mostrarMensaje("Inicio Exitoso.", false);
    }else{
        return mostrarMensaje("Usuario o contraseña incorrecto.", true);
    }

}

botonSesion.addEventListener('click', Loguearme);

