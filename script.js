/* =========================================================================
   SETUP: GSAP + LocomotiveScroll + ScrollTrigger bridge
   ========================================================================= */

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.05,
    multiplier: 0.6,
    firefoxMultiplier: 50,
    // Mobile/tablet: transform-hijack + native touch scroll fighting each other
    // is the #1 cause of laggy/unresponsive feel, so smooth scroll is disabled there.
    smartphone: { smooth: false },
    tablet: { smooth: false, breakpoint: 768 }
});

// Detect which scroll mode is active (smooth/transform vs native).
// Used everywhere below so we don't duplicate this check.
function isSmoothActive() {
    const mainEl = document.querySelector("#main");
    return !!(mainEl && mainEl.style.transform);
}

function getScrollY() {
    return isSmoothActive()
        ? locoScroll.scroll.instance.scroll.y
        : (window.pageYOffset || document.documentElement.scrollTop || 0);
}

// PERF FIX: previously both locoScroll.on("scroll", ...) AND
// window.addEventListener("scroll", ...) called ScrollTrigger.update() —
// on devices where both fire, that's double the work every scroll frame.
// Smooth mode uses LocomotiveScroll's virtual scroll; native mode uses the
// real window scroll. Only one is ever actually active, so only bind that one.
if (isSmoothActive()) {
    locoScroll.on("scroll", ScrollTrigger.update);
} else {
    window.addEventListener("scroll", ScrollTrigger.update);
}

// Tell ScrollTrigger to use LocomotiveScroll's proxy methods for "#main"
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        if (arguments.length) {
            locoScroll.scrollTo(value, 0, 0);
        } else {
            return getScrollY();
        }
    }, // no scrollLeft needed — vertical scroll only
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll doesn't transform the container on mobile, so pin
    // using position:fixed there; on desktop it uses transform.
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});

ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    syncInterval: 100
});

window.addEventListener("load", () => ScrollTrigger.refresh());

// Only refresh ScrollTrigger on resize (orientation change / address-bar
// toggle), never on scroll — refreshing on every scroll event is heavy and
// was a real source of mobile jitter.
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
});


/* =========================================================================
   PAGE 1: "OC" / "THC" hover buttons — background text reveal
   ========================================================================= */

const oc = document.querySelector("#oc");
const thc = document.querySelector("#thc");

oc.addEventListener("mouseover", () => {
    gsap.timeline()
        .to("#page1", { backgroundColor: "transparent", duration: .3 })
        .to("#page1j", { opacity: 1, duration: .3 })
        .to("#oc", { scale: 1.2, delay: -.5 });
});

oc.addEventListener("mouseleave", () => {
    gsap.timeline()
        .to("#page1", { backgroundColor: "transparent", duration: .3 })
        .to("#page1j", { opacity: 0, duration: .3 })
        .to("#oc", { scale: 1, delay: -.5 });
});

thc.addEventListener("mouseover", () => {
    gsap.timeline()
        .to("#page1", { backgroundColor: "transparent", duration: .3 })
        .to("#page1m", { opacity: 1, duration: .3 })
        .to("#thc", { scale: 1.2, delay: -.5 });
});

thc.addEventListener("mouseleave", () => {
    gsap.timeline()
        .to("#page1", { backgroundColor: "transparent", duration: .3 })
        .to("#page1m", { opacity: 0, duration: .3 })
        .to("#thc", { scale: 1, delay: -.5 });
});


/* =========================================================================
   SECTION "#three": background color shift + ocr/tcr/thcr move & scale
   ========================================================================= */

gsap.to("#main", {
    backgroundColor: "#F5EFE1",
    scrollTrigger: {
        trigger: "#three",
        scroller: "#main",
        start: "top 17%",
        scrub: 3,
        onLeaveBack: () => {
            gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3 });
        }
    }
});

const threeMoveTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#three",
        scroller: "#main",
        scrub: 1,
        start: "top 50%",
        invalidateOnRefresh: true
    }
});

threeMoveTl.to("#ocr", {
    top: () => window.innerWidth <= 505 ? "100vh" : "115.6vh",
    x: () => window.innerWidth <= 505 ? "50%" : "27vw",
    zIndex: () => window.innerWidth <= 505 ? "4" : "3",
    scale: 3.9,
    overwrite: "auto"
});

threeMoveTl.to("#tcr", {
    top: () => window.innerWidth <= 505 ? "114%" : "134%",
    left: () => window.innerWidth <= 505 ? "24%" : "34%",
    scale: 2.7
}, "<");

threeMoveTl.to("#thcr", {
    top: () => window.innerWidth <= 505 ? "107%" : "134%",
    left: () => window.innerWidth <= 505 ? "28%" : "34%",
    scale: 2
}, "<");


/* =========================================================================
   SECTION "#ntxt": fade out oc / tc / thc labels
   ========================================================================= */

const ntxtFadeTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#ntxt",
        scroller: "#main",
        start: "top 27%",
        scrub: 1,
        end: "top 25%"
    }
});

ntxtFadeTl.to("#oc", { opacity: 0, zIndex: -2 });
ntxtFadeTl.to("#tc", { opacity: 0, zIndex: -2 }, "<");
ntxtFadeTl.to("#thc", { opacity: 0, zIndex: -2 }, "<");


/* =========================================================================
   SECTION "#poster": poster scale-in, thcr/tcr fade out, caption slide
   ========================================================================= */

const posterScaleTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#poster",
        scroller: "#main",
        start: "top 80%",
        scrub: 1,
        invalidateOnRefresh: true
    }
});

posterScaleTl.to("#poster", { scale: 1.2 });
posterScaleTl.to("#post", {
    scale: 1,
    marginTop: () => window.innerWidth <= 505 ? "20vh" : "52vh"
}, "<0.3");

const posterFadeOutTl = gsap.timeline({
    scrollTrigger: {
        scroller: "#main",
        trigger: "#poster",
        start: "top 55%",
        end: "top 50%",
        scrub: true
    }
});

posterFadeOutTl.to("#thcr", { opacity: 0 });
posterFadeOutTl.to("#tcr", { opacity: 0 }, "<");

gsap.to("#capt", {
    right: "-10%",
    scrollTrigger: {
        scroller: "#main",
        trigger: "#poster",
        start: "top 75%",
        scrub: 3
    }
});


/* =========================================================================
   SECTION "#sym": background tint change + horizontal slide + ocr tint
   ========================================================================= */

const symBgTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        start: "top 30%",
        scrub: 3
    }
});

symBgTl.to("#front", { backgroundColor: "#EBF4EA" });
symBgTl.to("#main", { backgroundColor: "#EBF4EA" }, "<");

// If the user scrolls back up near the very top, force the background
// back to the default (guards against the tint animations above getting stuck).
function resetBackgroundNearTop() {
    if (getScrollY() < 100) {
        gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3, overwrite: "auto" });
    }
}
if (isSmoothActive()) {
    locoScroll.on("scroll", resetBackgroundNearTop);
} else {
    window.addEventListener("scroll", resetBackgroundNearTop);
}

gsap.to("#sym", {
    left: "-50%",
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        scrub: 4,
        start: "top 88%"
    }
});

gsap.to("#ocr", {
    backgroundColor: "#E5EEE4",
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        scrub: 5,
        start: "top 9%"
    }
});


/* =========================================================================
   OC / THC HOVER: background-image reveal on #one / #two / #three
   ========================================================================= */

const revealTargets = document.querySelectorAll("#one, #two, #three");

const imagesOC = [
    '59940 reimagined.webp',
    'boxroom/boxroom (1) reimagined (1).webp',
    'res1dining/dinig2.webp'
];

const imagesTHC = [
    'res1bath/washroom(3).webp',
    'res1kitch/kitchen mint.webp',
    'res1livin/living10.webp'
];

function triggerReveal(isEnter, imageList = []) {
    gsap.killTweensOf(revealTargets);

    if (isEnter) {
        revealTargets.forEach((div, index) => {
            div.style.setProperty('--reveal-img', `url('${imageList[index]}')`);
        });

        gsap.to(revealTargets, {
            "--opacity-before": 1,
            "--blur-after": "10px",
            "--blur-before": "0px",
            duration: 0.7,
            overwrite: true
        });
    } else {
        gsap.to(revealTargets, {
            "--opacity-before": 0,
            "--blur-after": "0px",
            "--blur-before": "20px",
            duration: 0.5,
            overwrite: true
        });
    }
}

oc.addEventListener("mouseenter", () => triggerReveal(true, imagesOC));
oc.addEventListener("mouseleave", () => triggerReveal(false));
thc.addEventListener("mouseenter", () => triggerReveal(true, imagesTHC));
thc.addEventListener("mouseleave", () => triggerReveal(false));


