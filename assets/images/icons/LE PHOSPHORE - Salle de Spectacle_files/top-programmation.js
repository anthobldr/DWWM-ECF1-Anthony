import { getSpectacles } from "./programmations-utils.js";
import { createCard } from "./card.js";

async function loadTopProgrammation() {
    const container = document.querySelector(
        ".top-programmation__cardlist"
    );

    if (!container) {
        console.error(
            "Container .top-programmation__cardlist introuvable."
        );
        return;
    }

    try {
        const spectacles = await getSpectacles();

        const top3 = [...spectacles]
            .sort(
                (a, b) =>
                    b.places_vendues -
                    a.places_vendues
            )
            .slice(0, 3);

        container.innerHTML = top3
            .map(spectacle =>
                createCard(
                    spectacle,
                    "top-programmation"
                )
            )
            .join("");

    } catch (error) {
        console.error(error);

        container.innerHTML =
            "<p>Impossible de charger la programmation pour le moment.</p>";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadTopProgrammation
);