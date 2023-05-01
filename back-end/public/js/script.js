function revealOnScroll() {
  var revealItems = document.querySelectorAll(".info-title-text");
  for (var i = 0; i < revealItems.length; i++) {
    var windowHeight = window.innerHeight;
    var revealItemTop = revealItems[i].getBoundingClientRect().top;
    var revealItemPoint = 70;

    if (revealItemTop < windowHeight - revealItemPoint) {
      revealItems[i].classList.add("is-visible");
    }

  /*  document.querySelectorAll(".info-img").forEach(img=>{ const revealItemTop2 = img.getBoundingClientRect().top;
                                                          if (revealItemTop2 < windowHeight - revealItemPoint)
                                                          img.classList.add("show-image-transition")}) ; */
                                                            // Transition 2
  } 

}
window.addEventListener("scroll", revealOnScroll);
//lazy loading images
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const imgTargets = document.querySelectorAll("img[data-src]");

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-img");
//   });

//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: "50px",
// });

// imgTargets.forEach((img) => imgObserver.observe(img));
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// le code est dans la page html
// animation ecriture
