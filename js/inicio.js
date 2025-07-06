/* ----- Login----------- */

/*SI NO QUIEREN QUE CUANDO CARGUE LA PAGINA OTRA VEZ ENTRE DE UNA BORRA ESTA PARTE, ES QUE APENAR DENTRA (SI YA ESTA LOGUEADO) NO TIENE QUE LOGUEARSE DE NUEVO
SI NO QUE LO REFIRIGE DE UNA A LA PAGINA QUE LE CORRESPONDA A ESA ZORRITA */

const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

if (usuarioLogueado) {
  if (usuarioLogueado.rolSeleccionado === "instructor") {
    /*window.location.href = "../pages/instructor.html";*/
  } else if (usuarioLogueado.rolSeleccionado === "aprendiz") {
    /*window.location.href = "../pages/aprendiz.html";*/
  } else if (usuarioLogueado.rolSeleccionado === "cliente") {
    /*window.location.href = "../pages/cliente.html";*/
  }
}


const documentoLogin = document.getElementById("documentoInputLogin");
const contraseñaLogin = document.getElementById("contraseñaInput");
const botonConfirmar = document.getElementById("botonSesion");
const mensajeLogin = document.getElementById("mensajeLogin");
const mostrarContraseñaLogin = document.getElementById(
  "mostrarContraseñaLogin"
);

mostrarContraseñaLogin.addEventListener("click", () => {
  const type =
    contraseñaLogin.getAttribute("type") === "password" ? "text" : "password";
  contraseñaLogin.setAttribute("type", type);

  mostrarContraseñaLogin.classList.toggle("bx-show"); // Cambiar ícono visualmente
  mostrarContraseñaLogin.classList.toggle("bx-hide");
});

function mostrarMensajeLogin(msg, isError = false) {
  mensajeLogin.textContent = msg;
  mensajeLogin.className = "mensaje " + (isError ? "error" : "exito");
  mensajeLogin.style.display = "block";

  setTimeout(() => {
    mensajeLogin.style.display = "none";
  }, 3000);
}

function Loguearme() {
  const documento = documentoLogin.value.trim(); // Obtener el valor del input y quitar espacios extra
  const contraseña = contraseñaLogin.value.trim(); // Obtener el valor del input y quitar espacios extra

  if (!documento || !contraseña) {
    return mostrarMensajeLogin("hay algun campo sin llenar", true);
  }

    if (!/^\d{10}$/.test(documento)) {
      documentoLogin.style.border = "1px solid #e90b0b";
      setTimeout(() => {
            documentoLogin.style.border = "";
      }, 2000);

    return mostrarMensajeLogin("El documento mal digitado.",true);
  }


  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // el json.parse convierte un aobeto string a un objeto array
  documentoLogin.value = "";
  contraseñaLogin.value = "";

  const usuario = listaUsuarios.find(
    (u) => u.documento === documento && u.contraseña === contraseña
  );
  if (usuario) {
  mostrarMensajeLogin("Inicio Exitoso.", false);
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
  setTimeout(() => {
    if (usuario.rolSeleccionado === "instructor") {
          /*window.location.href = "../pages/instructor.html";*/ /*AQUI TAMBIEN DEPENDIENDO DEL ROL TIN PONGAN SUS PAGINAS ASI COMO ESTA AHI */
        } else if (usuario.rolSeleccionado === "aprendiz") {
          /*window.location.href = "../pages/aprendiz.html";*/
        } else if (usuario.rolSeleccionado === "cliente") {
          /*window.location.href = "../pages/cliente.html";*/
        }
      }, 1000);
    } else {
      return mostrarMensajeLogin("Documento o contraseña incorrecto.", true);
    }

}

botonConfirmar.addEventListener("click", function (e) {
  e.preventDefault();
  Loguearme();
});

/* ----- Registro----------- */

