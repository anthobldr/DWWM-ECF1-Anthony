import { getSpectacles } from "./programmations-utils.js";
import { createCard } from "./card.js";
import { initModal } from "./modal.js";

async function loadProgrammation() {
    const container = document.querySelector(
        ".programmations__cardlist"
    );

    if (!container) {
        console.error(
            "Container .programmations__cardlist introuvable."
        );
        return;
    }

    try {
        const spectacles = await getSpectacles();
        initModal(spectacles);

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

            if (inputRecherche.value.trim()) {
                resultats = resultats.filter(spectacle =>
                    spectacle.titre
                        .toLowerCase()
                        .includes(
                            inputRecherche.value.toLowerCase()
                        )
                );
            }

            if (inputDate.value) {
                resultats = resultats.filter(
                    spectacle =>
                        spectacle.date === inputDate.value
                );
            }

            if (resultats.length === 0) {
                container.innerHTML =
                    "<p>Aucun spectacle ne correspond à votre recherche.</p>";
                return;
            }

            container.innerHTML = resultats
                .map(spectacle =>
                    createCard(
                        spectacle,
                        "programmations"
                    )
                )
                .join("");
        }

        afficherSpectacles();

        boutons.forEach(button => {
            button.addEventListener("click", () => {
                const texte =
                    button.textContent.trim();

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

        inputRecherche.addEventListener(
            "input",
            afficherSpectacles
        );

        inputDate.addEventListener(
            "change",
            afficherSpectacles
        );

    } catch (error) {
        console.error(error);

        container.innerHTML =
            "<p>Impossible de charger la programmation pour le moment.</p>";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadProgrammation
);