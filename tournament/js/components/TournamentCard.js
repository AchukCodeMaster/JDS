export function createTournamentCard(tournament) {
  const progress =
    (tournament.participatingSchools / tournament.targetSchools) * 100;

  return `
        <div class="tournament-card-layout">
            <span class="card-tag">${tournament.code}</span>
            <div class="card-header">
                <h3 class="card-title">${tournament.name}</h3>
                <p class="card-description">${tournament.description}</p>
            </div>
            <div class="card-content">
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-labels">
                        <span>${tournament.participatingSchools} schools</span>
                        <span>Target: ${tournament.targetSchools}</span>
                    </div>
                </div>
                <div class="tournament-info">
                    <div class="info-item">
                        <span>Last Winner:</span>
                        <span>${tournament.lastWinner}</span>
                    </div>
                    <div class="info-item">
                        <span>Next Date:</span>
                        <span>${new Date(
                          tournament.nextDate
                        ).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
