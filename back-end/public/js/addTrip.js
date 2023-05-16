"use strict";

var user = JSON.parse(window.localStorage.getItem("userJson"));
var userId ;
var userSlug ;
if(user) { userId = user.id ;
           userSlug = user.pseudo  } ;


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
    showProfilePic() ;
    signOutEventListener() ;
    
    

    const locations = document.querySelectorAll(".destination-input");
    const departs = document.querySelectorAll(".personnes-text");
    const destinations = document.querySelectorAll(".personnes-text-arrivée");
    const heures = document.querySelectorAll(".time-input");
    const container = document.querySelector(".container");
    const trajetsSimilar = document.querySelector(".trajet-similairs");
  

    document.querySelector(".affiche-btn").addEventListener("click", function () {   // Trajets similaires
        trajetsSimilar.classList.remove("hide-similar");
      });

    document.querySelector(".ajouter-btn").addEventListener("click", async function (e) {     // Ajouter trajet
        e.preventDefault();
        try {
          const departIndex = locations[0].value - 1 ;
          const destinationIndex = locations[1].value - 1;
          const depart = (departIndex>=0)?departs[departIndex].textContent:"" ;
          const destination =(destinationIndex>=0)?destinations[destinationIndex].textContent:"" ;
          const carType = document.getElementById("vehicule-input").value;
          const matricule = document.getElementById("matricule-input").value;
          const nbPersonnes = document.getElementById("nbrpersonne-input").value ;
          const fumeur = document.getElementById("fumeur-input").checked; // boolean
          const date = document.getElementById("date-input").value;
          const heureDepart = heures[0].value;
          const heureArrivé = heures[1].value;
          const prix = document.getElementById("price-input").value;
          // check inputs function
          const inputsEmpty = function () {
            let inputsEmptyVar = false;
            if (depart && destination && carType && matricule && date && heureDepart && heureArrivé && prix)  inputsEmptyVar = false;
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
