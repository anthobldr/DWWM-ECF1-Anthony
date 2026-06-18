const TYPE_LABELS = {theatre: "THÉÂTRE", concert: "CONCERT", standup: "STAND-UP"};
const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    const jour = JOURS[date.getDay()];
    const numeroJour = date.getDate();
    const mois = MOIS[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${numeroJour} ${mois} ${annee}`;
}

function Card(spectacle) {
    const tag = TYPE_LABELS[spectacle.type] || spectacle.type.toUpperCase();
    const dateFormatee = formatDate(spectacle.date);

    return `
        <div class="top-programmation__card" style="background-image: url('/assets/images/programmations/${spectacle.image}');">
            <span class="top-programmation__card-tag">${tag}</span>
            <div class="top-programmation__card-content">
                <h3 class="top-programmation__card-title">${spectacle.titre.toUpperCase()}</h3>
                <p class="top-programmation__card-date">${dateFormatee}</p>
                <div class="top-programmation__card-actions">
                    <a href="" class="button--secondary">EN SAVOIR PLUS</a>
                    <a href="" class="button--primary">RÉSERVER</a>
                </div>
            </div>
        </div>
    `;
}

async function loadTopProgrammation() {
    const container = document.querySelector(".top-programmation__cardlist");

    if (!container) {
        console.error("Container .top-programmation__cardlist introuvable.");
        return;
    }

    try {
        const response = await fetch("/assets/data/spectacles.json");

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        const spectacles = data.spectacles || [];

        const top3 = [...spectacles]
            .sort((a, b) => b.places_vendues - a.places_vendues)
            .slice(0, 3);

        container.innerHTML = top3.map(Card).join("");

    } catch (error) {
        container.innerHTML = "<p>Impossible de charger la programmation pour le moment.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadTopProgrammation);