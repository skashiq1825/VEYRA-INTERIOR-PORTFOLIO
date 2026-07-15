// ============================================
// SCROLLER HELPER - Desktop vs Mobile
// ============================================
function getScroller() {
    // Use window for mobile/tablet, #main for desktop
    return window.innerWidth <= 768 ? window : "#main";
}

// Listen for resize to update scroller
let scrollerValue = getScroller();
window.addEventListener("resize", () => {
    scrollerValue = getScroller();
});

// ============================================
// GSAP & ScrollTrigger Setup
// ============================================

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.05,
    multiplier: 0.6,
    firefoxMultiplier: 50,
    // FIX 1: mobile/tablet ke liye alag behavior — transform-hijack + touch scroll
    // conflict hi laggy/unresponsive feel ki sabse badi wajah hoti hai.
    // Pehle smooth:false try karo (native scroll, sabse stable).
    // Agar mobile pe smooth scroll hi chahiye to neeche smooth:true kar dena,
    // lekin phir lerp thoda badha dena (0.1 - 0.15).
    smartphone: {
        smooth: false
    },
    tablet: {
        smooth: false,
        breakpoint: 768
    }
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);
// On mobile, Locomotive Scroll uses native scrolling, so we also listen to the window scroll event
window.addEventListener("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        if (arguments.length) {
            locoScroll.scrollTo(value, 0, 0);
        } else {
            // Check if smooth scroll is currently active (checks if Locomotive Scroll applied transform styles)
            const mainEl = document.querySelector("#main");
            return (mainEl && mainEl.style.transform)
                ? locoScroll.scroll.instance.scroll.y
                : (window.pageYOffset || document.documentElement.scrollTop || 0);
        }
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// ============================================
// HOVER ANIMATIONS - #oc and #thc
// ============================================

var oc = document.querySelector("#oc");
var thc = document.querySelector("#thc");

oc.addEventListener("mouseover", function () {
    var tl = gsap.timeline();
    tl
        .to("#page1", {
            backgroundColor: "transparent",
            duration: .3
        })
        .to("#page1j", {
            opacity: 1,
            duration: .3
        })
        .to("#oc", {
            scale: 1.2,
            delay: -.5
        })
})

oc.addEventListener("mouseleave", function () {
    var tl = gsap.timeline();
    tl
        .to("#page1", {
            backgroundColor: "transparent",
            duration: .3
        })
        .to("#page1j", {
            opacity: 0,
            duration: .3
        })
        .to("#oc", {
            scale: 1,
            delay: -.5
        })
})

thc.addEventListener("mouseover", function () {
    var tl = gsap.timeline();
    tl
        .to("#page1", {
            backgroundColor: "transparent",
            duration: .3
        })
        .to("#page1m", {
            opacity: 1,
            duration: .3
        })
        .to("#thc", {
            scale: 1.2,
            delay: -.5
        })
})

thc.addEventListener("mouseleave", function () {
    var tl = gsap.timeline();
    tl
        .to("#page1", {
            backgroundColor: "transparent",
            duration: .3
        })
        .to("#page1m", {
            opacity: 0,
            duration: .3
        })
        .to("#thc", {
            scale: 1,
            delay: -.5
        })
})

// ============================================
// BACKGROUND COLOR CHANGE - #three section
// ============================================

gsap.to("#main", {
    backgroundColor: "#F5EFE1",
    scrollTrigger: {
        trigger: "#three",
        scroller: scrollerValue,
        start: "top 17%",
        scrub: 3,
        onLeaveBack: () => {
            gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3 });
        }
    }
})

// ============================================
// CARD REVEAL ANIMATIONS - #ocr, #tcr, #thcr
// ============================================

var cl = gsap.timeline({
    scrollTrigger: {
        trigger: "#three",
        scroller: scrollerValue,
        scrub: 1,
        start: "top 50%",
        invalidateOnRefresh: true
    }
});

cl.to("#ocr", {
    top: () => window.innerWidth <= 505 ? "100vh" : "115.6vh",
    x: () => window.innerWidth <= 505 ? "50%" : "27vw",
    zIndex: () => window.innerWidth <= 505 ? "4" : "3",
    scale: 3.9,
    overwrite: "auto"
});

cl.to("#tcr", {
    top: () => window.innerWidth <= 505 ? "114%" : "134%",
    left: () => window.innerWidth <= 505 ? "24%" : "34%",
    scale: 2.7
}, "<")

cl.to("#thcr", {
    top: () => window.innerWidth <= 505 ? "107%" : "134%",
    left: () => window.innerWidth <= 505 ? "28%" : "34%",
    scale: 2
}, "<")

// ============================================
// OPACITY FADE OUT - #oc, #tc, #thc
// ============================================

var ol = gsap.timeline({
    scrollTrigger: {
        trigger: "#ntxt",
        scroller: scrollerValue,
        start: "top 27%",
        scrub: 1,
        end: "top 25%"
    }
});

ol.to("#oc", {
    opacity: 0,
    zIndex: -2
})
ol.to("#tc", {
    opacity: 0,
    zIndex: -2
}, "<")
ol.to("#thc", {
    opacity: 0,
    zIndex: -2
}, "<")

// ============================================
// POSTER ANIMATIONS
// ============================================

var pl = gsap.timeline({
    scrollTrigger: {
        trigger: "#poster",
        scroller: scrollerValue,
        start: "top 80%",
        scrub: 1,
        invalidateOnRefresh: true
    }
});

pl.to("#poster", {
    scale: 1.2
})

pl.to("#post", {
    scale: 1,
    marginTop: () => window.innerWidth <= 505 ? "20vh" : "52vh"
}, "<0.3");

var ok = gsap.timeline({
    scrollTrigger: {
        scroller: scrollerValue,
        trigger: "#poster",
        start: "top 55%",
        end: "top 50%",
        scrub: true
    }
});

ok.to("#thcr", {
    opacity: 0
})
ok.to("#tcr", {
    opacity: 0
}, "<")

gsap.to("#capt", {
    right: "-10%",
    scrollTrigger: {
        scroller: scrollerValue,
        trigger: "#poster",
        start: "top 75%",
        scrub: 3
    }
})

// ============================================
// BACKGROUND & SECTION CHANGES - #sym section
// ============================================

var i = gsap.timeline({
    scrollTrigger: {
        trigger: "#sym",
        scroller: scrollerValue,
        start: "top 30%",
        scrub: 3
    }
});

i.to("#front", {
    backgroundColor: "#EBF4EA",
})
i.to("#main", {
    backgroundColor: "#EBF4EA"
}, "<")

const handleScrollBackground = () => {
    const mainEl = document.querySelector("#main");
    const y = (mainEl && mainEl.style.transform)
        ? locoScroll.scroll.instance.scroll.y
        : (window.pageYOffset || document.documentElement.scrollTop || 0);
    if (y < 100) {
        gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3, overwrite: "auto" });
    }
};
locoScroll.on("scroll", handleScrollBackground);
window.addEventListener("scroll", handleScrollBackground);

// ============================================
// SYMBOL ANIMATIONS
// ============================================

gsap.to("#sym", {
    left: "-50%",
    scrollTrigger: {
        trigger: "#sym",
        scroller: scrollerValue,
        scrub: 4,
        start: "top 88%"
    }
})

gsap.to("#ocr", {
    backgroundColor: "#E5EEE4",
    scrollTrigger: {
        trigger: "#sym",
        scroller: scrollerValue,
        scrub: 5,
        start: "top 9%"
    }
})

// ============================================
// IMAGE REVEAL ON HOVER
// ============================================

const targets = document.querySelectorAll("#one, #two, #three");
const btnOC = document.querySelector("#oc");
const btnTHC = document.querySelector("#thc");

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
    gsap.killTweensOf(targets);

    if (isEnter) {
        targets.forEach((div, index) => {
            div.style.setProperty('--reveal-img', `url('${imageList[index]}')`);
        });

        gsap.to(targets, {
            "--opacity-before": 1,
            "--blur-after": "10px",
            "--blur-before": "0px",
            duration: 0.7,
            overwrite: true
        });
    } else {
        gsap.to(targets, {
            "--opacity-before": 0,
            "--blur-after": "0px",
            "--blur-before": "20px",
            duration: 0.5,
            overwrite: true
        });
    }
}

btnOC.addEventListener("mouseenter", () => triggerReveal(true, imagesOC));
btnOC.addEventListener("mouseleave", () => triggerReveal(false));

btnTHC.addEventListener("mouseenter", () => triggerReveal(true, imagesTHC));
btnTHC.addEventListener("mouseleave", () => triggerReveal(false));

// ============================================
// FRAME ANIMATIONS - .frame section
// ============================================

var ek = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame",
        scroller: scrollerValue,
        start: "top 41%",
        end: "top 38%",
        scrub: 1
    }
});

