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
        <div class="programmations__card" style="background-image: url('/assets/images/programmations/${spectacle.image}');">
            <span class="programmations__card-tag">${tag}</span>

            <div class="programmations__card-content">
                <h3 class="programmations__card-title">
                    ${spectacle.titre.toUpperCase()}
                </h3>

                <p class="programmations__card-date">
                    ${dateFormatee}
                </p>

                <div class="programmations__card-actions">
                    <a href="" class="button--secondary">
                        EN SAVOIR PLUS
                    </a>

                    <a href="" class="button--primary">
                        RÉSERVER
                    </a>
                </div>
            </div>
        </div>
    `;
}

async function loadProgrammation() {
    const container = document.querySelector(".programmations__cardlist");

    if (!container) {
        console.error("Container .programmations__cardlist introuvable.");
        return;
    }

    try {
        const response = await fetch("/assets/data/spectacles.json");

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        const spectacles = data.spectacles || [];

        const boutons = document.querySelectorAll(
            ".programmations__tabs-button button"
        );
        const inputRecherche = document.querySelector(
            '.programmations__tabs-input input[type="text"]'
        );
        const inputDate = document.querySelector(
            '.programmations__tabs-input input[type="date"]'
        );

        let typeActif = "tout";

        function afficherSpectacles() {
            let resultats = [...spectacles];

            if (typeActif !== "tout") {
                resultats = resultats.filter(
                    spectacle => spectacle.type === typeActif
                );
            }

            if (inputRecherche.value.trim() !== "") {
                resultats = resultats.filter(spectacle =>
                    spectacle.titre
                        .toLowerCase()
                        .includes(inputRecherche.value.toLowerCase())
                );
            }

            if (inputDate.value) {
                resultats = resultats.filter(
                    spectacle => spectacle.date === inputDate.value
                );
            }

            container.innerHTML = resultats.map(Card).join("");

            if (resultats.length === 0) {
                container.innerHTML =
                    "<p>Aucun spectacle ne correspond à votre recherche.</p>";
            }
        }

        afficherSpectacles();

        boutons.forEach(button => {
            button.addEventListener("click", () => {
                const texte = button.textContent.trim();

                switch (texte) {
                    case "THÉÂTRE":
                        typeActif = "theatre";
                        break;

                    case "CONCERT":
                        typeActif = "concert";
                        break;

                    case "STAND-UP":
                        typeActif = "standup";
                        break;

                    default:
                        typeActif = "tout";
                }

                afficherSpectacles();
            });
        });

        inputRecherche.addEventListener("input", afficherSpectacles);

        inputDate.addEventListener("change", afficherSpectacles);

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Impossible de charger la programmation pour le moment.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadProgrammation);