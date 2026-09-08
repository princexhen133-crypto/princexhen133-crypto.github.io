/* =========================================================
   JAVAS — AUTONOMOUS INTELLIGENCE INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CORE ELEMENTS
       ===================================================== */

    const coreSystem =
        document.querySelector(".core-system");

    const energyCore =
        document.querySelector(".energy-core");

    const intelligenceConsole =
        document.querySelector(".intelligence-console");

    const pipelineNodes =
        document.querySelectorAll(".pipeline-node");

    const activityStream =
        document.querySelector("#javas-activity");

    const cards =
        document.querySelectorAll(".capability-card");

    const signals =
        document.querySelectorAll(".signal-item");

    const cognitiveSteps =
        document.querySelectorAll(".cognitive-step");


    /* =====================================================
       JAVAS COGNITIVE STATES
       ===================================================== */

    const cognitiveStates = [
        "OBSERVE",
        "UNDERSTAND",
        "REASON",
        "DECIDE",
        "PLAN",
        "ACT"
    ];

    let cognitiveIndex = 0;


    /* =====================================================
       CORE POINTER INTELLIGENCE
       ===================================================== */

    if (coreSystem && energyCore) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        coreSystem.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    coreSystem.getBoundingClientRect();

                targetX =
                    ((event.clientX - rect.left) /
                        rect.width - 0.5) * 2;

                targetY =
                    ((event.clientY - rect.top) /
                        rect.height - 0.5) * 2;

                coreSystem.classList.add(
                    "core-active"
                );
            }
        );


        coreSystem.addEventListener(
            "pointerleave",
            () => {

                targetX = 0;
                targetY = 0;

                coreSystem.classList.remove(
                    "core-active"
                );
            }
        );


        function animateCore() {

            currentX +=
                (targetX - currentX) * 0.08;

            currentY +=
                (targetY - currentY) * 0.08;


            const activity =
                Math.min(
                    Math.abs(currentX) +
                    Math.abs(currentY),
                    1
                );


            const scale =
                1 + activity * 0.035;


            energyCore.style.transform =
                `
                translate(
                    ${currentX * 10}px,
                    ${currentY * 10}px
                )
                scale(${scale})
                `;


            coreSystem.style.setProperty(
                "--core-x",
                `${currentX * 20}px`
            );


            coreSystem.style.setProperty(
                "--core-y",
                `${currentY * 20}px`
            );


            requestAnimationFrame(
                animateCore
            );
        }


        animateCore();
    }


    /* =====================================================
       CAPABILITY CARD INTELLIGENCE
       ===================================================== */

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

                card.style.setProperty(
                    "--mx",
                    `${x}%`
                );

                card.style.setProperty(
                    "--my",
                    `${y}%`
                );
            }
        );


        card.addEventListener(
            "pointerenter",
            () => {

                card.classList.add(
                    "system-active"
                );
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.classList.remove(
                    "system-active"
                );
            }
        );

    });


    /* =====================================================
       SIGNAL SYSTEM
       ===================================================== */

    function randomSignal() {

        return (
            55 +
            Math.random() * 43
        );
    }


    signals.forEach(
        (signal, index) => {

            signal.style.setProperty(
                "--signal",
                `${randomSignal()}%`
            );

            signal.style.animationDelay =
                `${index * 120}ms`;
        }
    );


    setInterval(
        () => {

            if (!signals.length) {
                return;
            }

            const signal =
                signals[
                    Math.floor(
                        Math.random() *
                        signals.length
                    )
                ];

            signal.style.setProperty(
                "--signal",
                `${randomSignal()}%`
            );

        },
        900
    );


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${Math.min(
                        index * 45,
                        350
                    )}ms`;

                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );
            }
        );
    }


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


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            const id =
                                entry.target.id;

                            navLinks.forEach(
                                (link) => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        sections.forEach(
            (section) => {

                navObserver.observe(
                    section
                );
            }
        );
    }


    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    const target =
                        document.querySelector(
                            targetId
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
        }
    );


    /* =====================================================
       CORE PULSE
       ===================================================== */

    function pulseCore(
        duration = 700
    ) {

        if (!coreSystem) {
            return;
        }

        coreSystem.classList.add(
            "core-active"
        );


        window.setTimeout(
            () => {

                coreSystem.classList.remove(
                    "core-active"
                );

            },
            duration
        );
    }


    /* =====================================================
       INTELLIGENCE CONSOLE PULSE
       ===================================================== */

    function pulseConsole(
        duration = 650
    ) {

        if (!intelligenceConsole) {
            return;
        }

        intelligenceConsole.classList.add(
            "console-active"
        );


        window.setTimeout(
            () => {

                intelligenceConsole.classList.remove(
                    "console-active"
                );

            },
            duration
        );
    }


    /* =====================================================
       COGNITIVE PIPELINE
       ===================================================== */

    function activateCognitiveStage() {

        if (!pipelineNodes.length) {
            return;
        }


        pipelineNodes.forEach(
            (node, index) => {

                node.classList.toggle(
                    "active",
                    index === cognitiveIndex
                );

            }
        );


        const currentState =
            cognitiveStates[
                cognitiveIndex
            ];


        document.documentElement.style.setProperty(
            "--javas-cognitive-index",
            cognitiveIndex
        );


        document.documentElement.setAttribute(
            "data-javas-state",
            currentState
        );


        pulseCore(650);

        pulseConsole(650);


        addActivity(
            "COGNITION",
            `Cognitive state: ${currentState}`
        );


        cognitiveIndex =
            (
                cognitiveIndex + 1
            ) %
            pipelineNodes.length;
    }


    activateCognitiveStage();


    setInterval(
        activateCognitiveStage,
        1500
    );


    /* =====================================================
       LIVE ACTIVITY STREAM
       ===================================================== */

    function getTime() {

        return new Date()
            .toLocaleTimeString(
                [],
                {
                    hour12: false
                }
            );
    }


    function addActivity(
        type,
        message
    ) {

        if (!activityStream) {
            return;
        }


        const line =
            document.createElement(
                "div"
            );


        line.className =
            "activity-line";


        const time =
            document.createElement(
                "span"
            );

        time.className =
            "activity-time";

        time.textContent =
            getTime();


        const category =
            document.createElement(
                "span"
            );

        category.className =
            "activity-type";

        category.textContent =
            type;


        const text =
            document.createElement(
                "span"
            );

        text.textContent =
            message;


        line.appendChild(time);

        line.appendChild(category);

        line.appendChild(text);


        activityStream.prepend(
            line
        );


        while (
            activityStream.children.length >
            6
        ) {

            activityStream.lastElementChild.remove();
        }

    }


    const autonomousMessages = [

        [
            "CORE",
            "JAVAS intelligence engine monitoring active"
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
            "Decision engine evaluating possible actions"
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
            "COMMUNICATION",
            "Communication subsystem ready"
        ],

        [
            "VISION",
            "Visual perception subsystem ready"
        ],

        [
            "SYSTEM",
            "JAVAS autonomous pipeline synchronized"
        ]

    ];


    setInterval(
        () => {

            const message =
                autonomousMessages[
                    Math.floor(
                        Math.random() *
                        autonomousMessages.length
                    )
                ];


            addActivity(
                message[0],
                message[1]
            );

        },
        2600
    );


    /* =====================================================
       CORE → CONSOLE SYNCHRONIZATION
       ===================================================== */

    setInterval(
        () => {

            pulseCore(700);

            pulseConsole(700);

        },
        7200
    );


    /* =====================================================
       COGNITIVE STEP INTERACTION
       ===================================================== */

    cognitiveSteps.forEach(
        (step, index) => {

            step.addEventListener(
                "pointerenter",
                () => {

                    step.classList.add(
                        "cognitive-active"
                    );


                    if (
                        pipelineNodes[index]
                    ) {

                        pipelineNodes.forEach(
                            (node) => {

                                node.classList.remove(
                                    "active"
                                );
                            }
                        );


                        pipelineNodes[index]
                            .classList.add(
                                "active"
                            );
                    }

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

        }
    );


    /* =====================================================
       VISUAL INTELLIGENCE RESPONSE
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {
                return;
            }

            pulseCore(800);

            pulseConsole(800);

            addActivity(
                "SYSTEM",
                "JAVAS interface activity restored"
            );

        }
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    requestAnimationFrame(
        () => {

            document.documentElement.classList.add(
                "javas-ready"
            );

        }
    );


    addActivity(
        "CORE",
        "JAVAS cognitive interface initialized"
    );


    console.log(
        "%cJAVAS — Personal Autonomous Artificial Intelligence",
        "color:#00eaff;font-weight:bold;font-size:14px;"
    );


    console.log(
        "%cAutonomous cognitive interface initialized.",
        "color:#67f7ff;"
    );

});
