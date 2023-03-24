// // logo white
// // background blue
// // qui somme nous, Recherche, Ajouter un trajet so connecter white
// // icons white
// // sinscrire background white writing blue
// // sinscrire writing blue
// // NORMAL   SPAN
// var image = document.querySelector("img");
// var logo = document.getElementsByClassName("logo");
// var navbar = document.getElementsByClassName("header");
// var spans = document.getElementsByClassName("whitespan");
// var icons = document.getElementsByClassName("whiteicon");
// var sinscrire = document.getElementsByClassName("btn--signup");
// // Listen for the scroll event on the window
// window.addEventListener("scroll", function () {
//   // Get the bounding rectangle of the element
//   var rect = image.getBoundingClientRect();
//   console.log(rect.top, rect.right, rect.bottom, rect.left);
//   // Check if the top of the element is no longer visible
//   if (rect.top < 0) {
//     // Change the CSS properties of the elements
//     // Loop through the collection of span elements
//     // sinscrire
//     sinscrire.style.backgroundColor = "#fff";
//     sinscrire.style.color = "#00aff5";
//     // header
//     navbar.style.backgroundColor = "#00aff5";
//     // spans
//     for (var i = 0; i < spans.length; i++) {
//       // Change the CSS properties of each element
//       spans[i].style.color = "#fff";
//     }
//     // changing icons
//     // icons
//     for (var i = 0; i < icons.length; i++) {
//       // Change the CSS properties of each element
//       icons[i].style.color = "#fff";
//     }
//   } else {
//     // Change the CSS properties back to their original values
//     // header
//     navbar.style.backgroundColor = "#fff";
//     // icons
//     for (var i = 0; i < icons.length; i++) {
//       // Change the CSS properties of each element
//       icons[i].style.color = "#00aff5";
//     }
//     // spans
//     for (var i = 0; i < spans.length; i++) {
//       // Change the CSS properties of each element
//       spans[i].style.color = "#030045";
//     }
//   }
// });

var image = document.getElementsByClassName("logo");
var logo = document.getElementsByClassName("logo");
var navbar = document.getElementsByClassName("header");
var spans = document.getElementsByClassName("whitespan");
var icons = document.getElementsByClassName("whiteicon");
var sinscrire = document.getElementsByClassName("btn--signup");

window.addEventListener("scroll", function () {
  var rect = image.getBoundingClientRect();

  if (rect.top < 0) {
    sinscrire[0].style.backgroundColor = "#fff";
    sinscrire[0].style.color = "#00aff5";
    navbar[0].style.backgroundColor = "#00aff5";
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.color = "#fff";
    }
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.color = "#fff";
    }
  } else {
    navbar[0].style.backgroundColor = "#fff";
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.color = "#00aff5";
    }
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.color = "#030045";
    }
    sinscrire[0].style.backgroundColor = "#030045";
    sinscrire[0].style.color = "#fff";
  }
});

// Get the section element
var section = document.querySelector(".my-section");

// Get the position of the section element
var sectionPosition = section.offsetTop;

// Listen for the scroll event on the window
window.addEventListener("scroll", function () {
  // Check if the user has scrolled past the section
  if (window.scrollY > sectionPosition) {
    console.log("Scrolled past the section!");
    // do something
  } else {
    console.log("Not yet scrolled past the section.");
    // do something else
  }
});