gsap.set(["#p", "#roj", "#ect", "#s"], { position: "relative", zIndex: 11 });

ek.from(["#p", "#roj", "#ect", "#s"], {
    opacity: 0,
    y: 10
});

const elements = ["#p", "#roj", "#ect", "#s"];

ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
        elements.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: ".frame2",
                    scroller: scrollerValue,
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

// ============================================
// FRAME2 ANIMATIONS - Position movements
// ============================================

ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
        let goo = gsap.timeline({
            scrollTrigger: {
                trigger: ".frame2",
                scroller: scrollerValue,
                start: "top 75%",
                end: "top -183%",
                scrub: 3,
            }
        });

        goo.to("#p", {
            top: "23vh",
            left: "21.5vw"
        }, "<")
            .to("#roj", {
                top: "22vh",
                left: "6.2vw"
            }, "<")
            .to("#s", {
                top: "22vh",
                right: "20vw",
                left: "initial",
            }, "<");
    },
    "(max-width: 768px)": function () {
        let mobileGoo = gsap.timeline({
            scrollTrigger: {
                trigger: ".frame2",
                scroller: scrollerValue,
                start: "top 75%",
                end: "top -183%",
                scrub: 3,
            }
        });

        mobileGoo.to("#p", {
            top: "280vh",
            left: "13vw"
        }, "<")
            .to("#roj", {
                top: "280vh",
                left: "-0.8vw"
            }, "<")
            .to("#ect", {
                top: "280vh",
                left: "-2vw",
            }, "<")
            .to("#s", {
                top: "280vh",
                right: "14.8vw",
                left: "initial",
            }, "<");
    }
});

// ============================================
// FRAME5 ANIMATIONS - Scale & color changes
// ============================================

var boom = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame5",
        scroller: scrollerValue,
        start: "top 20%",
        preventOverlaps: true,
        scrub: 1,
    }
});

boom.to("#gola", {
    scale: 0.5,
    top: "92vh",
    backgroundColor: "#B8C7B3"
})

boom.to("#p h1", {
    color: "#3c3c3c"
}, "<")
boom.to("#roj h1", {
    color: "#3c3c3c"
}, "<")
boom.to("#ect h1", {
    color: "#3c3c3c"
}, "<")
boom.to("#s h1", {
    color: "#3c3c3c"
}, "<")

var bom = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame5",
        scroller: scrollerValue,
        start: "top 20%",
        end: "top 0%",
        scrub: true,
        preventOverlaps: true,
        fastScrollEnd: true,
        markers: true
    }
});

bom.to("#ocr", {
    scale: 2,
    top: "310vh",
    backgroundColor: "#B8C7B3",
    immediateRender: false
});

// ============================================
// PINNING #ocr - Responsive
// ============================================

ScrollTrigger.matchMedia({
    "(max-width: 705px)": function () {
        ScrollTrigger.create({
            trigger: "#sym",
            scroller: window,
            start: "top 15%",
            end: "top -150%",
            pin: "#ocr",
            scrub: 1,
            pinSpacing: false,
            pinReparent: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            markers: true
        });
    },
    "(min-width: 706px)": function () {
        ScrollTrigger.create({
            trigger: "#sym",
            scroller: scrollerValue,
            start: "top 17%",
            end: "top -258%",
            pin: "#ocr",
            pinSpacing: false,
            pinReparent: true,
            invalidateOnRefresh: true,
            markers: true
        });
    }
});

// ============================================
// VIEW & PROJECTS SECTION
// ============================================

gsap.to("#view", {
    opacity: 1,
    zIndex: 15,
    scrollTrigger: {
        trigger: "#view",
        scroller: scrollerValue,
        scrub: 1,
        start: "top 77%",
        end: "top 72%"
    }
})

gsap.from("#projects", {
    opacity: 0,
    y: 10,
    scrollTrigger: {
        trigger: "#view",
        scroller: scrollerValue,
        scrub: true,
        start: "top 90%",
        end: "top 80%"
    }
})

gsap.from("#projects2", {
    opacity: 0,
    y: 10,
    scrollTrigger: {
        trigger: "#view",
        scroller: scrollerValue,
        scrub: true,
        start: "top 90%",
        end: "top 80%"
    }
})

var leaf = gsap.timeline({
    scrollTrigger: {
        trigger: "#view",
        scroller: scrollerValue,
        scrub: true,
        start: "top 77%",
        end: "top 72%"
    }
});