/* =========================================================================
   ".frame" / ".frame2": p / roj / ect / s labels — fade-in, pin, and move
   ========================================================================= */

const frameLabels = ["#p", "#roj", "#ect", "#s"];

gsap.set(frameLabels, { position: "relative", zIndex: 11 });

gsap.timeline({
    scrollTrigger: {
        trigger: ".frame",
        scroller: "#main",
        start: "top 41%",
        end: "top 38%",
        scrub: 1
    }
}).from(frameLabels, { opacity: 0, y: 10 });

// Pin each label individually (desktop/tablet only)
ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
        frameLabels.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: ".frame2",
                    scroller: "#main",
                    start: "top 80%",
                    end: "top -186%",
                    pin: el,
                    pinSpacing: false,
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });
    }
});

// Move the labels into position while pinned.
// matchMedia auto-recreates this on resize/orientation change (e.g. mobile
// address-bar show/hide), so it always uses the right desktop/mobile timeline.
ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".frame2",
                scroller: "#main",
                start: "top 75%",
                end: "top -183%",
                scrub: 3
            }
        })
            .to("#p", { top: "23vh", left: "21.5vw" }, "<")
            .to("#roj", { top: "22vh", left: "6.2vw" }, "<")
            .to("#s", { top: "22vh", right: "20vw", left: "initial" }, "<");
    },
    "(max-width: 768px)": function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".frame2",
                scroller: "#main",
                start: "top 75%",
                end: "top -183%",
                scrub: 3
            }
        })
            .to("#p", { top: "280vh", left: "13vw" })
            .to("#roj", { top: "280vh", left: "-0.8vw" }, "<")
            .to("#ect", { top: "280vh", left: "-2vw" }, "<")
            .to("#s", { top: "280vh", right: "14.8vw", left: "initial" }, "<");
    }
});


/* =========================================================================
   ".frame5": gola shrink + label color change + ocr grow/tint
   ========================================================================= */

const golaShrinkTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame5",
        scroller: "#main",
        start: "top 20%",
        preventOverlaps: true,
        scrub: 1
    }
});

golaShrinkTl.to("#gola", { scale: 0.5, top: "92vh", backgroundColor: "#B8C7B3" });
golaShrinkTl.to("#p h1", { color: "#3c3c3c" }, "<");
golaShrinkTl.to("#roj h1", { color: "#3c3c3c" }, "<");
golaShrinkTl.to("#ect h1", { color: "#3c3c3c" }, "<");
golaShrinkTl.to("#s h1", { color: "#3c3c3c" }, "<");

const ocrGrowTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame5",
        scroller: "#main",
        start: "top 20%",
        end: "top 0%", // explicit end keeps scrub accurate
        scrub: true,
        preventOverlaps: true,
        fastScrollEnd: true
    }
});

ocrGrowTl.to("#ocr", {
    scale: 2,
    top: () => window.innerWidth <= 505 ? "290vh" : "310vh",
    backgroundColor: "#B8C7B3",
    immediateRender: false // don't force old color on the initial frame
});


/* =========================================================================
   "#ocr" PIN near "#sym" (mobile vs desktop behave differently)
   ========================================================================= */

ScrollTrigger.matchMedia({
    "(max-width: 705px)": function () {
        ScrollTrigger.create({
            trigger: "#sym",
            scroller: "#main",
            start: "top 0%",
            end: "top -155%",
            pin: "#ocr",
            pinType: "transform",
            scrub:true
        });
    },
    "(min-width: 706px)": function () {
        gsap.to("#ocr", {
            scrollTrigger: {
                trigger: "#sym",
                scroller: "#main",
                start: "top 17%",
                end: "top -258%",
                pin: "#ocr",
                scrub: true
            }
        });
    }
});


/* =========================================================================
   "#view": "view all projects" fade-in + leaf decorations
   ========================================================================= */

gsap.to("#view", {
    opacity: 1,
    zIndex: 15,
    scrollTrigger: {
        trigger: "#view",
        scroller: "#main",
        scrub: 1,
        start: "top 77%",
        end: "top 72%"
    }
});

gsap.from("#projects", {
    opacity: 0,
    y: 10,
    scrollTrigger: {
        trigger: "#view",
        scroller: "#main",
        scrub: true,
        start: "top 90%",
        end: "top 80%"
    }
});

