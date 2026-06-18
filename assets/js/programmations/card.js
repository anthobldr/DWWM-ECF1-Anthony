import { TYPE_LABELS, formatDate } from "./programmations-utils.js";

export function createCard(spectacle, prefix) {
    const tag = TYPE_LABELS[spectacle.type] || spectacle.type.toUpperCase();

    return `
        <div class="${prefix}__card"
             style="background-image: url('/assets/images/programmations/${spectacle.image}');">

            <span class="${prefix}__card-tag">
                ${tag}
            </span>

            <div class="${prefix}__card-content">
                <h3 class="${prefix}__card-title">
                    ${spectacle.titre.toUpperCase()}
                </h3>

                <p class="${prefix}__card-date">
                    ${formatDate(spectacle.date)}
                </p>

                <div class="${prefix}__card-actions">
                    <button class="button--secondary js-open-modal" data-id="${spectacle.id}">
                        EN SAVOIR PLUS
                    </button>

                    <a href="" class="button--primary">
                        RÉSERVER
                    </a>
                </div>
            </div>
        </div>
    `;
}