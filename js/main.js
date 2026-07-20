document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Swiper Principal (Hero)
    const mainSwiper = new Swiper(".mySwiper", {
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

    // 2. Inicializar Carrusel de Productos Continuo
    const productsSwiper = new Swiper(".carrusel-productos", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        freeMode: true,
        grabCursor: true,
    });

    // 3. Header dinámico y Botón de WhatsApp al hacer Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const whatsappBtn = document.querySelector('.whatsapp-float');
        
        const scrollPosition = window.scrollY;

        // Efecto en el header
        header.classList.toggle('shrink', scrollPosition > 50);

        // Mostrar u ocultar el botón flotante de WhatsApp
        if (whatsappBtn) {
            whatsappBtn.classList.toggle('show', scrollPosition > 50);
        }
    });
    
    // 4. Modal de Imagen por delegación de eventos
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');

        // Abrir modal al hacer clic en imagen de producto
        if (e.target.tagName === 'IMG' && e.target.closest('.producto-card')) {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
        }
    });

    // Permitir cerrar el modal haciendo clic fuera de la imagen o en la cruz (ya manejada en HTML)
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});