gsap.registerPlugin(ScrollTrigger);

// ========================================
// 🔧 LOCOMOTIVE SCROLL SETUP (RESPONSIVE)
// ========================================
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.05,
    multiplier: 0.6,
    firefoxMultiplier: 50,
    smartphone: {
        smooth: false
    },
    tablet: {
        smooth: false,
        breakpoint: 768
    }
});

locoScroll.on("scroll", ScrollTrigger.Update);
window.addEventListener("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        if (arguments.length) {
            locoScroll.scrollTo(value, 0, 0);
        } else {
            const mainEl = document.querySelector("#main");
            return (mainEl && mainEl.style.transform)
                ? locoScroll.scroll.instance.scroll.y
                : (window.pageYOffset || document.documentElement.scrollTop || 0);
        }
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


// ========================================
// 🖥️ DESKTOP ANIMATIONS (>= 769px)
// ========================================
const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {

    // --- MOUSE HOVER: #oc Button ---
    var oc = document.querySelector("#oc");
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

    // --- MOUSE HOVER: #thc Button ---
    var thc = document.querySelector("#thc");
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

    // --- BACKGROUND COLOR: #three trigger ---
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
    })

    // --- CARD REVEAL ANIMATION: cl timeline ---
    var cl = gsap.timeline({
        scrollTrigger: {
            trigger: "#three",
            scroller: "#main",
            scrub: 1,
            start: "top 50%",
            invalidateOnRefresh: true
        }
    });

    cl.to("#ocr", {
        top: "115.6vh",
        x: "27vw",
        zIndex: "3",
        scale: 3.9,
        overwrite: "auto"
    });

    cl.to("#tcr", {
        top: "134%",
        left: "34%",
        scale: 2.7
    }, "<")

    cl.to("#thcr", {
        top: "134%",
        left: "34%",
        scale: 2
    }, "<")

    // --- OPACITY ANIMATION: ol timeline ---
    var ol = gsap.timeline({
        scrollTrigger: {
            trigger: "#ntxt",
            scroller: "#main",
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

    // --- POSTER SCALE: pl timeline ---
    var pl = gsap.timeline({
        scrollTrigger: {
            trigger: "#poster",
            scroller: "#main",
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
        marginTop: "52vh"
    }, "<0.3");

    // --- CARD OPACITY: ok timeline ---
    var ok = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
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

    // --- CAPTION ANIMATION ---
    gsap.to("#capt", {
        right: "-10%",
        scrollTrigger: {
            scroller: "#main",
            trigger: "#poster",
            start: "top 75%",
            scrub: 3
        }
    })

    // --- BACKGROUND COLOR: #sym trigger ---
    var i = gsap.timeline({
        scrollTrigger: {
            trigger: "#sym",
            scroller: "#main",
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

    // --- SCROLL BACKGROUND HANDLER ---
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

    // --- SYMBOL LEFT ANIMATION ---
    gsap.to("#sym", {
        left: "-50%",
        scrollTrigger: {
            trigger: "#sym",
            scroller: "#main",
            scrub: 4,
            start: "top 88%"
        }
    })

    // --- CARD BACKGROUND COLOR ---
    gsap.to("#ocr", {
        backgroundColor: "#E5EEE4",
        scrollTrigger: {
            trigger: "#sym",
            scroller: "#main",
            scrub: 5,
            start: "top 9%"
        }
    })

    // --- IMAGE REVEAL ON BUTTON HOVER ---
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

    // --- FRAME ANIMATION: ek timeline ---
    var ek = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame",
            scroller: "#main",
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

    // --- PINNING ELEMENTS: Desktop ---
    const elements = ["#p", "#roj", "#ect", "#s"];
    elements.forEach((el) => {
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

    // --- ELEMENT MOVEMENT: Desktop goo timeline ---
    let goo = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame2",
            scroller: "#main",
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

    // --- FRAME5 ANIMATIONS: boom timeline ---
    var boom = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame5",
            scroller: "#main",
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

    // --- CARD SCALE: bom timeline ---
    var bom = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame5",
            scroller: "#main",
            start: "top 20%",
            end: "top 0%",
            scrub: true,
            preventOverlaps: true,
            fastScrollEnd: true,
        }
    });

    bom.to("#ocr", {
        scale: 2,
        top: "310vh",
        backgroundColor: "#B8C7B3",
        immediateRender: false
    });

    // --- CARD PINNING: Desktop ---
    gsap.to("#ocr", {
        scrollTrigger: {
            trigger: "#sym",
            scroller: "#main",
            start: "top 17%",
            end: "top -258%",
            pin: " #ocr",
            scrub: true,
        }
    });

    // --- PROJECT VIEW ANIMATIONS ---
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
    })
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
    })

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
    })

    var leaf = gsap.timeline({
        scrollTrigger: {
            trigger: "#view",
            scroller: "#main",
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

    // --- VIEW BUTTON HOVER: Leaves ---
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

    // --- BACKGROUND COLOR CHANGE: leaf section ---
    var change = gsap.timeline({
        scrollTrigger: {
            trigger: "#leaft",
            scroller: "#main",
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

    // --- CARD REPOSITIONING: ch timeline ---
    var ch = gsap.timeline({
        scrollTrigger: {
            trigger: "#poster",
            start: "top 26%",
            end: "bottom top",
            scroller: "#main",
            scrub: 1,
        }
    });
    ch.to("#ocr", {
        top: "219.5vh",
        left: "9vw",
        xPercent: -50,
        ease: "none",
    })

    // --- BOTTOM SECTION: xi timeline ---
    var xi = gsap.timeline({
        scrollTrigger: {
            trigger: "#x",
            scroller: "#main",
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

    // --- ARROW ANIMATION ---
    var arrow = gsap.timeline({
        scrollTrigger: {
            trigger: "#z",
            scroller: "#main",
            scrub: 4,
            start: "top 85%",
            end: "top 55% "
        }
    });

    arrow.to("#z i", {
        rotate: "0deg"
    })
    arrow.to("#z h1", {
        opacity: 1,
        x: 10,
    }, "<0.2")

});

// ========================================
// 📱 MOBILE ANIMATIONS (<= 768px)
// ========================================
mm.add("(max-width: 768px)", () => {

    // --- POSTER SCALE: Mobile version ---
    var pl = gsap.timeline({
        scrollTrigger: {
            trigger: "#poster",
            scroller: "#main",
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
        marginTop: "20vh"
    }, "<0.3");

    // --- CARD REVEAL ANIMATION: Mobile version ---
    var cl = gsap.timeline({
        scrollTrigger: {
            trigger: "#three",
            scroller: "#main",
            scrub: 1,
            start: "top 50%",
            invalidateOnRefresh: true
        }
    });

    cl.to("#ocr", {
        top: "100vh",
        x: "50%",
        zIndex: "4",
        scale: 3.9,
        overwrite: "auto"
    });

    cl.to("#tcr", {
        top: "114%",
        left: "24%",
        scale: 2.7
    }, "<")

    cl.to("#thcr", {
        top: "107%",
        left: "28%",
        scale: 2
    }, "<")

    // --- ELEMENT MOVEMENT: Mobile version ---
    let mobileGoo = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame2",
            scroller: "#main",
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

    // --- CARD SCALE: Mobile version ---
    var bom = gsap.timeline({
        scrollTrigger: {
            trigger: ".frame5",
            scroller: "#main",
            start: "top 20%",
            end: "top 0%",
            scrub: true,
            preventOverlaps: true,
            fastScrollEnd: true,
        }
    });

    bom.to("#ocr", {
        scale: 2,
        top: "290vh",
        backgroundColor: "#B8C7B3",
        immediateRender: false
    });

    // --- CARD PINNING: Mobile ---
    ScrollTrigger.create({
        trigger: "#sym",
        scroller: "#main",
        start: "top 0%",
        end: "top -155%",
        pin: "#ocr",
        pinType: "transform",
    });

    // --- CARD REPOSITIONING: Mobile version ---
    var ch = gsap.timeline({
        scrollTrigger: {
            trigger: "#poster",
            start: "top 26%",
            end: "bottom top",
            scroller: "#main",
            scrub: 1,
        }
    });
    ch.to("#ocr", {
        top: "190vh",
        left: "50%",
        xPercent: -25,
        ease: "none",
    })

});


// ========================================
// ⚙️ COMMON CODE (Both Devices)
// ========================================

// --- BEHANCE INFINITE ROTATION ---
gsap.to("#behance", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
});

var behance = document.querySelector("#behance");
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

// --- GSAP & SCROLLTRIGGER CONFIG ---
gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
});

ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    syncInterval: 100
});

// --- REFRESH ON LOAD ---
window.addEventListener("load", function () {
    ScrollTrigger.refresh();
});

// --- REFRESH ON RESIZE ---
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});

// --- VIEW ALL PROJECTS LINK ---
const link = document.querySelector("#view");
link.addEventListener("click", function () {
    window.location.href = "./view.html";
});

// --- CUSTOM CURSOR ---
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