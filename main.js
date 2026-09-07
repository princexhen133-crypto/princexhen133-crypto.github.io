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
       ENERGY CORE — POINTER RESPONSE
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

            const scale =
                1 +
                Math.min(
                    Math.abs(currentX) +
                    Math.abs(currentY),
                    1
                ) * 0.035;

            energyCore.style.transform =
                `translate(${currentX * 10}px, ${currentY * 10}px) scale(${scale})`;

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

    const cards =
        document.querySelectorAll(".capability-card");

    cards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width) * 100;

            const y =
                ((event.clientY - rect.top) /
                    rect.height) * 100;

            card.style.setProperty(
                "--mx",
                `${x}%`
            );

            card.style.setProperty(
                "--my",
                `${y}%`
            );
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

    const signals =
        document.querySelectorAll(".signal-item");

    signals.forEach((signal, index) => {

        const base =
            55 + Math.random() * 35;

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
            ".capability-card, " +
            ".architecture-node, " +
            ".roadmap-item, " +
            ".creator-profile, " +
            ".cognitive-step, " +
            ".intelligence-console"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    element.classList.add("reveal");

                    requestAnimationFrame(() => {
                        element.classList.add("visible");
                    });

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
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a[href^='#']"
        );

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${id}`
                        );
                    });
                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

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
       ENERGY CORE AUTONOMOUS ACTIVITY
       ===================================================== */

    if (coreSystem) {

        setInterval(() => {

            coreSystem.classList.add(
                "core-active"
            );

            setTimeout(() => {

                coreSystem.classList.remove(
                    "core-active"
                );

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
                        Math.random() *
                        signals.length
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
       JAVAS LIVE INTELLIGENCE CONSOLE
       ===================================================== */

    const intelligenceConsole =
        document.querySelector(
            ".intelligence-console"
        );

    const pipelineNodes =
        document.querySelectorAll(
            ".pipeline-node"
        );

    const activityStream =
        document.querySelector(
            "#javas-activity"
        );


    /* =====================================================
       COGNITIVE PIPELINE
       ===================================================== */

    if (
        intelligenceConsole &&
        pipelineNodes.length
    ) {

        let pipelineIndex = 0;

        const pipelineStages = [
            "OBSERVE",
            "UNDERSTAND",
            "REASON",
            "DECIDE",
            "PLAN",
            "ACT"
        ];

        function activatePipeline() {

            pipelineNodes.forEach(
                (node, index) => {

                    node.classList.toggle(
                        "active",
                        index === pipelineIndex
                    );
                }
            );

            intelligenceConsole.classList.add(
                "console-active"
            );

            if (coreSystem) {

                coreSystem.classList.add(
                    "core-active"
                );

                setTimeout(() => {

                    coreSystem.classList.remove(
                        "core-active"
                    );

                }, 550);
            }

            setTimeout(() => {

                intelligenceConsole.classList.remove(
                    "console-active"
                );

            }, 650);

            pipelineIndex =
                (pipelineIndex + 1) %
                pipelineNodes.length;
        }

        activatePipeline();

        setInterval(
            activatePipeline,
            1500
        );


        /* =================================================
           LIVE ACTIVITY STREAM
           ================================================= */

        if (activityStream) {

            const activityMessages = [

                [
                    "CORE",
                    "JAVAS cognitive engine monitoring active"
                ],

                [
                    "PERCEPTION",
                    "Environment perception cycle running"
                ],

                [
                    "REASONING",
                    "Reasoning engine evaluating context"
                ],

                [
                    "DECISION",
                    "Decision engine evaluating next action"
                ],

                [
                    "PLANNER",
                    "Planner constructing execution sequence"
                ],

                [
                    "MEMORY",
                    "Memory subsystem maintaining context"
                ],

                [
                    "RESEARCH",
                    "Research subsystem standing by"
                ],

                [
                    "ACTION",
                    "Action router awaiting instruction"
                ],

                [
                    "SYSTEM",
                    "JAVAS autonomous pipeline synchronized"
                ],

                [
                    "COMMUNICATION",
                    "Communication subsystem ready"
                ],

                [
                    "VISION",
                    "Visual perception subsystem ready"
                ]
            ];


            function getTime() {

                const now =
                    new Date();

                return now.toLocaleTimeString(
                    [],
                    {
                        hour12: false
                    }
                );
            }


            function addActivity() {

                const item =
                    activityMessages[
                        Math.floor(
                            Math.random() *
                            activityMessages.length
                        )
                    ];

                const line =
                    document.createElement(
                        "div"
                    );

                line.className =
                    "activity-line";

                line.innerHTML = `
                    <span class="activity-time">
                        ${getTime()}
                    </span>

                    <span class="activity-type">
                        ${item[0]}
                    </span>

                    <span>
                        ${item[1]}
                    </span>
                `;

                activityStream.prepend(line);

                while (
                    activityStream.children.length >
                    6
                ) {
                    activityStream.lastElementChild.remove();
                }
            }


            setInterval(
                addActivity,
                2600
            );
        }
    }


    /* =====================================================
       CORE → CONSOLE SYNCHRONIZATION
       ===================================================== */

    if (
        coreSystem &&
        intelligenceConsole
    ) {

        setInterval(() => {

            intelligenceConsole.classList.add(
                "console-active"
            );

            coreSystem.classList.add(
                "core-active"
            );

            setTimeout(() => {

                intelligenceConsole.classList.remove(
                    "console-active"
                );

                coreSystem.classList.remove(
                    "core-active"
                );

            }, 700);

        }, 7200);
    }


    /* =====================================================
       COGNITIVE STEP INTERACTION
       ===================================================== */

    const cognitiveSteps =
        document.querySelectorAll(
            ".cognitive-step"
        );

    cognitiveSteps.forEach((step) => {

        step.addEventListener(
            "pointerenter",
            () => {

                step.classList.add(
                    "cognitive-active"
                );
            }
        );

        step.addEventListener(
            "pointerleave",
            () => {

                step.classList.remove(
                    "cognitive-active"
                );
            }
        );
    });


    /* =====================================================
       PAGE LOAD STATE
       ===================================================== */

    requestAnimationFrame(() => {

        document.documentElement.classList.add(
            "javas-ready"
        );
    });


    /* =====================================================
       JAVAS INITIALIZATION SIGNAL
       ===================================================== */

    console.log(
        "%cJAVAS — Personal Autonomous Artificial Intelligence",
        "color:#00eaff;font-weight:bold;font-size:14px;"
    );

    console.log(
        "%cCognitive interface initialized.",
        "color:#67f7ff;"
    );

});
