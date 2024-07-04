document.addEventListener('DOMContentLoaded', function() {
  const inputTexto = document.querySelector('.texto1');
  const textoLateral = document.querySelector('.texto-lateral');
  const mensajeEncriptar = document.querySelector('.mensaje-encriptar');

  // Verificar si el texto contiene letras mayúsculas o acentos
  inputTexto.addEventListener('input', function() {
    const texto = inputTexto.value;
    const tieneMayusculas = /[A-Z]/.test(texto);
    const tieneAcentos = /[áéíóúÁÉÍÓÚ]/.test(texto);

    if (tieneMayusculas || tieneAcentos) {
      mensajeEncriptar.classList.add('alerta');
      alert('Por favor, ingrese solo letras minúsculas y sin acentos.');
    } else {
      mensajeEncriptar.classList.remove('alerta');
    }
  });

  const botonEncriptar = document.querySelector('.boton-encriptar');
  botonEncriptar.addEventListener('click', function() {
    // Obtener el valor del input
    const textoOriginal = inputTexto.value.trim();

    if (textoOriginal === '') {
      alert('Por favor, ingrese un texto válido.');
      return;
    }

    // Encriptar el texto usando AES
    const textoEncriptado = encriptarAES(textoOriginal);

    // Mostrar el texto encriptado en el lateral
    textoLateral.innerHTML = `<p class="parrafo">${textoEncriptado}</p>`;
    textoLateral.style.display = 'block'; // Mostrar el contenedor lateral

    // Limpiar el input para mostrar el placeholder nuevamente
    inputTexto.value = '';

    // Mostrar el párrafo oculto
    const parrafoOculto = document.querySelector('.parrafo');
    parrafoOculto.style.display = 'block';
  });

  const botonCopiar = document.querySelector('.boton-copiar');
  botonCopiar.addEventListener('click', function() {
    // Obtener el texto encriptado del lateral
    const parrafoEncriptado = document.querySelector('.parrafo');
    const textoEncriptado = parrafoEncriptado.textContent.trim();

    // Copiar el texto encriptado al input
    inputTexto.value = textoEncriptado;
  });

  const botonDesencriptar = document.querySelector('.boton-desencriptar');
  botonDesencriptar.addEventListener('click', function() {
    // Obtener el texto encriptado del input
    const textoEncriptado = inputTexto.value.trim();

    // Desencriptar el texto usando AES
    const textoDesencriptado = desencriptarAES(textoEncriptado);

    // Mostrar el texto desencriptado en el lateral
    textoLateral.innerHTML = `<p class="parrafo">${textoDesencriptado}</p>`;
    textoLateral.style.display = 'block'; // Mostrar el contenedor lateral

    // Limpiar el input para mostrar el placeholder nuevamente
    inputTexto.value = '';

    // Mostrar el párrafo oculto
    const parrafoOculto = document.querySelector('.parrafo');
    parrafoOculto.style.display = 'block';
  });

  // Función para encriptar el texto usando AES
  function encriptarAES(texto) {
    const passphrase = 'miClave'; // Clave de encriptación (debe ser segura y secreta)
    const encrypted = CryptoJS.AES.encrypt(texto, passphrase).toString();
    return encrypted;
  }

  // Función para desencriptar el texto usando AES
  function desencriptarAES(textoEncriptado) {
    const passphrase = 'miClave'; // Clave de encriptación (debe ser la misma que la usada para encriptar)
    const bytes = CryptoJS.AES.decrypt(textoEncriptado, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
});
