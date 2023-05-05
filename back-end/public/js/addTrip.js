'use strict';
const locations = document.querySelectorAll(".destination-input") ;
const heures = document.querySelectorAll(".time-input") ;
const nbPersonnesElements = document.querySelectorAll(".nbrpersonne-input") ;
var nbPersonnes = 0 ;
const nbPersonnesFunction = function(){
    nbPersonnesElements.forEach(btn=> {if(btn.checked) nbPersonnes = btn.value}) ;
}

const container = document.querySelector(".container") ;

document.querySelector(".ajouter-Btn").addEventListener("click",async function(e){
    e.preventDefault() ;
    try{
    const destination = locations[0].value ; 
    const depart = locations[1].value ;
    const carType = document.getElementById("vehicule-input").value ;
    const matricule = document.getElementById("matricule-input").value ;
    //
    nbPersonnesFunction() ;
    //
    const fumeur = document.getElementById("fumeur-input").checked ;      // boolean
    const date = document.getElementById("date-input").value;
    const heureDepart = heures[0].value ;
    const heureArrivé = heures[1].value ;
    const prix = document.getElementById("price-input").value ;
    
    // check inputs function
    const inputsEmpty =function(){
        let inputsEmptyVar = false ;
        if (destination && depart && carType && matricule && date && heureDepart && heureArrivé && prix) inputsEmptyVar = false 
         else  inputsEmptyVar = true ;
    return inputsEmptyVar ;
    }
    //

    if (inputsEmpty()) throw new Error("Please check your inputs ❌") ;       // if there's an error it automatically goes to the catch block

    const res = await fetch("http://localhost:8000/api/v1/trajets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Depart:depart,
          Arrivée:destination,
          Vehicule:carType,
          Matricule:matricule,
          places:nbPersonnes,
          fumers:fumeur,
          date:date,
          HeurD:heureDepart,
          HeurA:heureArrivé,
          Prix:prix
        }),}) ;

     if (!res.ok) throw new Error(`Something went wrong ❌ , please try again later`)   ;
                                  
    await res.json() ;   

    window.location.href = "/recherche" ;

    } catch(err){
      document.querySelectorAll(".erreur").forEach(txt=>txt.remove()) ;
      const html =` <div class="invalid erreur" style="display: flex;" >
      <p class="invalid-text">
      (${err.message})
      </p>
      <ion-icon
        class="invalid-icon"
        name="alert-circle-outline"
      ></ion-icon>
    </div>`
    container.insertAdjacentHTML("afterend",html) ;
        }


})
