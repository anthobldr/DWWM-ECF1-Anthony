const map = document.getElementById('salleMap');
  const tip = document.getElementById('salleTooltip');

  for (let r = 0; r < 8; r++) {
    const lettre = String.fromCharCode(65 + r); // A, B, C…
    const rangee = document.createElement('div');
    rangee.className = 'access__salle-row';

    // Étiquette
    const label = document.createElement('span');
    label.className = 'access__salle-label';
    label.textContent = lettre;
    rangee.appendChild(label);

    for (let c = 1; c <= 15; c++) {
      const id = lettre + '-' + c;
      const siege = document.createElement('button');
      siege.className = 'access__salle-seat';
      siege.title = 'Siège ' + id;

      let categorie = 'Orchestre';
      if (lettre === 'A' && c <= 4) {
        siege.classList.add('access__salle-seat--pmr');
        categorie = 'PMR';
      } else if (r >= 5) {
        siege.classList.add('access__salle-seat--balcon');
        categorie = 'Balcon';
      }

      siege.addEventListener('mouseenter', () => {
        tip.textContent = 'Siège ' + id + ' · ' + categorie;
        tip.classList.add('access__salle-tooltip--visible');
      });
      siege.addEventListener('mousemove', e => {
        tip.style.left = (e.clientX + 12) + 'px';
        tip.style.top  = (e.clientY - 30) + 'px';
      });
      siege.addEventListener('mouseleave', () => {
        tip.classList.remove('access__salle-tooltip--visible');
      });

      rangee.appendChild(siege);
    }
    map.appendChild(rangee);
  }