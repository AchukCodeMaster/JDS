class Modal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalImages = document.getElementById('modalImages');
        this.closeBtn = document.querySelector('.close-modal');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.onclick = () => this.close();
        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        };
    }

    open(folder) {
        this.modalTitle.textContent = folder.title;
        this.modalImages.innerHTML = folder.images
            .map(imageUrl => `
                <div class="modal-image-container">
                    <img src="${imageUrl}" alt="" class="modal-image">
                </div>
            `).join('');
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}