leaf.from(".leaf-exact", {
    opacity: 0,
})
leaf.from(".leaf-exact2", {
    opacity: 0,
}, "<")
leaf.from("#leaft", {
    opacity: 0,
    y: 10
}, "<")

// ============================================
// VIEW HOVER ANIMATIONS - Leaf & scale
// ============================================

var vw = document.querySelector("#view");

vw.addEventListener("mouseenter", function () {
    var pt = gsap.timeline();
    pt.to("#ocr", {
        scale: 2.2,
        overwrite: "auto",
    })
    pt.to(".leaf-exact", {
        rotate: "18deg",
        top: "595vh",
        left: "36%"
    }, "<")
    pt.to(".leaf-exact2", {
        rotate: "47deg",
        top: "600vh",
        left: "53%"
    }, "<")
})

vw.addEventListener("mouseleave", function () {
    var ptt = gsap.timeline();
    ptt.to("#ocr", {
        scale: 2,
        overwrite: "auto",
    })
    ptt.to(".leaf-exact", {
        rotate: "-10deg",
        top: "603vh",
        left: "37.3%"
    }, "<")
    ptt.to(".leaf-exact2", {
        rotate: "-17deg",
        top: "593vh",
        left: "51%"
    }, "<")
})

// ============================================
// COLOR TRANSITIONS - #leaft & #poster sections
// ============================================

var change = gsap.timeline({
    scrollTrigger: {
        trigger: "#leaft",
        scroller: scrollerValue,
        start: "top 27%",
        scrub: 3
    }
});

change.to("#front", {
    backgroundColor: "#f6f6f6"
})
change.to("#main", {
    backgroundColor: "#f6f6f6"
}, "<")

var ch = gsap.timeline({
    scrollTrigger: {
        trigger: "#poster",
        start: "top 26%",
        scroller: scrollerValue,
        end: "bottom top",
        scrub: 1,
        markers: true,
        invalidateOnRefresh: true
    }
});

ch.to("#ocr", {
    top: () => window.innerWidth <= 505 ? "150vh" : "219.5vh",
    left: () => window.innerWidth <= 505 ? "" : "9vw",
    xPercent: () => window.innerWidth <= 505 ? -25 : -50,
    ease: "none",
})

// ============================================
// GALLERY ANIMATIONS - #x, #y, #xi, #yi, #zi
// ============================================

var xi = gsap.timeline({
    scrollTrigger: {
        trigger: "#x",
        scroller: scrollerValue,
        scrub: 6,
        start: "top 90%"
    }
});

xi.to("#y", {
    left: "20%",
})

xi.to("#xi", {
    top: "650vh",
    scale: 1.05
}, "<")

xi.to("#yi", {
    top: "662vh",
    scale: 1.05
}, "<")

xi.to("#zi", {
    top: "655vh",
    scale: 1.05
}, "<")

// ============================================
// ARROW ANIMATIONS - #z section
// ============================================

var arrow = gsap.timeline({
    scrollTrigger: {
        trigger: "#z",
        scroller: scrollerValue,
        scrub: 4,
        start: "top 85%",
        end: "top 55%"
    }
});

arrow.to("#z i", {
    rotate: "0deg"
})
arrow.to("#z h1", {
    opacity: 1,
    x: 10,
}, "<0.2")

// ============================================
// BEHANCE ICON ROTATION & HOVER
// ============================================

var behance = document.querySelector("#behance");

gsap.to("#behance", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
});

behance.addEventListener("mouseenter", function () {
    gsap.to("#behance", {
        scale: 1.2,
        duration: 0.3
    });
});

behance.addEventListener("mouseleave", function () {
    gsap.to("#behance", {
        scale: 1,
        duration: 0.3
    });
});

// ============================================
// GSAP & ScrollTrigger CONFIG
// ============================================

gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
});

ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    syncInterval: 100
});

window.addEventListener("load", function () {
    ScrollTrigger.refresh();
});

// FIX 3: Refresh only on resize, not on scroll
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scrollerValue = getScroller(); // Update scroller value on resize
        ScrollTrigger.refresh();
    }, 200);
});

// ============================================
// NAVIGATION - Link to view.html
// ============================================

const link = document.querySelector("#view");

link.addEventListener("click", function () {
    window.location.href = "./view.html";
});

// ============================================
// CUSTOM CURSOR TRACKING
// ============================================

var cursor = document.querySelector("#cursor");
var main = document.querySelector("#main");

main.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
        top: "0%"
    })
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        duration: 0.3,
        duration: 0.8,
        ease: "power3.out"
    })
})