gsap.from("#projects2", {
    opacity: 0,
    y: 10,
    scrollTrigger: {
        trigger: "#view",
        scroller: "#main",
        scrub: true,
        start: "top 90%",
        end: "top 80%"
    }
});

const leafFadeTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#view",
        scroller: "#main",
        scrub: true,
        start: "top 77%",
        end: "top 72%"
    }
});

leafFadeTl.from(".leaf-exact", { opacity: 0 });
leafFadeTl.from(".leaf-exact2", { opacity: 0 }, "<");
leafFadeTl.from("#leaft", { opacity: 0, y: 10 }, "<");

const viewEl = document.querySelector("#view");

viewEl.addEventListener("mouseenter", () => {
    gsap.timeline()
        .to("#ocr", { scale: 2.2, overwrite: "auto" })
        .to(".leaf-exact", { rotate: "18deg", top: "595vh", left: "36%" }, "<")
        .to(".leaf-exact2", { rotate: "47deg", top: "600vh", left: "53%" }, "<");
});

viewEl.addEventListener("mouseleave", () => {
    gsap.timeline()
        .to("#ocr", { scale: 2, overwrite: "auto" })
        .to(".leaf-exact", { rotate: "-10deg", top: "603vh", left: "37.3%" }, "<")
        .to(".leaf-exact2", { rotate: "-17deg", top: "593vh", left: "51%" }, "<");
});

// Click "#view" navigates to the full projects page
viewEl.addEventListener("click", () => {
    window.location.href = "./view.html";
});


/* =========================================================================
   "#leaft": background back to light + ocr repositioning
   ========================================================================= */

const backToLightTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#leaft",
        scroller: "#main",
        start: "top 27%",
        scrub: 3
    }
});

backToLightTl.to("#front", { backgroundColor: "#f6f6f6" });
backToLightTl.to("#main", { backgroundColor: "#f6f6f6" }, "<");

gsap.timeline({
    scrollTrigger: {
        trigger: "#poster",
        start: "top 26%",
        end: "bottom top",
        scroller: "#main",
        scrub: 1,
        onLeave: () => {
            gsap.set("#ocr", {
                top: window.innerWidth <= 505 ? "150vh" : ""
            });
        }
    }
}).to("#ocr", {
    top: () => window.innerWidth <= 505 ? "190vh" : "219.5vh",
    left: () => window.innerWidth <= 505 ? "50%" : "9vw",
    xPercent: () => window.innerWidth <= 505 ? -25 : -50,
    ease: "none"
});


/* =========================================================================
   "#x" / "#z": x/y/z image move + arrow rotate-in
   ========================================================================= */

const xyzMoveTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#x",
        scroller: "#main",
        scrub: 6,
        start: "top 90%"
    }
});

xyzMoveTl.to("#y", { left: "20%" });
xyzMoveTl.to("#xi", { top: "650vh", scale: 1.05 }, "<");
xyzMoveTl.to("#yi", { top: "662vh", scale: 1.05 }, "<");
xyzMoveTl.to("#zi", { top: "655vh", scale: 1.05 }, "<");

const arrowTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#z",
        scroller: "#main",
        scrub: 4,
        start: "top 85%",
        end: "top 55%"
    }
});

arrowTl.to("#z i", { rotate: "0deg" });
arrowTl.to("#z h1", { opacity: 1, x: 10 }, "<0.2");


/* =========================================================================
   "#behance": continuous spin + hover scale
   ========================================================================= */

const behance = document.querySelector("#behance");

gsap.to("#behance", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
});

behance.addEventListener("mouseenter", () => {
    gsap.to("#behance", { scale: 1.2, duration: 0.3 });
});

behance.addEventListener("mouseleave", () => {
    gsap.to("#behance", { scale: 1, duration: 0.3 });
});


/* =========================================================================
   Custom cursor follower
   ========================================================================= */

const cursor = document.querySelector("#cursor");
const main = document.querySelector("#main");
let cursorRevealed = false; // PERF FIX: only fade the cursor in once, not on every mousemove

main.addEventListener("mousemove", (dets) => {
    if (!cursorRevealed) {
        gsap.to(cursor, { top: "0%" });
        cursorRevealed = true;
    }
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        duration: 0.8, // PERF FIX: removed the earlier duplicate `duration: 0.3` key (dead code)
        ease: "power3.out"
    });
});