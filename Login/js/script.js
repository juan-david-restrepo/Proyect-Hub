// 1. Obtener referencias a los elementos del DOM
const nameInput = document.getElementById('nameInput'); // El campo de texto
const saveButton = document.getElementById('saveButton'); // El botón
const savedNameDisplay = document.getElementById('savedNameDisplay'); // Donde mostraremos el nombre guardado
const messageElement = document.getElementById('message'); // Para mensajes temporales

// 2. Función para mostrar un mensaje (éxito o error)
function showMessage(msg, isError = false) {
    messageElement.textContent = msg;
    messageElement.style.color = isError ? 'red' : 'green';
    messageElement.style.display = 'block'; // Mostrar el mensaje
    setTimeout(() => {
        messageElement.style.display = 'none'; // Ocultar después de 3 segundos
    }, 3000);
}

// 3. Función para guardar el nombre en LocalStorage
function saveName() {
    const name = nameInput.value.trim(); // Obtener el valor del input y quitar espacios extra

    if (name === '') {
        showMessage('Por favor, ingresa tu nombre.', true);
        return; // Detener la función si el campo está vacío
    }

    // Guardar el nombre en LocalStorage con la clave 'userName'
    localStorage.setItem('userName', name);
    showMessage('¡Nombre guardado con éxito!', false);

    // Actualizar la visualización en la página
    displaySavedName();

    // Limpiar el input después de guardar
    nameInput.value = '';
}

// 4. Función para mostrar el nombre guardado (si existe)
function displaySavedName() {
    // Obtener el nombre de LocalStorage
    const savedName = localStorage.getItem('userName');

    if (savedName) {
        // Si hay un nombre guardado, lo mostramos
        savedNameDisplay.textContent = `Hola de nuevo, ${savedName}!`;
    } else {
        // Si no hay nombre, mostramos un mensaje por defecto
        savedNameDisplay.textContent = 'No hay nombre guardado todavía.';
    }
}

// 5. Agregar un "escuchador de eventos" al botón
// Cuando se haga clic en 'saveButton', se ejecutará la función 'saveName'
saveButton.addEventListener('click', saveName);

// 6. Al cargar la página, intentar mostrar el nombre guardado
// Esto se ejecuta cuando el DOM (HTML) está completamente cargado
document.addEventListener('DOMContentLoaded', displaySavedName);
