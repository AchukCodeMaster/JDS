import { tournaments } from './data/tournaments.js';
import { debaters } from './data/debaters.js';
import { createTournamentCard } from './components/TournamentCard.js';
import { createDebaterSlide } from './components/DebaterSlide.js';
import { Slider } from './utils/slider.js';

// Initialize tournaments
function initTournaments() {
    const tournamentGrid = document.getElementById('tournamentGrid');
    tournamentGrid.innerHTML = tournaments.map(tournament => 
        createTournamentCard(tournament)
    ).join('');
}

// Initialize debaters slider
function initDebaters() {
    const sliderContainer = document.getElementById('debaterSlider');
    sliderContainer.innerHTML = debaters.map(debater => 
        createDebaterSlide(debater)
    ).join('');

    new Slider(sliderContainer, debaters, {
        autoplay: true,
        interval: 5000
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTournaments();
    initDebaters();
});