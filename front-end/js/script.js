const navbar = document.querySelector(".header");

window.onscroll = () => {
  if (window.scrollY > 100) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
};
