const profilePic = document.querySelector(".profile-pic");
document.addEventListener("DOMContentLoaded", function () {
  const trajetbox = document.querySelector(".search-results");
  const mesDonnees = JSON.parse(localStorage.getItem("mes-donnees"));
  console.log(mesDonnees);
  const nbrtrajet = mesDonnees.results;
  console.log(nbrtrajet);
  // Assuming there is only one trajet in the data array
  for (let i = 0; i <= nbrtrajet; i++) {
    const trajet = mesDonnees.data[i];
    const trajets = {
      status: mesDonnees.status,
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
    };

    console.log(trajets);
    const recherche_trajet = ` 
  <div class="results-box">
  <div class="result">
  <div class="left">
    <div class="driver-info">
      <div class="profile-pic"><img src="${trajets.photo}"></div>
      <div class="next-to-pic">
        <div class="name">${trajets.Conducteur}</div>
        <span class="rating">
          <ion-icon name="star-outline" class="icon"></ion-icon>
          <span class="rating-value">4.9</span>
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
      <span class="price-text"> DA</span>
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
});
