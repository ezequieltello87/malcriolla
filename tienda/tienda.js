let productos = [];
let carrito = [];

// Elementos del DOM
const grillaProductos = document.getElementById("grilla-productos");
const carritoModal = document.getElementById("carrito-modal");
const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const contenedorCarritoItems = document.getElementById("carrito-items");
const contadorCarrito = document.getElementById("contador-carrito");
const carritoTotal = document.getElementById("carrito-total");
const btnFinalizar = document.getElementById("btn-finalizar");

// Capturar la categoría desde la URL
const urlParams = new URLSearchParams(window.location.search);
const categoriaActual = urlParams.get('cat');

// Cargar los productos desde el archivo JSON profesional
async function inicializarTienda() {
    try {
        const respuesta = await fetch('productos.json');
        productos = await respuesta.json();
        cargarProductos();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        if (grillaProductos) {
            grillaProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff5555;">Error al cargar el catálogo.</p>`;
        }
    }
}

// Renderizar productos en la página filtrando por categoría si corresponde
function cargarProductos() {
    if (!grillaProductos) return;
    grillaProductos.innerHTML = "";

    let productosFiltrados = productos;
    if (categoriaActual) {
        productosFiltrados = productos.filter(p => p.categoria === categoriaActual);
    }

    if (productosFiltrados.length === 0) {
        grillaProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">No hay productos en esta categoría por el momento.</p>`;
        return;
    }

    productosFiltrados.forEach(prod => {
        // Soporte inteligente para productos con 1 o varias imágenes
        let fotoProducto = prod.imagen ? prod.imagen : (prod.imagenes ? prod.imagenes[0] : '');

        grillaProductos.innerHTML += `
            <div class="tarjeta-producto">
                <a href="producto.html?id=${prod.id}">
                    <img src="${fotoProducto}" alt="${prod.nombre}">
                </a>
                <h3><a href="producto.html?id=${prod.id}" style="color:inherit; text-decoration:none;">${prod.nombre}</a></h3>
                <p class="precio">$${prod.precio.toLocaleString()}</p>
                <p class="talle">Talle: ${prod.talle}</p>
                <button onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
            </div>
        `;
    });
}

// Agregar producto
window.agregarAlCarrito = function(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    const enCarrito = carrito.find(p => p.id === id);

    if (enCarrito) {
        enCarrito.cantidad++;
    } else {
        // Soporte unificado para productos con 1 o varias imágenes
        let fotoCarrito = productoEncontrado.imagen ? productoEncontrado.imagen : (productoEncontrado.imagenes ? productoEncontrado.imagenes[0] : '');
        carrito.push({ ...productoEncontrado, imagen: fotoCarrito, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualizar vista del carrito
function actualizarCarrito() {
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

    contadorCarrito.innerText = totalItems;
    carritoTotal.innerText = `$${total.toLocaleString()}`;
}

window.eliminarDelCarrito = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Abrir y cerrar modal del carrito
btnAbrirCarrito.addEventListener("click", () => carritoModal.classList.add("activo"));
btnCerrarCarrito.addEventListener("click", () => carritoModal.classList.remove("activo"));

// Enviar pedido por WhatsApp
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

// Control del Menú Hamburguesa en Celular
const btnMenuHamburguesa = document.getElementById("btn-menu-hamburguesa");
const btnCerrarMenu = document.getElementById("btn-cerrar-menu");
const menuMovil = document.getElementById("menu-movil");

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

// Arrancar la aplicación
inicializarTienda();

grillaProductos.innerHTML += `
    <div class="tarjeta-producto">
        <a href="producto.html?id=${prod.id}">
            <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
        </a>
        <h3><a href="producto.html?id=${prod.id}" style="color:inherit; text-decoration:none;">${prod.nombre}</a></h3>
        <p class="precio">$${prod.precio.toLocaleString()}</p>
        <button onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
    </div>
`;