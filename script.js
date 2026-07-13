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

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
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


gsap.to("#main", {
    backgroundColor: "#F5EFE1",
    scrollTrigger: {
        trigger: "#three",

        // markers:true,
        scroller: "#main",
        start: "top 17%",
        scrub: 3,
        onLeaveBack: () => {
            gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3 });
        }

    }

})

var cl = gsap.timeline({
    scrollTrigger: {
        trigger: "#three",
        scroller: "#main",
        scrub: 1,
        markers:true,
        start: "top 50%",



    }
});


cl.to("#ocr", {
    // top: "115.6vh",
//    left:"37%",
    // x:"27vw",
   top: window.innerWidth <= 505 ? "100vh" : "115.6vh",
   x: window.innerWidth <= 505 ? "15vw" : "27vw",
   zIndex: window.innerWidth <= 505 ? "4" : "3",

    scale: 3.9,
    // zIndex: 5,
    overwrite: "auto"
});

cl.to("#tcr", {
   top: window.innerWidth <= 505 ? "114%" : "134%",

    // top: "134%",
    // left: "34%",
   left: window.innerWidth <= 505 ? "24%" : "34%",

    scale: 2.7

}, "<")
cl.to("#thcr", {
    // top: "130%",
   top: window.innerWidth <= 505 ? "107%" : "134%",
   left: window.innerWidth <= 505 ? "28%" : "34%",

    // left: "34%",
    scale: 2

}, "<")

// cl.to("#ocr", {
//     top:"148%",
//       left: "50%",
//     xPercent: -50,
   
// });



var ol = gsap.timeline({
    scrollTrigger: {
        trigger: "#ntxt",
        scroller: "#main",
        // markers:true,
        start: "top 27%",
        scrub: 1,
        end: "top 25%",

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

var pl = gsap.timeline({
    scrollTrigger: {
        trigger: "#poster",
        // markers:true,
        scroller: "#main",
        start: "top 80%",

        scrub: 1
    }
});

pl.to("#poster", {
    scale: 1.2
})

// pl.to("#post", {
//     scale: 1,
//     marginTop: "52vh"
// }, "< 0.3")
pl.to("#post", {
    scale: 1,
    marginTop: window.innerWidth <= 505 ? "20vh" : "52vh"
}, "<0.3");




var ok = gsap.timeline({
    scrollTrigger: {
        scroller: "#main",
        trigger: "#poster",
        start: "top 55%",
        // markers:true,
        end: "top 50%",
        scrub: true
    }
});


ok.to("#thcr", {
    opacity: 0
})
ok.to("#tcr", {
    opacity: 0
},"<")




gsap.to("#capt", {
    right: "-10%",
    scrollTrigger: {
        scroller: "#main",
        trigger: "#poster",
        // markers:true,
        start: "top 75%",
        scrub: 3
    }
})

var i = gsap.timeline({
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        // markers:true,
        start: "top 30%",
        scrub: 3,
        // onLeaveBack: () => {
        //     // Force reset to previous section color or default
        //     gsap.to("#main", { backgroundColor: "#F5EFE1", duration: 0.3 });
        // }
    }
});
i.to("#front", {
    backgroundColor: "#EBF4EA",
})
i.to("#main", {
    backgroundColor: "#EBF4EA"
}, "<")




locoScroll.on("scroll", (instance) => {
    if (instance.scroll.y < 100) {
        gsap.to("#main", { backgroundColor: "#f6f6f6", duration: 0.3, overwrite: "auto" });
    }
});



gsap.to("#sym", {
    left: "-50%",
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        scrub: 4,
        start: "top 88%",
        // markers:true


    }
})

console.log(window.innerWidth, window.innerHeight);

gsap.to("#ocr", {
    backgroundColor: "#E5EEE4",
    scrollTrigger: {
        trigger: "#sym",
        scroller: "#main",
        scrub: 5,
        // markers:true,
        start: "top 9%"

    }
})


// yoyoyoyoyo



const targets = document.querySelectorAll("#one, #two, #three");
const btnOC = document.querySelector("#oc");
const btnTHC = document.querySelector("#thc");

// --- Data: Kaunse button ke liye kaunsi images ---
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

// --- Common Animation Function ---
function triggerReveal(isEnter, imageList = []) {
    gsap.killTweensOf(targets);

    if (isEnter) {
        // Hover Enter: Pehle teeno divs ki background-image badlo
        targets.forEach((div, index) => {
            // CSS Variable ke bajaye hum directly style.backgroundImage badal rahe hain
            div.style.setProperty('--reveal-img', `url('${imageList[index]}')`);

            // Ab CSS mein ::before ko batana padega ki wo ye variable use kare (Niche CSS check karein)
        });

        // Ab GSAP se animate karo
        gsap.to(targets, {
            "--opacity-before": 1,
            "--blur-after": "10px",
            "--blur-before": "0px",
            duration: 0.7,
            // ease: "power2.out",
            overwrite: true
        });
    } else {
        // Hover Leave
        gsap.to(targets, {
            "--opacity-before": 0,
            "--blur-after": "0px",
            "--blur-before": "20px",
            duration: 0.5,
            // ease: "power2.inOut",
            overwrite: true
        });
    }
}

// --- Event Listeners ---

// Button #oc ke liye
btnOC.addEventListener("mouseenter", () => triggerReveal(true, imagesOC));
btnOC.addEventListener("mouseleave", () => triggerReveal(false));

// Button #thc ke liye
btnTHC.addEventListener("mouseenter", () => triggerReveal(true, imagesTHC));
btnTHC.addEventListener("mouseleave", () => triggerReveal(false));






var ek = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame",
        scroller: "#main",
        start: "top 41%",
        end: "top 38%",
        scrub: 1
    }
});

