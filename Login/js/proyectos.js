function expandirProyecto(elemento, titulo, palabrasClave, descripcionLarga) {
  const imgSrc = elemento.querySelector('img').src;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  // Convertir palabras clave en lista HTML
  const listaPalabras = palabrasClave.map(p => `<li><i class='bx bx-chevron-right'></i> ${p}</li>`).join('');

  overlay.innerHTML = `
    <div class="modal-content">
      <img src="${imgSrc}" alt="logo expandido">
      <h2 style="text-align:center;">${titulo}</h2>
      <div class="info-extra">
        <ul class="lista-palabras">${listaPalabras}</ul>
        <p class="descripcionLarga">${descripcionLarga}</p>
      </div>
      <div class="botonesEmergentes">
        <button class="contactar-btn">Contáctar</button>
        <button class="close-modal">Cerrar</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Cerrar al hacer clic en "Cerrar"
  overlay.querySelector('.close-modal').addEventListener('click', () => {
    overlay.remove();
  });

  // Cerrar si haces clic fuera del contenedor
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}