const correoInput = document.getElementById("correoInput");
const contraseñaRegistro = document.getElementById("contraseñaInputRegistro");
const nombreInput = document.getElementById("nombreInput");
const documentoRegistro = document.getElementById("documentoInputRegistro");
const rol = document.getElementById("rol");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const botonRegistro = document.getElementById("botonRegistro");
const mostrarContraseñaRegistro = document.getElementById("mostrarContraseñaRegistro");


mostrarContraseñaRegistro.addEventListener("click", () => {
  const type =
    contraseñaRegistro.getAttribute("type") === "password"
      ? "text"
      : "password";
  contraseñaRegistro.setAttribute("type", type);

  mostrarContraseñaRegistro.classList.toggle("bx-show");
  mostrarContraseñaRegistro.classList.toggle("bx-hide");
});

function mostrarMensajeRegistro(msg, isError = false) {
  mensajeRegistro.textContent = msg;
  mensajeRegistro.className = "mensaje " + (isError ? "error" : "exito");
  mensajeRegistro.style.display = "block";

  setTimeout(() => {
    mensajeRegistro.style.display = "none";
  }, 3000);
}

function guardarUsuario() {
  const correo = correoInput.value.trim();
  const contraseña = contraseñaRegistro.value.trim();
  const nombre = nombreInput.value.trim();
  const documento = documentoRegistro.value.trim();
  const rolSeleccionado = rol.value.trim();

  if (!correo || !contraseña || !nombre || !documento || !rolSeleccionado) {
    return mostrarMensajeRegistro("Hay algún campo sin llenar", true);
  }

  if (!/\S+@\S+\.\S+/.test(correo)) {
    return mostrarMensajeRegistro("Correo inválido.", true);
  }
  if (!/^\d{10}$/.test(documento)) {
    documentoRegistro.style.border = "1px solid #e90b0b";
    setTimeout(() => {
          documentoRegistro.style.border = "";
    }, 3000);

    return mostrarMensajeRegistro("El documento mal digitado.",true);
  }

  const nuevoUsuario = {
    correo,
    contraseña,
    nombre,
    documento,
    rolSeleccionado,
  };

  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = listaUsuarios.some(
    (u) => u.documento === nuevoUsuario.documento
  );
  if (existe) {
    return mostrarMensajeRegistro("Ya existe un usuario con este documento.",true);
  }

  const existeCorreo = listaUsuarios.some(

    (u) => u.correo === nuevoUsuario.correo);
    if (existeCorreo) {
      correoInput.style.border = "1px solid #e90b0b";
    setTimeout(() => {
          correoInput.style.border = "";
    }, 3000);
    return mostrarMensajeRegistro("Ya existe un usuario con este correo.",true);

  }

  listaUsuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  mostrarMensajeRegistro("Usuario registrado con éxito", false);

  if (rol.value.trim() == "instructor") {
        setTimeout(() => {

                  /* window.location.href = "../pages/instructor.html"*/ /*PONGAN AQUI LAS PAGINAS PUTITAS Con los nombre que ustedes les allan (no me acuerdo como se escribe allan) puesto*/
        }, 1000);
    }else if(rol.value.trim() == "aprendiz"){
      setTimeout(() => {
      /*window.location.href = "../pages/aprendiz.html";*/
      }, 1000);
    }else if(rol.value.trim() == "cliente"){
      setTimeout(() => {
          /* window.location.href = "../pages/cliente.html"*/
      }, 1000);
  }


  // Limpiar campos
  correoInput.value = "";
  contraseñaRegistro.value = "";
  nombreInput.value = "";
  documentoRegistro.value = "";
  rol.value = "";
}

botonRegistro.addEventListener("click", function (e) {
  e.preventDefault();
  guardarUsuario();
});

/*----Recuperacion de contraseña--------- */

const documentoRecuperar = document.getElementById("documentoInputRecuperar");
const nuevaContraseña = document.getElementById("nuevaContraseña");
const confirmar = document.getElementById("confirmar");
const buscarBtn = document.getElementById("buscarUsuario");
const mensajeRecuperar = document.getElementById("mensajeRecuperar");
const mostrarContraseña = document.getElementById("mostrarContraseñaRecuperar");

