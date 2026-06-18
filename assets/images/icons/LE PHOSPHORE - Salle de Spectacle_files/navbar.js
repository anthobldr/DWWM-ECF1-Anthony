const burger = document.querySelector('.navbar__burger');
const menu = document.querySelector('.navbar__menulist');
const body = document.body;

function toggleMenu() {
    menu.classList.toggle('navbar__menulist--active');
    burger.classList.toggle('navbar__burger--active');
    
    if (menu.classList.contains('navbar__menulist--active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

function closeMenu() {
    menu.classList.remove('navbar__menulist--active');
    burger.classList.remove('navbar__burger--active');
    body.style.overflow = 'auto';
}

if (burger) {
    burger.addEventListener('click', toggleMenu);
}

const menuLinks = document.querySelectorAll('.navbar__menulist a');
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', closeMenu);
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
        closeMenu();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        closeMenu();
    }
});