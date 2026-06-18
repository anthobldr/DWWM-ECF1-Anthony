gsap.registerPlugin(ScrollTrigger);

function animateHero() {
    const title = document.querySelector(".hero__content__title");
    if (!title) return;
    gsap.to(".left", {
        x: "-100%",
        duration: 0.8,
        ease: "power3.inOut"
    });

    gsap.to(".right", {
        x: "100%",
        duration: 0.8,
        ease: "power3.inOut"
    });
    gsap.from(".hero__content__title", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(".hero__content__subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.15
    });

    gsap.from(".hero__content__description", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.25
    });

    gsap.from(".hero__content__tabs", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.35
    });
}

function animateIndex() {
    gsap.from(".event-brand__col", {
        scrollTrigger: {
            trigger: ".event-brand",
            start: "top 85%"
        },
        opacity: 0,
        y: 25,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".top-programmation__header", {
        scrollTrigger: {
            trigger: ".top-programmation",
            start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    });

    const cardList = document.querySelector(".top-programmation__cardlist");

    if (cardList) {
        const observer = new MutationObserver(() => {
            const cards = cardList.querySelectorAll(":scope > *");

            if (cards.length) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out"
                });

                observer.disconnect();
            }
        });

        observer.observe(cardList, { childList: true });
    }

    gsap.from(".about__room-content", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%"
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(".about__room-image", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%"
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(".about__services", {
        scrollTrigger: {
            trigger: ".about__services",
            start: "top 85%"
        },
        opacity: 0,
        y: 25,
        duration: 0.5,
        ease: "power2.out"
    });
}

function animateProgrammation() {
    gsap.from(".programmations__tabs", {
        scrollTrigger: {
            trigger: ".programmations__tabs",
            start: "top 90%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.from(".programmations__tabs-button button", {
        scrollTrigger: {
            trigger: ".programmations__tabs",
            start: "top 90%"
        },
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out"
    });

    const cardList = document.querySelector(".programmations__cardlist");

    if (cardList) {
        const observer = new MutationObserver((mutations) => {
            const newCards = [];

            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        newCards.push(node);
                    }
                });
            });

            if (newCards.length) {
                gsap.from(newCards, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out"
                });
            }
        });

        observer.observe(cardList, { childList: true });
    }

    const modal = document.getElementById("spectacleModal");

    if (modal) {
        const openModal = () => {
            gsap.fromTo(
                ".modal__container",
                {
                    opacity: 0,
                    scale: 0.95,
                    y: 20
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );
        };

        const observer = new MutationObserver(() => {
            if (
                modal.classList.contains("modal--open") ||
                modal.style.display === "flex" ||
                modal.style.display === "block"
            ) {
                openModal();
            }
        });

        observer.observe(modal, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });
    }
}

function animateInfosPratiques() {
    gsap.from(".services h2", {
        scrollTrigger: {
            trigger: ".services",
            start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.utils.toArray(".services__card").forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            },
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    gsap.from(".access__content h2", {
        scrollTrigger: {
            trigger: ".access",
            start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.from(".access__content-item, .access__info-block", {
        scrollTrigger: {
            trigger: ".access__content",
            start: "top 85%"
        },
        opacity: 0,
        x: -25,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".access__map", {
        scrollTrigger: {
            trigger: ".access__map",
            start: "top 90%"
        },
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(".access__tarifs__item", {
        scrollTrigger: {
            trigger: ".access__tarifs",
            start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.09,
        ease: "power2.out"
    });

    gsap.from(".access__salle", {
        scrollTrigger: {
            trigger: ".access__salle",
            start: "top 85%"
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power2.out"
    });
}

const path = window.location.pathname;

animateHero();

if (path === "/" || path.endsWith("index.html") || path === "") {
    animateIndex();
} else if (path.includes("programmation")) {
    animateProgrammation();
} else if (path.includes("infos-pratiques")) {
    animateInfosPratiques();
}