gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    // lerp: 0.05,
    // multiplier: 0.3,
    // firefoxMultiplier: 50,
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


// body code start.

gsap.to("#page2", {
    scrollTrigger: {
        scroller: "#main",
        trigger: "#page2",
        pin: "#page2",
        start: "top 0%",
        end: "#top -200%",
        // markers:true,
        // scrub:1
    }
})



var im = document.querySelector(".frame:nth-child(4) .im");
var more = document.querySelector(".frame:nth-child(4) .more");
var tl = gsap.timeline({ paused: true });
tl.to(more, {
    opacity: 1,
    duration: 0.3
});
im.addEventListener("mouseenter", function () {
    tl.play();
});

im.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more || more.contains(e.relatedTarget)) {
        return;
    }
    tl.reverse();
});
more.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im && !im.contains(e.relatedTarget)) {
        tl.reverse();
    }
});


//next


var im2 = document.querySelector(".frame:nth-child(5) .im");
var more2 = document.querySelector(".frame:nth-child(5) .more");
var tl2 = gsap.timeline({ paused: true });
tl2.to(more2, {
    opacity: 1,
    duration: 0.3
});
im2.addEventListener("mouseenter", function () {
    tl2.play();
});

im2.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more2 || more2.contains(e.relatedTarget)) {
        return;
    }
    tl2.reverse();
});
more2.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im2 && !im2.contains(e.relatedTarget)) {
        tl2.reverse();
    }
});

//next

var im3 = document.querySelector(".frame:nth-child(6) .im");
var more3 = document.querySelector(".frame:nth-child(6) .more");
var tl3 = gsap.timeline({ paused: true });
tl3.to(more3, {
    opacity: 1,
    duration: 0.3
});
im3.addEventListener("mouseenter", function () {
    tl3.play();
});

im3.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more3 || more3.contains(e.relatedTarget)) {
        return;
    }
    tl3.reverse();
});
more3.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im3 && !im3.contains(e.relatedTarget)) {
        tl3.reverse();
    }
});

//next

var im4 = document.querySelector(".frame:nth-child(7) .im");
var more4 = document.querySelector(".frame:nth-child(7) .more");
var tl4 = gsap.timeline({ paused: true });
tl4.to(more4, {
    opacity: 1,
    duration: 0.3
});
im4.addEventListener("mouseenter", function () {
    tl4.play();
});

im4.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more4 || more4.contains(e.relatedTarget)) {
        return;
    }
    tl4.reverse();
});
more4.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im4 && !im4.contains(e.relatedTarget)) {
        tl4.reverse();
    }
});

//next

var im5 = document.querySelector(".frame:nth-child(8) .im");
var more5 = document.querySelector(".frame:nth-child(8) .more");
var tl5 = gsap.timeline({ paused: true });
tl5.to(more5, {
    opacity: 1,
    duration: 0.3
});
im5.addEventListener("mouseenter", function () {
    tl5.play();
});

im5.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more5 || more5.contains(e.relatedTarget)) {
        return;
    }
    tl5.reverse();
});
more5.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im5 && !im5.contains(e.relatedTarget)) {
        tl5.reverse();
    }
});

//next


var im6 = document.querySelector(".frame .im");
var more6 = document.querySelector(".frame .more");
var tl6 = gsap.timeline({ paused: true });
tl6.to(more6, {
    opacity: 1,
    duration: 0.3
});
im6.addEventListener("mouseenter", function () {
    tl6.play();
});

im6.addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === more6 || more6.contains(e.relatedTarget)) {
        return;
    }
    tl6.reverse();
});
more6.addEventListener("mouseleave", function (e) {

    if (e.relatedTarget !== im6 && !im6.contains(e.relatedTarget)) {
        tl6.reverse();
    }
});


var layerfnc = gsap.timeline();

layerfnc.to("#layerlock",{
    opacity:0,
    delay:0.5
})

layerfnc.to("#layer1",{
    left:"-50vw",
    delay:.5
},"<0.2")

layerfnc.to("#layer2",{
    right:"-50vw",
   
},"<")
layerfnc.to("#layers",{
    zIndex:"-1"
    
   
})
layerfnc.to("#layerlockmain",{
    zIndex:"-1"
   
},"<")


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
    console.log(dets)
})









// linking projects..


const link1 = document.querySelector(".frame .more");


link1.addEventListener("click", function() {

    window.location.href = "./cont-residential1.html"; 
});

const link2 = document.querySelector(".frame:nth-child(4) .more");


link2.addEventListener("click", function() {

    window.location.href = "./cont.html"; 
});
