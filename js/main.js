document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Swiper Principal (Hero) si existe
    if (document.querySelector(".mySwiper")) {
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: { 
                delay: 4000, 
                disableOnInteraction: false 
            },
            navigation: { 
                nextEl: ".swiper-button-next", 
                prevEl: ".swiper-button-prev" 
            },
            keyboard: { 
                enabled: true 
            },
        });
    }

    // 2. Inicializar Carrusel de Buzos si existe
    if (document.querySelector(".carrusel-buzos")) {
        new Swiper(".carrusel-buzos", {
            slidesPerView: 'auto',
            spaceBetween: 25,
            loop: true,
            grabCursor: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    spaceBetween: 30,
                }
            }
        });
    }

    // 3. Header dinámico y Botón de WhatsApp al hacer Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const whatsappBtn = document.querySelector('.whatsapp-float');
        const scrollPosition = window.scrollY;

        if (header) header.classList.toggle('shrink', scrollPosition > 50);
        if (whatsappBtn) whatsappBtn.classList.toggle('show', scrollPosition > 50);
    });
    
    // 4. Modal de Imagen por delegación de eventos
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');

        if (modal && modalImg && e.target.tagName === 'IMG' && e.target.closest('.producto-card')) {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
        }
    });

    // 5. Control del Menú Hamburguesa Lateral
    const menuBtn = document.querySelector('.menu-btn');
    const menuLateral = document.getElementById('menuLateral');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuCerrar = document.getElementById('menuCerrar');

    function abrirMenu(e) {
        if (e) e.stopPropagation();
        if (menuLateral) menuLateral.classList.add('activo');
        if (menuOverlay) menuOverlay.classList.add('activo');
    }

    function cerrarMenu() {
        if (menuLateral) menuLateral.classList.remove('activo');
        if (menuOverlay) menuOverlay.classList.remove('activo');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', abrirMenu);
    }

    if (menuCerrar) {
        menuCerrar.addEventListener('click', cerrarMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', cerrarMenu);
    }

    // Permitir cerrar el modal haciendo clic fuera de la imagen
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
