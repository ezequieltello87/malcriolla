let productos = [];
let carrito = [];

const contenedorDetalle = document.getElementById("detalle-producto");
const carritoModal = document.getElementById("carrito-modal");
const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const contenedorCarritoItems = document.getElementById("carrito-items");
const contadorCarrito = document.getElementById("contador-carrito");
const carritoTotal = document.getElementById("carrito-total");
const btnFinalizar = document.getElementById("btn-finalizar");

// Capturar el ID desde la URL (ej: producto.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productoId = parseInt(urlParams.get('id'));

async function inicializarDetalle() {
    try {
        const respuesta = await fetch('productos.json');
        productos = await respuesta.json();
        cargarDetalleProducto();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        if (contenedorDetalle) {
            contenedorDetalle.innerHTML = `<p style="text-align: center; color: #ff5555;">Error al cargar el producto.</p>`;
        }
    }
}

function cargarDetalleProducto() {
    if (!contenedorDetalle) return;

    // Buscar el producto por su ID
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        contenedorDetalle.innerHTML = `<p style="text-align: center; color: #777;">Producto no encontrado.</p>`;
        return;
    }

    // Manejar soporte tanto para una sola imagen ("imagen") como para varias ("imagenes")
    let imagenesArray = producto.imagenes ? producto.imagenes : [producto.imagen];
    let imagenPrincipal = imagenesArray[0];

    // Generar HTML del detalle
    contenedorDetalle.innerHTML = `
        <div class="galeria-detalle">
            <div class="imagen-principal-container">
                <img id="img-principal" src="${imagenPrincipal}" alt="${producto.nombre}">
            </div>
            <div class="minis-galeria">
                ${imagenesArray.map((img, index) => `
                    <img src="${img}" alt="Miniatura ${index + 1}" onclick="cambiarImagenPrincipal('${img}')" class="miniatura-img">
                `).join('')}
            </div>
        </div>
        <div class="info-detalle">
            <h1>${producto.nombre}</h1>
            <p class="precio-detalle">$${producto.precio.toLocaleString()}</p>
            <p class="talle-detalle"><strong>Talle:</strong> ${producto.talle}</p>
            <p class="descripcion-detalle">${producto.descripcion || "Sin descripción disponible por el momento."}</p>
            <button class="btn-agregar-detalle" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
        </div>
    `;
}

// Función global para cambiar la foto principal al hacer clic en las miniaturas
window.cambiarImagenPrincipal = function(urlImagen) {
    const imgPrincipal = document.getElementById("img-principal");
    if (imgPrincipal) {
        imgPrincipal.src = urlImagen;
    }
}

// Lógica del carrito compartida
window.agregarAlCarrito = function(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    const enCarrito = carrito.find(p => p.id === id);

    if (enCarrito) {
        enCarrito.cantidad++;
    } else {
        // Asegurar que guarde la imagen correcta para el carrito
        let imgCar = productoEncontrado.imagenes ? productoEncontrado.imagenes[0] : productoEncontrado.imagen;
        carrito.push({ ...productoEncontrado, imagen: imgCar, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    if (!contenedorCarritoItems) return;
    contenedorCarritoItems.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        totalItems += item.cantidad;
        contenedorCarritoItems.innerHTML += `
            <div class="carrito-item">
                <img src="${item.imagen}" width="50">
                <div>
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio} x ${item.cantidad}</p>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})">&times;</button>
            </div>
        `;
    });

    if(contadorCarrito) contadorCarrito.innerText = totalItems;
    if(carritoTotal) carritoTotal.innerText = `$${total.toLocaleString()}`;
}

window.eliminarDelCarrito = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

if(btnAbrirCarrito && carritoModal) {
    btnAbrirCarrito.addEventListener("click", () => carritoModal.classList.add("activo"));
}
if(btnCerrarCarrito && carritoModal) {
    btnCerrarMiniModal = btnCerrarCarrito.addEventListener("click", () => carritoModal.classList.remove("activo"));
}

if(btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        let mensaje = "Hola! Vengo de la web MALCRIOLLA y quiero hacer el siguiente pedido:%0A";
        let total = 0;

        carrito.forEach(item => {
            mensaje += `- ${item.cantidad}x ${item.nombre} (Talle: ${item.talle}) - $${item.precio * item.cantidad}%0A`;
            total += item.precio * item.cantidad;
        });

        mensaje += `%0A*Total a abonar: $${total.toLocaleString()}*`;
        let numeroWhatsApp = "5493410000000"; 
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    });
}

// Inicializar la aplicación de detalle
inicializarDetalle();

// Control del Menú Hamburguesa en Celular para producto.html
const btnMenuHamburguesa = document.getElementById("btn-menu-hamburguesa");
const btnCerrarMenu = document.getElementById("btn-cerrar-menu");
const menuMovil = document.getElementById("menu-movil"); // Asegurate de incluir el div del menú móvil en producto.html si usás celular

if (btnMenuHamburguesa && menuMovil) {
    btnMenuHamburguesa.addEventListener("click", () => {
        menuMovil.classList.add("activo");
    });
}

if (btnCerrarMenu && menuMovil) {
    btnCerrarMenu.addEventListener("click", () => {
        menuMovil.classList.remove("activo");
    });
}

// --- Control del Zoom de Imagen (Definitivo) ---
const modalZoom = document.getElementById("modalZoom");
const imgZoomAmpliada = document.getElementById("imgZoomAmpliada");
const btnCerrarZoom = document.getElementById("btnCerrarZoom");

// Función global que se ejecuta al hacer clic en la foto principal (funciona incluso al cambiar de miniatura)
window.abrirZoom = function(elementoImg) {
    if (modalZoom && imgZoomAmpliada) {
        modalZoom.classList.add("activo");
        imgZoomAmpliada.src = elementoImg.src;
    }
}

// Cerrar al hacer clic en la "X"
if (btnCerrarZoom) {
    btnCerrarZoom.addEventListener("click", () => {
        modalZoom.classList.remove("activo");
    });
}

// Cerrar al hacer clic fuera de la foto (en el fondo oscuro)
if (modalZoom) {
    modalZoom.addEventListener("click", (e) => {
        if (e.target === modalZoom) {
            modalZoom.classList.remove("activo");
        }
    });
}