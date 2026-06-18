export const TYPE_LABELS = {theatre: "THÉÂTRE", concert: "CONCERT", standup: "STAND-UP"};

const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");

    return `${JOURS[date.getDay()]} ${date.getDate()} ${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}

export async function getSpectacles() {
    const response = await fetch("/assets/data/spectacles.json");

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    return data.spectacles || [];
}