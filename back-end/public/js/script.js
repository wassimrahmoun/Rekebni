// search
document.addEventListener("DOMContentLoaded", () => {
  const recherche = document.querySelector(".searchbar-btn");
  recherche.addEventListener("click", async (event) => {
    event.preventDefault();
    const departs = document.getElementById("departs");
    const departSelection = departs.options[departs.selectedIndex].value;
    const arriver = document.getElementById("arrives");
    const arriveSelection = arriver.options[arriver.selectedIndex].value;
    const date = document.getElementById("myDate");
    const dateValue = new Date(date.value).toISOString();
    const passager = document.getElementById("passengers").value;

    const url = `http://localhost:8000/api/v1/trajets?Depart=${departSelection}&Arrivée=${arriveSelection}&date=${dateValue}&places[gte]=${passager}`;
    var passengersSelect = document.getElementById("passengers");
    var selectedPassengers = passengersSelect.value;
    localStorage.setItem("selectedPassengers", selectedPassengers);
    // Afficher le nombre de passagers choisi
    console.log("Nombre de passagers choisi : " + selectedPassengers);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = "../recherche";
        localStorage.setItem("mes-donnees", JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  });
});
function revealOnScroll() {
  var revealItems = document.querySelectorAll(".info-title-text");
  for (var i = 0; i < revealItems.length; i++) {
    var windowHeight = window.innerHeight;
    var revealItemTop = revealItems[i].getBoundingClientRect().top;
    var revealItemPoint = 70;

    if (revealItemTop < windowHeight - revealItemPoint) {
      revealItems[i].classList.add("is-visible");
    }

    document.querySelectorAll(".info-img").forEach((img) => {
      const revealItemTop2 = img.getBoundingClientRect().top;
      if (revealItemTop2 < windowHeight - revealItemPoint)
        img.classList.add("show-image-transition");
    });
    //Transition 2
  }

  window.addEventListener("scroll", revealOnScroll);
}
window.addEventListener("scroll", revealOnScroll);

// search
// document.addEventListener("DOMContentLoaded", () => {
//   const recherche = document.querySelector(".searchbar-btn");
//   recherche.addEventListener("click", async (event) => {
//     event.preventDefault();

//     const departs = document.getElementById("departs").value;
//     const arriver = document.getElementById("arrives").value;
//     const date = document.getElementById("myDate");
//     const dateValue = new Date(date.value).toISOString();
//     const passager = document.getElementById("passengers").value;

//     const url = `http://localhost:8000/api/v1/trajets?Depart=${departs}&Arrivée=${arriver}&date=${dateValue}&places[gte]=${passager}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); // Afficher la réponse du serveur dans la console
//         // Traiter les données ici
//       })
//       .catch((error) => console.error(error));
//   });
// });
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
