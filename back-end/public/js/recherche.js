//  code propre
var user = JSON.parse(window.localStorage.getItem("userJson"));
var userId ;
if(user)  userId = user.id ;


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
  for (let i = 0; i <= nbrtrajet; i++) {
    const trajet = mesDonnees.data[i];
    const trajets = {
      status: mesDonnees.status,
      id: mesDonnees.data.data[i].id,
      depart: mesDonnees.data.data[i].Depart,
      Arrivée: mesDonnees.data.data[i].Arrivée,
      Conducteur: mesDonnees.data.data[i].Conducteur.name,
      photo: mesDonnees.data.data[i].Conducteur.photo,
      Couleur: mesDonnees.data.data[i].Couleur,
      HeurA: mesDonnees.data.data[i].HeurA,
      HeurD: mesDonnees.data.data[i].HeurD,
      Matricule: mesDonnees.data.data[i].Matricule,
      Passagers: mesDonnees.data.data[i].Passagers,
      Prix: mesDonnees.data.data[i].Prix,
      Vehicule: mesDonnees.data.data[i].Vehicule,
      date: mesDonnees.data.data[i].date,
      fumers: mesDonnees.data.data[i].fumers,
      isActive: mesDonnees.data.data[i].isActive,
      places: mesDonnees.data.data[i].places,
      slug: mesDonnees.data.data[i].slug,
      ranking: mesDonnees.data.data[i].Conducteur.ratingsAverage,
    };
    const trajetbox = document.querySelector(".search-results");
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
          <span class="reviews-value">999</span>
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
        <ion-icon
          name="calendar-outline"
          class="date-icon icon"
        ></ion-icon>
        <div>
          <span>le</span>
          <span class="date-day">${trajets.date.substring(0, 10)}</span>
        </div>
      </div>
      <div class="time">
        <ion-icon
          name="time-outline"
          class="time-icon icon"
        ></ion-icon>
        <div class="time-text">
          <span class="depart-time">${trajets.HeurD}</span>
          <ion-icon
            name="arrow-forward-outline"
            class="icon"
          ></ion-icon>
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
      <ion-icon name="person-outline" class="icon"></ion-icon>
      <span class="remaining-places-value">${trajets.places}</span>
    </div>
  </div>
  </div>
  `;
    trajetbox.insertAdjacentHTML("beforeend", recherche_trajet);
  }
}

const showProfilePic = function(){
  var userPic = user.photo ;
  document.querySelector(".profile-pic").setAttribute("src",`../img/user/${userPic}`) ;
}

const signOutEventListener=function(){
   const profilSignOut = document.getElementById("signout"); // Déconnecter
    profilSignOut.addEventListener("click", async function () {
      await fetch("http://localhost:8000/api/v1/users/logout") ;
      window.localStorage.removeItem("userJson") ;
      window.location.href = "/";
      
    });
}

document.addEventListener("DOMContentLoaded", function () { 
  // verifier si connecté / deconnecté
  const loginRegisterTabs = document.querySelector(".nav-login");
  const profileTab = document.querySelector(".nav-profile");
  if (!userId){
    profileTab.classList.add("hidden") ;
    loginRegisterTabs.classList.remove("hidden") ;
    } 
    else {
      loginRegisterTabs.classList.add("hidden") ;
      profileTab.classList.remove("hidden") ;
      showProfilePic() ;
      signOutEventListener() ;
    }
  //  
    
  
  const mesDonnees = JSON.parse(localStorage.getItem("mes-donnees"));
  console.log(mesDonnees);
  const nbrtrajet = mesDonnees.results;
  console.log(`nbTrajet : ${nbrtrajet}`) ;
  console.log(`mes données ${mesDonnees.data.data[0].id}`) ;
  const selectedPassengers = localStorage.getItem("selectedPassengers");
  displaySearchInfo(mesDonnees, selectedPassengers);
  displayrecherch(nbrtrajet, mesDonnees);
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
