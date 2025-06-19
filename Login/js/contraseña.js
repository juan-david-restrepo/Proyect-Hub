const documentoInput = document.getElementById('documentoInput');
const nuevaContraseña = document.getElementById('nuevaContraseña');
const confirmar = document.getElementById('confirmar');
const buscarBtn = document.getElementById('buscarUsuario');
const mensaje = document.getElementById('mensaje');

let usuarioEncontradoIndex = -1;
let listaUsuarios = [];

function mostrarMensaje(msg, isError = false) {
    mensaje.textContent = msg;
    mensaje.className = 'mensaje ' + (isError ? 'error' : 'exito');
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 1000);
}

function buscarUsuarioFn() {
    const documento = documentoInput.value.trim();

    if (!documento) {
        return mostrarMensaje("Debe ingresar el documento.", true);
    }

    listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarioEncontradoIndex = listaUsuarios.findIndex(u => u.documento === documento);

    if (usuarioEncontradoIndex === -1) {
        return mostrarMensaje("Documento no encontrado.", true);
    }

    
    nuevaContraseña.style.display = 'block';
    confirmar.style.display = 'inline-block';
    buscarBtn.style.display = 'none';

    mostrarMensaje("Documento encontrado. Ingrese nueva contraseña.");
    documentoInput.disabled = true;
}

function cambiarContraseña() {
    const contraseñaNueva = nuevaContraseña.value.trim();

    if (!contraseñaNueva) {
        return mostrarMensaje("Ingrese una nueva contraseña.", true);
    }

    if (listaUsuarios[usuarioEncontradoIndex].contraseña === contraseñaNueva) {
        return mostrarMensaje("La nueva contraseña no puede ser igual a la anterior.", true);
    }

    listaUsuarios[usuarioEncontradoIndex].contraseña = contraseñaNueva;
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    mostrarMensaje("Contraseña modificada con éxito.");

    setTimeout(() => {
        window.location.href = "../pages/Login.html";
    }, 1000);
}

buscarBtn.addEventListener('click', buscarUsuarioFn);
confirmar.addEventListener('click', function(e){
    e.preventDefault(); 
    cambiarContraseña()
});