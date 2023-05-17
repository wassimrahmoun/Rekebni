//  code propre
const profilePic = document.querySelector(".profile-pic");
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  return {
    year,
    month,
    day,
  };
}
function displaySearchInfo(mesDonnees, selectedPassengers) {
  const trajetbox = document.querySelector(".search-results");
  const nbrtrajet = mesDonnees.results;
  const departt = mesDonnees.data.data[0].Depart;
  const arriverr = mesDonnees.data.data[0].Arrivée;
  const resultats = mesDonnees.results;
  const Datee = mesDonnees.data.data[0].date.substring(0, 10);
  const formattedDate = formatDate(Datee);
  const infodebase = `
    <span class="searched-trip-info">
      <span class="searched-trip-info-depart">${departt}</span>
      <ion-icon name="arrow-forward-outline" class="icon"></ion-icon>
      <span class="searched-trip-info-arrival">${arriverr}</span>
      <span> le </span>
      <span class="searched-trip-info-day">${formattedDate.day}</span>
      <span class="searched-trip-info-month">${formattedDate.month}</span>
      <span> pour </span>
      <span class="searched-trip-info-passengers-value">${selectedPassengers}</span>
      <span class="searched-trip-info-passengers-text">Personnes</span>
    </span>
    <span class="amount-of-results">
      <span class="amount-of-results-value">${resultats}</span>
      <span class="amount-of-results-text">Résultats</span>
    </span>
  `;

  trajetbox.insertAdjacentHTML("afterbegin", infodebase);
}
function displayrecherch(nbrtrajet, mesDonnees) {
  const trajetbox = document.querySelector(".search-results");

  for (let i = 0; i < nbrtrajet; i++) {
    const trajet = mesDonnees.data.data[i];
    const trajets = {
      id: trajet.id,
      status: mesDonnees.status,
      depart: trajet.Depart,
      Arrivée: trajet.Arrivée,
      Conducteur: trajet.Conducteur.name,
      photo: trajet.Conducteur.photo,
      Couleur: trajet.Couleur,
      HeurA: trajet.HeurA,
      HeurD: trajet.HeurD,
      Matricule: trajet.Matricule,
      Passagers: trajet.Passagers,
      Prix: trajet.Prix,
      Vehicule: trajet.Vehicule,
      date: trajet.date,
      fumers: trajet.fumers,
      climatisation: trajet.climatisation,
      isActive: trajet.isActive,
      places: trajet.places,
      slug: trajet.slug,
      ranking: trajet.Conducteur.ratingsAverage,
      reviews: Object.keys(trajet.reviews).length,
    };

    const recherche_trajet = `
      <div class="results-box" id="${trajets.id}">
        <div class="result">
          <div class="left">
            <div class="driver-info">
              <div class="profile-pic">
                <img src="../img/user/${trajets.photo}" alt="photo conducteur">
              </div>
              <div class="next-to-pic">
                <div class="name">${trajets.Conducteur}</div>
                <span class="rating">
                  <ion-icon name="star-outline" class="icon"></ion-icon>
                  <span class="rating-value">${trajets.ranking}</span>
                  <span>/ 5 - </span>
                </span>
                <span class="reviews">
                  <span class="reviews-value">${trajets.reviews}</span>
                  <span class="reviews-text"> Avis</span>
                </span>
              </div>
            </div>
            <div class="trip-info">
              <span class="locations">
                <span>de</span>
                <span class="depart">${trajets.depart}</span>
                <span> à </span>
                <span class="arrival">${trajets.Arrivée}</span>
              </span>
              <div class="date">
                <ion-icon name="calendar-outline" class="date-icon icon"></ion-icon>
                <div>
                  <span>le</span>
                  <span class="date-day">${trajets.date.substring(0, 10)}</span>
                </div>
              </div>
              <div class="time">
                <ion-icon name="time-outline" class="time-icon icon"></ion-icon>
                <div class="time-text">
                  <span class="depart-time">${trajets.HeurD}</span>
                  <ion-icon name="arrow-forward-outline" class="icon"></ion-icon>
                  <span class="arrival-time">${trajets.HeurA}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <span class="price-value">${trajets.Prix}</span>
              <span class="price-text">DA</span>
            </div>
            <div class="remaining-places">
              <span class="remaining-places-text">Places restantes:</span>
              <ion-icon name="person-outline" class ="icon"></ion-icon>
              <span class="remaining-places-value">${trajets.places}</span>
              </div>
              </div>
              </div>
              </div>
              `;
    trajetbox.insertAdjacentHTML("beforeend", recherche_trajet);
  }
}
function erreur() {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = "Aucun resultat n'est disponible";
  // Insertion du message d'erreur dans le document
  const container = document.querySelector(".search-results");
  container.appendChild(errorMessage);
}
document.addEventListener("DOMContentLoaded", function () {
  const mesDonnees = JSON.parse(localStorage.getItem("mes-donnees"));
  console.log(mesDonnees);
  if (mesDonnees.results === 0) {
    erreur();
  }
  const nbrtrajet = mesDonnees.results;
  const selectedPassengers = localStorage.getItem("selectedPassengers");
  displaySearchInfo(mesDonnees, selectedPassengers);
  displayrecherch(nbrtrajet, mesDonnees);

  const filterACCheckbox = document.getElementById("filter-price");
  filterACCheckbox.addEventListener("click", () => {
    if (filterACCheckbox.checked) {
      url = `http://localhost:8000/api/v1/trajets?Depart=${mesDonnees.data.data[0].Depart}&Arrivée=${mesDonnees.data.data[0].Arrivée}&places[gte]=${selectedPassengers}&date=${mesDonnees.data.data[0].date}&sort=Prix`;

      fetch(url)
        .then((response) => response.json())
        .then((mesDonnees) => {
          console.log(mesDonnees);
          const nbrrtrajet = mesDonnees.results;
          console.log();
          const trajetbox = document.querySelector(".search-results");
          trajetbox.innerHTML = "";

          // const trajettbox = document.querySelector(".search-results");
          displaySearchInfo(mesDonnees, selectedPassengers);
          displayrecherch(nbrrtrajet, mesDonnees);
        })
        .catch((error) => console.error(error));
    }
  });
  const filterACCheckbox2 = document.getElementById("filter-time");
  filterACCheckbox2.addEventListener("click", () => {
    if (filterACCheckbox2.checked) {
      url = `http://localhost:8000/api/v1/trajets?Depart=${mesDonnees.data.data[0].Depart}&Arrivée=${mesDonnees.data.data[0].Arrivée}&places[gte]=${selectedPassengers}&date=${mesDonnees.data.data[0].date}&sort=HeurD`;

      fetch(url)
        .then((response) => response.json())
        .then((donnon) => {
          console.log(mesDonnees);
          const nbrrtrajet = mesDonnees.results;
          console.log();
          const trajetbox = document.querySelector(".search-results");
          trajetbox.innerHTML = "";

          // const trajettbox = document.querySelector(".search-results");
          displaySearchInfo(mesDonnees, selectedPassengers);
          displayrecherch(nbrrtrajet, mesDonnees);
        })
        .catch((error) => console.error(error));
    }
  });
  const filterACCheckbox3 = document.getElementById("filter-duration");
  filterACCheckbox3.addEventListener("click", () => {
    if (filterACCheckbox3.checked) {
      url = `http://localhost:8000/api/v1/trajets?Depart=${mesDonnees.data.data[0].Depart}&Arrivée=${mesDonnees.data.data[0].Arrivée}&places[gte]=${selectedPassengers}&date=${mesDonnees.data.data[0].date}&sort=-Prix`;

      fetch(url)
        .then((response) => response.json())
        .then((mesDonnees) => {
          console.log(mesDonnees);
          const nbrrtrajet = mesDonnees.results;
          console.log();
          const trajetbox = document.querySelector(".search-results");
          trajetbox.innerHTML = "";
          // const trajettbox = document.querySelector(".search-results");
          displaySearchInfo(mesDonnees, selectedPassengers);
          displayrecherch(nbrrtrajet, mesDonnees);
        })
        .catch((error) => console.error(error));
    }
  });
  const interditfumeur = document.getElementById("filter-ac");
  interditfumeur.addEventListener("click", () => {
    if (interditfumeur.checked) {
      url = `http://localhost:8000/api/v1/trajets?Depart=${mesDonnees.data.data[0].Depart}&Arrivée=${mesDonnees.data.data[0].Arrivée}&places[gte]=${selectedPassengers}&date=${mesDonnees.data.data[0].date}&fumers=true`;

      fetch(url)
        .then((response) => response.json())
        .then((donnon) => {
          console.log(mesDonnees);
          const nbrrtrajet = mesDonnees.results;
          if (mesDonnees.results === 0) {
            erreur();
          }
          console.log();
          const trajetbox = document.querySelector(".search-results");
          trajetbox.innerHTML = "";
          // const trajettbox = document.querySelector(".search-results");
          displaySearchInfo(mesDonnees, selectedPassengers);
          displayrecherch(nbrrtrajet, mesDonnees);
        })
        .catch((error) => console.error(error));
    }
  });
  const clim = document.getElementById("filter-smoke");
  clim.addEventListener("click", () => {
    if (clim.checked) {
      url = `http://localhost:8000/api/v1/trajets?Depart=${mesDonnees.data.data[0].Depart}&Arrivée=${mesDonnees.data.data[0].Arrivée}&places[gte]=${selectedPassengers}&date=${mesDonnees.data.data[0].date}&climatisation=true`;

      fetch(url)
        .then((response) => response.json())
        .then((mesDonnees) => {
          console.log(mesDonnees);
          const nbrrtrajet = mesDonnees.results;
          console.log();
          if (mesDonnees.results === 0) {
            erreur();
          }
          const trajetbox = document.querySelector(".search-results");
          trajetbox.innerHTML = "";
          // const trajettbox = document.querySelector(".search-results");
          displaySearchInfo(mesDonnees, selectedPassengers);
          displayrecherch(nbrrtrajet, mesDonnees);
        })
        .catch((error) => console.error(error));
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".results-box").forEach(function (trajetElement) {
    trajetElement.addEventListener("click", function (event) {
      const trajetId = event.currentTarget.id;
      console.log(trajetId);
      localStorage.setItem("selectedTrajetId", trajetId);
      const currentUrl = window.location.href;
      const currentPathname = window.location.pathname;
      const detailsUrl = currentUrl.replace(
        currentPathname,
        "/html/details.html"
      );
      window.location.href = detailsUrl;
    });
  });
});
