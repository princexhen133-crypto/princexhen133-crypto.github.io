const coreSystem = document.querySelector(".core-system");
const energyCore = document.querySelector(".energy-core");

if (coreSystem && energyCore) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    coreSystem.addEventListener("pointermove", (event) => {

        const rect = coreSystem.getBoundingClientRect();

        targetX =
            ((event.clientX - rect.left) / rect.width - 0.5) * 18;

        targetY =
            ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    });

    coreSystem.addEventListener("pointerleave", () => {

        targetX = 0;
        targetY = 0;
    });

    function animateCore() {

        currentX +=
            (targetX - currentX) * 0.08;

        currentY +=
            (targetY - currentY) * 0.08;

        energyCore.style.transform =
            `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animateCore);
    }

    animateCore();
}


/* =========================================================
   SCROLL REVEALS
   ========================================================= */

const revealItems = document.querySelectorAll(
    ".capability-card, " +
    ".architecture-node, " +
    ".roadmap-item, " +
    ".identity-panel"
);

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                revealObserver.unobserve(
                    entry.target
                );
            });
        },
        {
            threshold: 0.12
        }
    );


revealItems.forEach((item, index) => {

    item.classList.add("reveal");

    item.style.transitionDelay =
        `${Math.min(index * 60, 360)}ms`;

    revealObserver.observe(item);
});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".navigation a"
    );

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                navigationLinks.forEach((link) => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {
                        link.classList.add(
                            "active"
                        );
                    }
                });
            });
        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const selector =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        selector
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


/* =========================================================
   CARD POINTER LIGHT
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".capability-card"
    );


cards.forEach((card) => {

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width) * 100;

            const y =
                ((event.clientY - rect.top) /
                    rect.height) * 100;

            card.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(50,190,255,.10),
                    transparent 34%
                ),
                linear-gradient(
                    145deg,
                    rgba(8,31,51,.98),
                    rgba(3,12,22,.98)
                )
            `;
        }
    );

    card.addEventListener(
        "pointerleave",
        () => {

            card.style.background = "";
        }
    );
});


/* =========================================================
   CORE SYSTEM ACTIVITY
   ========================================================= */

const signalDots =
    document.querySelectorAll(
        ".signal-bar i"
    );


let signalIndex = 0;


function pulseSignal() {

    signalDots.forEach(
        (dot, index) => {

            dot.style.opacity =
                index === signalIndex
                    ? "1"
                    : ".35";

            dot.style.transform =
                index === signalIndex
                    ? "scale(1.8)"
                    : "scale(1)";
        }
    );

    signalIndex =
        (signalIndex + 1) %
        Math.max(signalDots.length, 1);
}


setInterval(
    pulseSignal,
    900
);


/* =========================================================
   CORE INTERACTION
   ========================================================= */

if (coreSystem) {

    coreSystem.addEventListener(
        "pointerenter",
        () => {

            document.body.classList.add(
                "core-active"
            );
        }
    );

    coreSystem.addEventListener(
        "pointerleave",
        () => {

            document.body.classList.remove(
                "core-active"
            );
        }
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.documentElement.classList.add(
    "javas-ready"
);