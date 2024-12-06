document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const modal = new Modal();

  function createFolderElement(folder) {
    return `
            <div class="folder" data-id="${folder.id}">
                <div class="folder-header">
                    <svg class="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <h2 class="folder-title">${folder.title}</h2>
                </div>
                <div class="folder-image">
                    <img src="${folder.imageUrl}" alt="${folder.title}">
                </div>
                <p class="folder-description">${folder.description}</p>
            </div>
        `;
  }

  function renderGallery() {
    galleryGrid.innerHTML = galleryData
      .map((folder) => createFolderElement(folder))
      .join("");
  }

  function handleFolderClick(event) {
    const folder = event.target.closest(".folder");
    if (folder) {
      const folderId = parseInt(folder.dataset.id);
      const folderData = galleryData.find((f) => f.id === folderId);
      if (folderData) {
        modal.open(folderData);
      }
    }
  }

  // Initialize gallery and event listeners
  renderGallery();
  galleryGrid.addEventListener("click", handleFolderClick);
});

//Testimonial Manager
