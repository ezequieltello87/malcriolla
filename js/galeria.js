document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DEL MODAL Y ZOOM ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const imagenesGaleria = document.querySelectorAll('.galeria-grid img');

    // Abrir modal al hacer clic en la galería[cite: 9]
    imagenesGaleria.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.style.transform = 'scale(1)';
            modalImg.style.transformOrigin = 'center center';
        });
    });

    // Efecto Zoom al pasar/mover el mouse sobre la foto abierta[cite: 9]
    modalImg.addEventListener('mousemove', function(e) {
        const rect = modalImg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        modalImg.style.transformOrigin = `${x}% ${y}%`;
        modalImg.style.transform = 'scale(2)'; 
    });

    // Volver al tamaño normal cuando el mouse sale de la imagen[cite: 9]
    modalImg.addEventListener('mouseleave', function() {
        modalImg.style.transform = 'scale(1)';
        modalImg.style.transformOrigin = 'center center';
    });

    // Cerrar modal al hacer clic fuera de la imagen[cite: 9]
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-img-container')) {
                modal.style.display = 'none';
                modalImg.style.transform = 'scale(1)';
            }
        });
    }

    // --- LÓGICA DEL BOTÓN DE AUDIO (PLAY / PAUSE) ---
    const btnAudio = document.getElementById('btnAudio');
    const audioGaleria = document.getElementById('audioGaleria');
    const audioIcon = document.getElementById('audioIcon');
    const audioText = document.getElementById('audioText');

    if (btnAudio && audioGaleria) {
        btnAudio.addEventListener('click', function() {
            if (audioGaleria.paused) {
                audioGaleria.play().then(() => {
                    if (audioIcon) audioIcon.textContent = '❚❚';
                    if (audioText) audioText.textContent = 'Pause';
                }).catch(error => {
                    console.log("Error al reproducir audio:", error);
                });
            } else {
                audioGaleria.pause();
                if (audioIcon) audioIcon.textContent = '▶';
                if (audioText) audioText.textContent = 'Play';
            }
        });
    }
});