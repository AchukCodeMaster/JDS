export function createDebaterSlide(debater) {
    return `
        <div class="slide">
            <div class="debater-card">
                <img src="${debater.image}" alt="${debater.name}" class="debater-image">
                <div class="debater-info">
                    <h3 class="debater-name">${debater.name}</h3>
                    <p class="debater-achievement">${debater.achievement}</p>
                    <p class="debater-description">${debater.description}</p>
                </div>
            </div>
        </div>
    `;
}