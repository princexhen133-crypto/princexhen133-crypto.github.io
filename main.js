/* =========================================================
   JAVAS — FUTURISTIC INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CORE ELEMENTS
       ===================================================== */

    const coreSystem = document.querySelector(".core-system");
    const energyCore = document.querySelector(".energy-core");

    /* =====================================================
       ENERGY CORE — MOUSE / POINTER RESPONSE
       ===================================================== */

    if (coreSystem && energyCore) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        coreSystem.addEventListener("pointermove", (event) => {

            const rect = coreSystem.getBoundingClientRect();

            targetX =
                ((event.clientX - rect.left) / rect.width - 0.5) * 2;

            targetY =
                ((event.clientY - rect.top) / rect.height - 0.5) * 2;

            coreSystem.classList.add("core-active");
        });

        coreSystem.addEventListener("pointerleave", () => {

            targetX = 0;
            targetY = 0;

            coreSystem.classList.remove("core-active");
        });

        function animateCore() {

            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            energyCore.style.transform =
                `translate(${currentX * 10}px, ${currentY * 10}px) scale(${1 + Math.abs(currentX + currentY) * 0.025})`;

            coreSystem.style.setProperty(
                "--core-x",
                `${currentX * 20}px`
            );

            coreSystem.style.setProperty(
                "--core-y",
                `${currentY * 20}px`
            );

            requestAnimationFrame(animateCore);
        }

        animateCore();
    }

    /* =====================================================
       CAPABILITY CARD INTERACTION
       ===================================================== */

    const cards = document.querySelectorAll(".capability-card");

    cards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width) * 100;

            const y =
                ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--mx", `${x}%`);
            card.style.setProperty("--my", `${y}%`);
        });

        card.addEventListener("pointerenter", () => {
            card.classList.add("system-active");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("system-active");
        });
    });

    /* =====================================================
       SIGNAL SYSTEM
       ===================================================== */

    const signals = document.querySelectorAll(".signal-item");

    signals.forEach((signal, index) => {

        const base = 55 + Math.random() * 35;

        signal.style.setProperty(
            "--signal",
            `${base}%`
        );

        signal.style.animationDelay =
            `${index * 120}ms`;
    });

    /* =====================================================
       SCROLL REVEAL SYSTEM
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".capability-card, .architecture-node, .roadmap-item, .creator-profile, .cognitive-step"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    element.classList.add("reveal");
                    element.classList.add("visible");

                    observer.unobserve(element);
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index * 45, 350)}ms`;

        revealObserver.observe(element);
    });

    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a[href^='#']");

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    navLinks.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );

                    });
                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

    sections.forEach((section) => {
        navObserver.observe(section);
    });

    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* =====================================================
       CORE ACTIVITY
       ===================================================== */

    if (coreSystem) {

        setInterval(() => {

            coreSystem.classList.add("core-active");

            setTimeout(() => {
                coreSystem.classList.remove("core-active");
            }, 900);

        }, 4200);
    }

    /* =====================================================
       SIGNAL ACTIVITY
       ===================================================== */

    if (signals.length) {

        setInterval(() => {

            const signal =
                signals[
                    Math.floor(
                        Math.random() * signals.length
                    )
                ];

            const value =
                55 + Math.random() * 43;

            signal.style.setProperty(
                "--signal",
                `${value}%`
            );

        }, 900);
    }

    /* =====================================================
       SYSTEM READY
       ===================================================== */

    document.documentElement.classList.add(
        "javas-ready"
    );

});
