// console.log("hey");
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#pro"),
    smooth: true,
    // lerp: 0.05,
    // multiplier: 0.3,
    // firefoxMultiplier: 50,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#pro" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#pro", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#pro").style.transform ? "transform" : "fixed"
});






// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



var mid = document.querySelector("#mid");
gsap.to("#mid", {
  scrollTrigger: {
    trigger: "#mid",
    scroller: "#pro",   // locomotive ke liye MUST
    start: "top 0%",
    end: "top -350%",
    pin: "#mid",
    // scrub: true,
    // markers:true
  }
});

var scroll = gsap.timeline({
    scrollTrigger:{
        trigger:"#detail",
        scroller:"#pro",
        scrub:2,
        // markers:true,
        start:"top 100%",
        end:"top 60%"
    }
});

scroll.to("#round",{
    scale:0.5,
    top:"85.5vh"
})
scroll.to("#front-image",{
  top:"-2%"
},"<")

var up =gsap.timeline({
    scrollTrigger:{
        trigger:"#paragraph",
        scroller:'#pro',
        // markers:true,
        start:"top 70%",
        scrub:4,



    }
});
up.to(".frame3",{
    top:"145vh"
})
 var layer = gsap.timeline();
 layer.to("#layer",{
    top:"-150%",
    delay:0.3,
    duration:5,
   
    ease:"expo.In",
 })

  layer.from("#front-text",{
    opacity:0,
    y:15,
    
   
 },"<0.5")

var inv = gsap.timeline({
    scrollTrigger:{
        scroller:"#pro",
        trigger:"#txt1",
        // markers:true,
        scrub:3,
        start:"top 80%",
        end:"top 40%"
    }
});
var inv2 = gsap.timeline({
    scrollTrigger:{
        scroller:"#pro",
        trigger:"#txt1",
        // markers:true,
        scrub:1 ,
        start:"top 80%",
        end:"top 40%"
    }
});

inv2.to("#round2",{
    scale:"1"
})
inv.to(".txt-1",{
    marginTop:"0px"
})

inv.to(".txt-2",{
    marginTop:"0px",
    color:"#2E2E2E"
},"<0.2")
inv.to(".txt-2 h1 ",{
   
    color:"#2E2E2E"
},"<")

inv.to(".txt-3",{
    marginTop:"0px"
})
inv.to("#txt2", {
    // scrollLeft property ko animate karenge
    scrollLeft: document.getElementById("txt2").scrollWidth - document.getElementById("txt2").clientWidth, 
    ease: "none",
  
});
inv.to(".txt-4",{
    marginTop:"0px"
},"<")

var last = gsap.timeline({
    scrollTrigger:{
        scroller:"#pro",
        trigger:"#txt4",
        // markers:true,
        scrub:1,
        start:"top 40%"
    }
});
last.to("#round2",{
    scale:"1.7"
})
last.to("#round2",{
    bottom:"23.3vh",
    left: "12vw"
},"<")

last.to(".ltxt-1",{
   top:"50%"
},"<0.3")
last.to(".ltxt-2",{
   top:"50%"
},"<0.3")



var num1 = document.querySelector("#num1");
var mag1 = gsap.timeline({ paused: true });

mag1.to("#box1", {
    opacity: 1,
    duration: 0.3
})
.to("#num1", {
    opacity: 0,
    duration: 0.2
}, "<"); 

num1.addEventListener("mouseenter", function() {
    mag1.play();
});


num1.addEventListener("mouseleave", function() {
    mag1.reverse();
});
   
var num2 = document.querySelector("#num2");
var mag2 = gsap.timeline({ paused: true });

mag2.to("#box2", {
    opacity: 1,
    duration: 0.3
})
.to("#num2", {
    opacity: 0,
    duration: 0.2
}, "<"); 

num2.addEventListener("mouseenter", function() {
    mag2.play();
});


num2.addEventListener("mouseleave", function() {
    mag2.reverse();
});
   
var num3 = document.querySelector("#num3");
var mag3 = gsap.timeline({ paused: true });

mag3.to("#box3", {
    opacity: 1,
    duration: 0.3
})
.to("#num3", {
    opacity: 0,
    duration: 0.2
}, "<"); 

num3.addEventListener("mouseenter", function() {
    mag3.play();
});


num3.addEventListener("mouseleave", function() {
    mag3.reverse();
});
   