// Force zIndex and Position before animation starts
gsap.set(["#p", "#roj", "#ect", "#s"], { position: "relative", zIndex: 11 });

ek.from(["#p", "#roj", "#ect", "#s"], {
    opacity: 0,
    y: 10,
    // ease: "power2.out"
});



const elements = ["#p", "#roj", "#ect", "#s"];

elements.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: ".frame2",
            scroller: "#main",
            start: "top 80%",
            end: "top -186%",
            pin: el, // Har element individually pin hoga
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true
        }
    });
});

// 1. PINNING: Yeh sirf elements ko wahi rok ke rakhega

// 2. ANIMATION (Left/Right/Top)
// FIX 2: isMobile ab sirf ek baar page-load pe calculate nahi hota —
// ScrollTrigger.matchMedia() use kar rahe hain taaki resize / orientation
// change (jo mobile pe address-bar show-hide se bhi trigger hota hai)
// pe ye automatically sahi timeline re-create kare.
ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {

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
        }, "<")

    },

    "(max-width: 768px)": function () {

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
            top: "2vh",
            left: "20vw"
        }, "<")

        .to("#roj", {
            top: "2vh",
            left: "6.2vw"
        }, "<")

        .to("#ect", {
            top: "1.6vh",
            left: "5vw",
        }, "<")

        .to("#s", {
            top: "1.5vh",
            right: "7.8vw",
            left: "initial",
        }, "<")

    }
});


var boom = gsap.timeline({
    scrollTrigger:{
        trigger:".frame5",
        scroller:"#main",
        // markers:true,
        start:"top 20%",
        // end: "top 0%",
         preventOverlaps: true,
        //   fastScrollEnd: true,
        scrub:1,
        
    }
});
boom.to("#gola",{
    scale:0.5,
    top:"92vh",
   

    //  overwrite: "auto",  
    //   immediateRender: false,
    backgroundColor:"#B8C7B3"
    
})
boom.to("#p h1",{
    color:"#3c3c3c"
    
},"<")
boom.to("#roj h1",{
    color:"#3c3c3c"
    
},"<")
boom.to("#ect h1",{
    color:"#3c3c3c"
    
},"<")
boom.to("#s h1",{
    color:"#3c3c3c"
    
},"<")



var bom = gsap.timeline({
    scrollTrigger: {
        trigger: ".frame5",
        scroller: "#main",
        start: "top 20%",
        end: "top 0%", // End point define karne se scrub zyada accurate chalta hai
        scrub: true,
        preventOverlaps: true, // Animations ko aapas mein takrane se rokta hai
        fastScrollEnd: true,   // Fast scroll pe animation ko turant end state pe pahunchata hai
        // markers:true
    }
});

// Main element animation
bom.to("#ocr", {
    scale: 2,
    top: "310vh",
    backgroundColor: "#B8C7B3",
    // ease: "power1.inOut",
    // overwrite: "auto",      // Kisi bhi conflicting animation ko overwrite karega
    immediateRender: false  // Initial frame par purana color force nahi hone dega
});


gsap.to("#ocr", {
    // y: 50,
    // x:"36vw",
    // xPercent:-100,
//   x: "+=13vw",
    scrollTrigger: {
        trigger: "#sym", // Poster ke bottom se hi pinning start karein
        scroller: "#main",
        // start: "top 17%",
        start: () => window.innerWidth <= 505 ? "top -15%" : "top 17%",

        //  // Same starting point as magic swap
        // endTrigger: "#sym1", // Jahan tak le jana hai
        // end: "top -258%",
        end: () => window.innerWidth <= 505 ? "top -150%" : "top -258%",
        pin: "#ocr",
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        immediateRender: false,
        anticipatePin: 1,
        // markers:true
    },
    overwrite: "auto"
});

// Sirf ye 1 ScrollTrigger add kar - baaki kuch mat change kar

gsap.to("#view",{
    opacity:1,
    zIndex:15,
     scrollTrigger:{
        trigger:"#view",
        scroller:"#main",
        scrub:1,
        // markers:true,
        start:"top 77%",
        end:"top 72%"
    }
})
gsap.from("#projects",{
    opacity:0,
    y:10,
     scrollTrigger:{
        trigger:"#view",
        scroller:"#main",
        scrub:true,
        // markers:true,
        start:"top 90%",
        end:"top 80%"
    }
})

