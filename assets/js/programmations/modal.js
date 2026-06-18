export function initModal(spectacles) {
    const modal = document.getElementById("spectacleModal");

    const closeBtn = modal.querySelector(".modal__close");
    const overlay = modal.querySelector(".modal__overlay");

    document.addEventListener("click", e => {
        const button = e.target.closest(".js-open-modal");

        if (!button) return;

        e.preventDefault();

        const id = Number(button.dataset.id);

        const spectacle = spectacles.find(s => s.id === id);

        if (!spectacle) return;

        remplirModal(spectacle);

        modal.classList.add("modal--open");
        document.body.style.overflow = "hidden";
    });

    function closeModal() {
        modal.classList.remove("modal--open");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
}

function remplirModal(spectacle) {
    const restantes =
        spectacle.places_total -
        spectacle.places_vendues;

    const pourcentage = (spectacle.places_vendues  / spectacle.places_total) * 100;

    document.querySelector(".modal__image").src =
        `/assets/images/programmations/${spectacle.image}`;

    document.querySelector(".modal__title").textContent =
        spectacle.titre;

    document.querySelector(".modal__artist").textContent =
        spectacle.artiste;

    document.querySelector(".modal__date").textContent =
        spectacle.date;

    document.querySelector(".modal__hour").textContent =
        spectacle.horaire;

    document.querySelector(".modal__duration").textContent =
        spectacle.duree;

    document.querySelector(".modal__price").textContent =
        `${spectacle.prix} €`;

    document.querySelector(".modal__description").textContent =
        spectacle.description;

    document.querySelector(".modal__places-count").textContent =
        `${restantes} / ${spectacle.places_total}`;

    document.querySelector(
        ".modal__progress-bar"
    ).style.width = `${pourcentage}%`;
}