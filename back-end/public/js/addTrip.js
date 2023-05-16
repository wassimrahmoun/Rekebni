"use strict";
var userId = window.localStorage.getItem("userid");
var userSlug = window.localStorage.getItem("userSlug");
var userPic = window.localStorage.getItem("userPic");
/* const nbPersonnesFunction = function(){
    nbPersonnesElements.forEach(btn=> {if(btn.checked) nbPersonnes = btn.value}) ;
} */ // old nbPersonnes check box element

/*
const rechercheId = function(data,email){
  let id = 0 ;
  data.forEach(data=>{
    if(data.email === email.toLowerCase()) id=data.id;
  } )
  return id ;
} */

if (!userId) window.location.href = "/login"; // Verifier si il est connecté
else {
  document.addEventListener("DOMContentLoaded", function () {
    // document.querySelector(".profile-pic").setAttribute("src",`back-end/public/img/user/${userPic}`) ;O

    const profilSignOut = document.getElementById("signout"); // Déconnecter
    profilSignOut.addEventListener("click", async function () {
      await fetch("http://localhost:8000/api/v1/users/logout") ;
      window.localStorage.removeItem("userid") ;
      window.location.href = "/";
      
    });

    const locations = document.querySelectorAll(".destination-input");
    const heures = document.querySelectorAll(".time-input");
    const nbPersonnesElements = document.getElementById("nbrpersonne-input");
    const container = document.querySelector(".container");
    const trajetsSimilar = document.querySelector(".trajet-similairs");
    var nbPersonnes = 0;

    document.querySelector(".affiche-btn").addEventListener("click", function () {   // Trajets similaires
        trajetsSimilar.classList.remove("hide-similar");
      });

    document.querySelector(".ajouter-btn").addEventListener("click", async function (e) {     // Ajouter trajet
        e.preventDefault();
        try {
          const depart = locations[0].value;
          const destination = locations[1].value;
          const carType = document.getElementById("vehicule-input").value;
          const matricule = document.getElementById("matricule-input").value;
          const fumeur = document.getElementById("fumeur-input").checked; // boolean
          const date = document.getElementById("date-input").value;
          const heureDepart = heures[0].value;
          const heureArrivé = heures[1].value;
          const prix = document.getElementById("price-input").value;
          // check inputs function
          const inputsEmpty = function () {
            let inputsEmptyVar = false;
            if (destination && depart && carType && matricule && date && heureDepart && heureArrivé && prix)  inputsEmptyVar = false;
            else inputsEmptyVar = true;
            return inputsEmptyVar;
          };
          //

          if (inputsEmpty()) throw new Error("Please check your inputs ❌"); // if there's an error it automatically goes to the catch block

          const res = await fetch("http://localhost:8000/api/v1/trajets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Depart: depart,
              Arrivée: destination,
              Vehicule: carType,
              Matricule: matricule,
              places: nbPersonnes,
              fumers: fumeur,
              date: date,
              HeurD: heureDepart,
              HeurA: heureArrivé,
              Prix: prix,
              Conducteur: userId,
              slug:userSlug
            }),
          });
          console.log(res) ;
          if (!res.ok)
            throw new Error(`Something went wrong ❌ , please try again later`);

          await res.json();

          window.location.href = "/recherche";
        } catch (err) {
          document.querySelectorAll(".erreur").forEach((txt) => txt.remove());
          const html = ` <div class="invalid erreur" style="display: flex;" >
      <p class="invalid-text">
      (${err.message})
      </p>
      <ion-icon
        class="invalid-icon"
        name="alert-circle-outline"
      ></ion-icon>
    </div>`;
          container.insertAdjacentHTML("afterend", html);
        }
      });
  });
}