gsap.from("#projects2",{
    opacity:0,
    y:10,
     scrollTrigger:{
        trigger:"#view",
        scroller:"#main",
        scrub:true,
        // markers:true,
        start:"top 90%",
        end:"top 80%"
    }
})
var leaf =gsap.timeline({
     scrollTrigger:{
        trigger:"#view",
        scroller:"#main",
        scrub:true,
        // markers:true,
        start:"top 77%",
        end:"top 72%"
    }
});
 leaf.from(".leaf-exact",{
    opacity:0,
   
 })
  leaf.from(".leaf-exact2",{
    opacity:0,
   
 },"<")
  leaf.from("#leaft",{
    opacity:0,
    y:10
   
 },"<")






// var patta1 = document.querySelector(".leaf-exact");
// var patta1 = document.querySelector(".leaf-exact2");
// var gol = document.querySelector("#gola");
var vw = document.querySelector("#view");
vw.addEventListener("mouseenter",function(){
    var pt = gsap.timeline();
    pt.to("#ocr",{
        scale:2.2,
        overwrite: "auto",
    })
    pt.to(".leaf-exact",{
        rotate:"18deg",
        top:"595vh",
        left:"36%"
    },"<")
      pt.to(".leaf-exact2",{
        rotate:"47deg",
        top:"600vh",
        left:"53%"
    },"<")
})

vw.addEventListener("mouseleave",function(){
    var ptt = gsap.timeline();
    ptt.to("#ocr",{
        scale:2,
        overwrite: "auto",
    })
    ptt.to(".leaf-exact",{
        rotate:"-10deg",
        top:"603vh",
        left:"37.3%"
    },"<")
      ptt.to(".leaf-exact2",{
        rotate:"-17deg",
        top:"593vh",
        left:"51%"
    },"<")
})

var change = gsap.timeline({
    scrollTrigger:{
        trigger:"#leaft",
        scroller:"#main",
        // markers:true,
        start:"top 27%",
        scrub:3
    }
});
change.to("#front",{
    backgroundColor:"#f6f6f6"
})
change.to("#main",{
    backgroundColor:"#f6f6f6"
},"<")


var ch = gsap.timeline({
     scrollTrigger: {
        trigger: "#poster",
        start: "top 26%",
        scroller: "#main",
        end: "bottom top", // Yeh point yaad rakhein
        scrub: 1,
    }
});
ch.to("#ocr",{
     top: "219.5vh",
    left: "9vw",
    xPercent: -50,
    ease: "none",
    // immediateRender: false,
})


var xi = gsap.timeline({
    scrollTrigger:{
        trigger:"#x",
        scroller:"#main",
        // markers:true,
        scrub:6,
        start:"top 90%"

    }
});

xi.to("#y",{
    left:"20%",

})



xi.to("#xi",{
    top:"650vh",
    scale:1.05
},"<")


xi.to("#yi",{
    top:"662vh",
    scale:1.05
},"<")
xi.to("#zi",{
    top:"655vh",
    scale:1.05
},"<")


var arrow = gsap.timeline({
      scrollTrigger:{
        trigger:"#z",
        scroller:"#main",
        // markers:true,
        scrub:4,
        start:"top 85%",
        end:"top 55% "
    }
});


arrow.to("#z i",{
    rotate:"0deg"
})
arrow.to("#z h1",{
    opacity:1,
    x:10,
},"<0.2")





var behance = document.querySelector("#behance");

// Pehle rotation start karo (CSS animation ki jagah)
gsap.to("#behance", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
});

// Ab Hover wala kaam smoothly chalega
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

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

ScrollTrigger.config({ 
  limitCallbacks: true, 
  ignoreMobileResize: true,
  syncInterval: 100 
});

window.addEventListener("load", function() {
    ScrollTrigger.refresh();
});


// FIX 3: pehle ye har SCROLL event pe ScrollTrigger.refresh() chala raha tha —
// jo mobile pe (kam powerful CPU/GPU) bohot heavy operation hai aur locomotive
// ke momentum scroll ke saath milke jitter/lag create karta tha.
// Ab refresh sirf window RESIZE (orientation change / address-bar toggle) pe
// hoga, scroll pe nahi.
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});


//linking view all project page..


const link = document.querySelector("#view");


link.addEventListener("click", function() {

    window.location.href = "./view.html"; 
});



 var cursor = document.querySelector("#cursor");
var main = document.querySelector("#main");
main.addEventListener("mousemove",function(dets){
    gsap.to(cursor,{
       top:"0%"
    })
    gsap.to(cursor,{
        x:dets.x,
        y:dets.y,
        duration:0.3,
      duration:0.8,
      ease:"power3.out"
    })
   
})