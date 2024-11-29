document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const body = document.body;

  // Create modal elements
  const modal = document.createElement("div");
  modal.className = "modal";
  const modalImg = document.createElement("img");
  modalImg.className = "modal-content";
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "&times;";

  modal.appendChild(modalImg);
  modal.appendChild(closeBtn);
  body.appendChild(modal);

  // Open modal
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      modalImg.src = imgSrc;
      modal.classList.add("active");
      body.style.overflow = "hidden";
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove("active");
    if (!document.querySelector(".folder-toggle:checked")) {
      body.style.overflow = "auto";
    }
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Folder animation and fullscreen view
  const folders = document.querySelectorAll(".folder-toggle");
  folders.forEach((folder) => {
    folder.addEventListener("change", () => {
      const label = folder.nextElementSibling;
      const icon = label.querySelector("i");
      const imageGrid = label.nextElementSibling;

      folders.forEach((otherFolder) => {
        if (otherFolder !== folder && otherFolder.checked) {
          otherFolder.checked = false;
          const otherLabel = otherFolder.nextElementSibling;
          const otherIcon = otherLabel.querySelector("i");
          otherIcon.classList.remove("fa-folder-open");
          otherIcon.classList.add("fa-folder");
        }
      });

      if (folder.checked) {
        icon.classList.remove("fa-folder");
        icon.classList.add("fa-folder-open");
        body.classList.add("folder-open");

        // Add close button if it doesn't exist
        if (!imageGrid.querySelector(".close-grid")) {
          const closeBtn = document.createElement("button");
          closeBtn.className = "close-grid";
          closeBtn.innerHTML = "&times;";
          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            folder.checked = false;
            icon.classList.remove("fa-folder-open");
            icon.classList.add("fa-folder");
            body.classList.remove("folder-open");
          });
          imageGrid.appendChild(closeBtn);
        }

        // Add folder header if it doesn't exist
        if (!imageGrid.querySelector(".folder-header")) {
          const header = document.createElement("div");
          header.className = "folder-header";
          header.textContent = label.textContent.trim();
          imageGrid.insertBefore(header, imageGrid.firstChild);
        }
      } else {
        icon.classList.remove("fa-folder-open");
        icon.classList.add("fa-folder");
        body.classList.remove("folder-open");
      }
    });
  });

  // Close folder view with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      folders.forEach((folder) => {
        if (folder.checked) {
          folder.checked = false;
          const label = folder.nextElementSibling;
          const icon = label.querySelector("i");
          icon.classList.remove("fa-folder-open");
          icon.classList.add("fa-folder");
          body.classList.remove("folder-open");
        }
      });
    }
  });
});
