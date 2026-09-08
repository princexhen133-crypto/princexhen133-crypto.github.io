/* =========================================================
   JAVAS — HOME PAGE INTERACTION ENGINE
   Personal Autonomous Artificial Intelligence Platform
   ========================================================= */

"use strict";


/* =========================================================
   JAVAS SYSTEM
   ========================================================= */

const JAVAS = {

    version: "1.0.0",

    state: {
        online: true,
        activityIndex: 0,
        pointerX: 0,
        pointerY: 0,
        initialized: false
    },

    elements: {},

    activity: [
        {
            type: "CORE",
            message: "Intelligence engine active"
        },
        {
            type: "PERCEPTION",
            message: "Environment monitoring"
        },
        {
            type: "REASONING",
            message: "Analyzing context"
        },
        {
            type: "MEMORY",
            message: "Context synchronized"
        },
        {
            type: "RESEARCH",
            message: "Research engine ready"
        },
        {
            type: "PLANNING",
            message: "Planning engine standing by"
        },
        {
            type: "VISION",
            message: "Visual perception ready"
        },
        {
            type: "ACTION",
            message: "Controlled action layer ready"
        }
    ]

};


/* =========================================================
   DOM INITIALIZATION
   ========================================================= */

function initializeElements() {

    JAVAS.elements = {

        body:
            document.body,

        core:
            document.querySelector(".core-system"),

        energyCore:
            document.querySelector(".energy-core"),

        coreCaption:
            document.querySelector(".core-caption"),

        hero:
            document.querySelector(".hero"),

        heroActivity:
            document.querySelector("#hero-activity"),

        heroLogo:
            document.querySelector(".hero-logo"),

        capabilityCards:
            document.querySelectorAll(".capability-card"),

        signalItems:
            document.querySelectorAll(".signal-item"),

        pipelineNodes:
            document.querySelectorAll(".pipeline-node"),

        architectureNodes:
            document.querySelectorAll(".architecture-node"),

        sections:
            document.querySelectorAll(
                ".home-section, .creator-section"
            ),

        navigationLinks:
            document.querySelectorAll(
                ".site-nav a, .footer-navigation a"
            ),

        primaryButtons:
            document.querySelectorAll(
                ".primary-button, .secondary-button"
            )

    };

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeJAVAS() {

    if (JAVAS.state.initialized) {
        return;
    }

    initializeElements();

    initializeScrollReveal();

    initializePointerInteraction();

    initializeCapabilityCards();

    initializePipeline();

    initializeActivitySystem();

    initializeSignalSystem();

    initializeNavigation();

    initializeCoreInteraction();

    initializeArchitectureInteraction();

    initializeButtons();

    initializeClock();

    JAVAS.state.initialized = true;

    document.documentElement.dataset.javasReady = "true";

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {

    const sections =
        JAVAS.elements.sections;

    if (!sections.length) {
        return;
    }


    sections.forEach(section => {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(28px)";

        section.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });


    if (!("IntersectionObserver" in window)) {

        sections.forEach(section => {

            section.style.opacity = "1";

            section.style.transform =
                "translateY(0)";

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   POINTER / ENVIRONMENT INTERACTION
   ========================================================= */

function initializePointerInteraction() {

    if (!JAVAS.elements.hero) {
        return;
    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            const x =
                event.clientX /
                window.innerWidth;

            const y =
                event.clientY /
                window.innerHeight;


            targetX =
                (x - 0.5) * 2;

            targetY =
                (y - 0.5) * 2;


            JAVAS.state.pointerX =
                targetX;

            JAVAS.state.pointerY =
                targetY;

        },
        {
            passive: true
        }
    );


    function animatePointer() {

        currentX +=
            (targetX - currentX) *
            0.035;

        currentY +=
            (targetY - currentY) *
            0.035;


        if (JAVAS.elements.energyCore) {

            JAVAS.elements.energyCore.style.transform =
                `translate(calc(-50% + ${currentX * 7}px), calc(-50% + ${currentY * 7}px))`;

        }


        if (JAVAS.elements.core) {

            JAVAS.elements.core.style.setProperty(
                "--pointer-x",
                `${currentX * 12}px`
            );

            JAVAS.elements.core.style.setProperty(
                "--pointer-y",
                `${currentY * 12}px`
            );

        }


        requestAnimationFrame(
            animatePointer
        );

    }


    animatePointer();

}


/* =========================================================
   CAPABILITY CARDS
   ========================================================= */

function initializeCapabilityCards() {

    const cards =
        JAVAS.elements.capabilityCards;

    if (!cards.length) {
        return;
    }


    cards.forEach((card, index) => {

        card.dataset.index =
            String(index + 1);


        card.addEventListener(
            "pointerenter",
            () => {

                card.classList.add(
                    "javas-card-active"
                );


                cards.forEach(otherCard => {

                    if (otherCard !== card) {

                        otherCard.style.opacity =
                            "0.65";

                    }

                });

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.classList.remove(
                    "javas-card-active"
                );


                cards.forEach(otherCard => {

                    otherCard.style.opacity =
                        "";

                });

            }
        );

    });

}


/* =========================================================
   INTELLIGENCE PIPELINE
   ========================================================= */

function initializePipeline() {

    const nodes =
        JAVAS.elements.pipelineNodes;

    if (!nodes.length) {
        return;
    }


    let activeIndex = 0;


    function updatePipeline() {

        nodes.forEach(
            (node, index) => {

                node.classList.toggle(
                    "active",
                    index === activeIndex
                );

            }
        );


        activeIndex =
            (activeIndex + 1) %
            nodes.length;

    }


    updatePipeline();


    setInterval(
        updatePipeline,
        1800
    );

}


/* =========================================================
   LIVE ACTIVITY SYSTEM
   ========================================================= */

function initializeActivitySystem() {

    const activity =
        JAVAS.elements.heroActivity;

    if (!activity) {
        return;
    }


    activity.innerHTML = "";


    JAVAS.state.activityIndex = 0;


    addActivityLine();


    setInterval(
        addActivityLine,
        2800
    );

}


function addActivityLine() {

    const activity =
        JAVAS.elements.heroActivity;

    if (!activity) {
        return;
    }


    const item =
        JAVAS.activity[
            JAVAS.state.activityIndex
        ];


    const line =
        document.createElement("div");


    line.className =
        "hero-activity-line";


    const time =
        document.createElement("span");

    time.className =
        "activity-time";

    time.textContent =
        getRuntime();


    const type =
        document.createElement("span");

    type.className =
        "activity-type";

    type.textContent =
        item.type;


    const message =
        document.createElement("span");

    message.textContent =
        item.message;


    line.appendChild(time);

    line.appendChild(type);

    line.appendChild(message);


    activity.appendChild(line);


    while (
        activity.children.length > 5
    ) {

        activity.removeChild(
            activity.firstElementChild
        );

    }


    JAVAS.state.activityIndex =
        (
            JAVAS.state.activityIndex + 1
        ) %
        JAVAS.activity.length;

}


function getRuntime() {

    const seconds =
        Math.floor(
            performance.now() / 1000
        );


    const hours =
        Math.floor(
            seconds / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const remaining =
        seconds % 60;


    return [
        hours,
        minutes,
        remaining
    ]
        .map(
            value =>
                String(value)
                    .padStart(2, "0")
        )
        .join(":");

}


/* =========================================================
   SIGNAL SYSTEM
   ========================================================= */

function initializeSignalSystem() {

    const signals =
        JAVAS.elements.signalItems;

    if (!signals.length) {
        return;
    }


    signals.forEach(
        (signal, index) => {

            const fill =
                signal.querySelector(
                    ".signal-fill"
                );


            if (!fill) {
                return;
            }


            const base =
                55 +
                (
                    index * 7
                );


            let direction = 1;


            setInterval(
                () => {

                    let percentage =
                        parseFloat(
                            fill.dataset.level ||
                            base
                        );


                    percentage +=
                        direction *
                        (
                            Math.random() * 7
                        );


                    if (percentage > 96) {

                        direction = -1;

                    }


                    if (percentage < 45) {

                        direction = 1;

                    }


                    fill.dataset.level =
                        percentage;


                    fill.style.width =
                        `${percentage}%`;

                },
                1600 +
                index * 180
            );

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const links =
        JAVAS.elements.navigationLinks;

    if (!links.length) {
        return;
    }


    const currentPage =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";


    links.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage ||
            (
                currentPage === "" &&
                href === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }


        link.addEventListener(
            "click",
            event => {

                const destination =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !destination ||
                    destination.startsWith("#")
                ) {

                    return;

                }


                document.body.classList.add(
                    "page-transition"
                );

            }
        );

    });


    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetID =
                        anchor
                            .getAttribute("href")
                            .substring(1);


                    const target =
                        document.getElementById(
                            targetID
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

}


/* =========================================================
   ENERGY CORE INTERACTION
   ========================================================= */

function initializeCoreInteraction() {

    const core =
        JAVAS.elements.energyCore;

    if (!core) {
        return;
    }


    core.addEventListener(
        "pointerenter",
        () => {

            document.body.classList.add(
                "core-engaged"
            );

            core.style.filter =
                "brightness(1.18)";

        }
    );


    core.addEventListener(
        "pointerleave",
        () => {

            document.body.classList.remove(
                "core-engaged"
            );

            core.style.filter =
                "";

        }
    );


    core.addEventListener(
        "click",
        () => {

            triggerCorePulse();

        }
    );

}


function triggerCorePulse() {

    const core =
        JAVAS.elements.energyCore;

    if (!core) {
        return;
    }


    core.classList.remove(
        "core-pulse-trigger"
    );


    void core.offsetWidth;


    core.classList.add(
        "core-pulse-trigger"
    );


    setTimeout(
        () => {

            core.classList.remove(
                "core-pulse-trigger"
            );

        },
        900
    );

}


/* =========================================================
   ARCHITECTURE INTERACTION
   ========================================================= */

function initializeArchitectureInteraction() {

    const nodes =
        JAVAS.elements.architectureNodes;

    if (!nodes.length) {
        return;
    }


    nodes.forEach(
        (node, index) => {

            node.addEventListener(
                "pointerenter",
                () => {

                    nodes.forEach(
                        other => {

                            other.style.opacity =
                                "0.55";

                        }
                    );


                    node.style.opacity =
                        "1";


                    node.style.transform =
                        "translateY(-4px)";

                    node.style.transition =
                        "opacity 0.25s ease, transform 0.25s ease";

                }
            );


            node.addEventListener(
                "pointerleave",
                () => {

                    nodes.forEach(
                        other => {

                            other.style.opacity =
                                "";

                            other.style.transform =
                                "";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   BUTTON INTERACTION
   ========================================================= */

function initializeButtons() {

    const buttons =
        JAVAS.elements.primaryButtons;

    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.style.transform =
                    "translateY(1px)";

            }
        );


        button.addEventListener(
            "pointerup",
            () => {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   SYSTEM CLOCK
   ========================================================= */

function initializeClock() {

    const timeElements =
        document.querySelectorAll(
            ".activity-time"
        );


    if (!timeElements.length) {
        return;
    }


    setInterval(
        () => {

            const runtime =
                getRuntime();


            timeElements.forEach(
                element => {

                    if (
                        element.closest(
                            "#hero-activity"
                        )
                    ) {
                        return;
                    }


                    element.textContent =
                        runtime;

                }
            );

        },
        1000
    );

}


/* =========================================================
   CORE AMBIENT PARTICLE FIELD
   ========================================================= */

function createAmbientParticles() {

    const core =
        JAVAS.elements.core;

    if (!core) {
        return;
    }


    const particleCount =
        window.innerWidth < 700
            ? 18
            : 35;


    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "javas-particle";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            120 +
            Math.random() *
            150;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        const size =
            1 +
            Math.random() *
            2.5;


        const duration =
            3 +
            Math.random() *
            5;


        const delay =
            Math.random() *
            5;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";

        particle.style.setProperty(
            "--particle-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--particle-y",
            `${y}px`
        );

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `${delay}s`;


        fragment.appendChild(
            particle
        );

    }


    core.appendChild(
        fragment
    );

}


/* =========================================================
   DYNAMIC CORE STYLE
   ========================================================= */

function injectDynamicStyles() {

    if (
        document.getElementById(
            "javas-runtime-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "javas-runtime-styles";


    style.textContent = `

        .javas-particle {
            position: absolute;
            display: block;
            border-radius: 50%;
            background: #00eaff;
            box-shadow:
                0 0 6px #00eaff,
                0 0 12px rgba(0, 234, 255, 0.5);
            pointer-events: none;
            animation:
                javasParticleFloat
                linear
                infinite;
            opacity: 0;
        }


        @keyframes javasParticleFloat {

            0% {
                opacity: 0;
                transform:
                    translate(
                        var(--particle-x),
                        var(--particle-y)
                    )
                    scale(0.2);
            }


            20% {
                opacity: 0.85;
            }


            70% {
                opacity: 0.45;
            }


            100% {
                opacity: 0;
                transform:
                    translate(
                        calc(var(--particle-x) * 0.65),
                        calc(var(--particle-y) * 0.65)
                    )
                    scale(1.5);
            }

        }


        .core-pulse-trigger {
            animation:
                javasTriggeredPulse
                0.9s
                ease-out !important;
        }


        @keyframes javasTriggeredPulse {

            0% {
                filter:
                    brightness(1);
            }


            25% {
                filter:
                    brightness(1.8);
            }


            50% {
                filter:
                    brightness(2.3);
            }


            100% {
                filter:
                    brightness(1);
            }

        }


        .javas-card-active {
            border-color:
                rgba(0, 234, 255, 0.55) !important;

            box-shadow:
                0 0 35px
                rgba(0, 210, 255, 0.12),
                inset 0 0 30px
                rgba(0, 180, 255, 0.025);
        }


        .page-transition {
            pointer-events: none;
        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   VISIBILITY / TAB STATE
   ========================================================= */

function initializeVisibilitySystem() {

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.documentElement
                    .dataset
                    .javasPaused =
                    "true";

            } else {

                delete document.documentElement
                    .dataset
                    .javasPaused;

            }

        }
    );

}


/* =========================================================
   RESIZE SYSTEM
   ========================================================= */

function initializeResizeSystem() {

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        document.documentElement
                            .style
                            .setProperty(
                                "--javas-viewport-width",
                                `${window.innerWidth}px`
                            );

                    },
                    150
                );

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   KEYBOARD SYSTEM
   ========================================================= */

function initializeKeyboardSystem() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document.body.classList.remove(
                    "core-engaged"
                );

            }


            if (
                event.key.toLowerCase() === "j" &&
                !isTypingTarget(event.target)
            ) {

                triggerCorePulse();

            }

        }
    );

}


function isTypingTarget(element) {

    if (!element) {
        return false;
    }


    const tag =
        element.tagName;


    return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        element.isContentEditable
    );

}


/* =========================================================
   SYSTEM BOOT
   ========================================================= */

function bootJAVAS() {

    injectDynamicStyles();

    initializeJAVAS();

    createAmbientParticles();

    initializeVisibilitySystem();

    initializeResizeSystem();

    initializeKeyboardSystem();


    console.log(
        "%cJAVAS",
        "font-size: 28px; font-weight: 900; color: #00eaff;"
    );


    console.log(
        "%cPersonal Autonomous Artificial Intelligence",
        "font-size: 12px; color: #8caebe;"
    );


    console.log(
        `%cSystem initialized — v${JAVAS.version}`,
        "font-size: 11px; color: #5ff6ff;"
    );

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        bootJAVAS
    );

} else {

    bootJAVAS();

}