mostrarContraseñaRecuperar.addEventListener("click", () => {
  const type =
    nuevaContraseña.getAttribute("type") === "password" ? "text" : "password";
  nuevaContraseña.setAttribute("type", type);

  mostrarContraseñaRecuperar.classList.toggle("bx-show");
  mostrarContraseñaRecuperar.classList.toggle("bx-hide");
});

let usuarioEncontradoIndex = -1;
let listaUsuarios = [];

function mostrarMensajeRecuperar(msg, isError = false) {
  mensajeRecuperar.textContent = msg;
  mensajeRecuperar.className = "mensaje " + (isError ? "error" : "exito");
  mensajeRecuperar.style.display = "block";
  setTimeout(() => {
    mensajeRecuperar.style.display = "none";
  }, 3000);
}

function buscarUsuarioFn() {
  const documento = documentoRecuperar.value.trim();

  if (!documento) {
    return mostrarMensajeRecuperar("Debe ingresar el documento.", true);
  }
    if (!/^\d{10}$/.test(documento)) {
    documentoRecuperar.style.border = "1px solid #e90b0b";
    setTimeout(() => {
          documentoRecuperar.style.border = "";
    }, 3000);

    return mostrarMensajeRecuperar("El documento mal digitado.",true);
  }


  listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarioEncontradoIndex = listaUsuarios.findIndex(
    (u) => u.documento === documento
  );

  if (usuarioEncontradoIndex === -1) {
    return mostrarMensajeRecuperar("Documento no encontrado.", true);
  }

  nuevaContraseña.style.display = "block";
  mostrarContraseña.style.display = "block";
  confirmar.style.display = "inline-block";
  buscarBtn.style.display = "none";
  mostrarMensajeRecuperar("Documento encontrado. Ingrese nueva contraseña.");
  documentoRecuperar.disabled = true;
}

function cambiarContraseña() {
  const contraseñaNueva = nuevaContraseña.value.trim();

  if (!contraseñaNueva) {
    return mostrarMensajeRecuperar("Ingrese una nueva contraseña.", true);
  }

  if (listaUsuarios[usuarioEncontradoIndex].contraseña === contraseñaNueva) {
    return mostrarMensajeRecuperar(
      "La nueva contraseña no puede ser igual a la anterior.",
      true
    );
  }

  listaUsuarios[usuarioEncontradoIndex].contraseña = contraseñaNueva;
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  mostrarMensajeRecuperar("Contraseña modificada con éxito.");

  setTimeout(() => {
    location.reload(); // Volver a la vista principal
  }, 1000);
}

buscarBtn.addEventListener("click", buscarUsuarioFn);
confirmar.addEventListener("click", function (e) {
  e.preventDefault();
  cambiarContraseña();
});

/*---------Vistas intercambio----------- */

const vistaLogin = document.getElementById("vista-login");
const vistaRegistro = document.getElementById("vista-registro");
const vistaRecuperar = document.getElementById("vista-recuperar");

document.getElementById("link-registrar").addEventListener("click", () => {
  vistaLogin.style.display = "none";
  vistaRegistro.style.display = "block";
  vistaRecuperar.style.display = "none";
});

document.getElementById("link-volver-login1").addEventListener("click", () => {
  vistaLogin.style.display = "block";
  vistaRegistro.style.display = "none";
  vistaRecuperar.style.display = "none";
});

document.getElementById("link-recuperar").addEventListener("click", () => {
  vistaLogin.style.display = "none";
  vistaRegistro.style.display = "none";
  vistaRecuperar.style.display = "block";
});

document.getElementById("link-volver-login2").addEventListener("click", () => {
  vistaLogin.style.display = "block";
  vistaRegistro.style.display = "none";
  vistaRecuperar.style.display = "none";
});
