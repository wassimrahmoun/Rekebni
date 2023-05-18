var user = JSON.parse(window.localStorage.getItem("userJson"));
var userId ;
var userPic ; var userName ;  var userRating ; var userPseudo ; var userPhone ; var userEmail ;
if(user)  {userId = user.id
           userPic = user.photo ;
           userName = user.name ;
           userRating = user.ratingsAverage ;
           userPseudo = user.pseudo ;
           userPhone=user.phone ;
           userPhoneFormatted = userPhone.slice(4);
           userEmail = user.email ; } ;

 const signOutEventListener=function(){
    const profilSignOut = document.querySelector(".disconnect"); // Déconnecter
     profilSignOut.addEventListener("click", async function () {
            await fetch("http://localhost:8000/api/v1/users/logout") ;
            window.localStorage.removeItem("userJson") ;
            window.location.href = "/";
               
             });
         }          

function afficherEtoiles(ranking) {
    const fullStars = Math.floor(ranking);
    const partialStar = Math.round((ranking - fullStars) * 10) / 10;
    let html = "";
    for (let i = 1; i <= fullStars; i++) {
        html += '<img src="../img/star.png" class="head-rating-star" >';
            }
            if (partialStar >= 0.5) {
              html += '<img src="../img/half-star.png" class="head-rating-star" >';
            }
            for (let i = Math.ceil(ranking)+1; i <= 5; i++) {
              html += '<img src="../img/empty-star.png" class="head-rating-star" >';
            }
            return html;
          }           


document.addEventListener("DOMContentLoaded",function(){
    signOutEventListener() ;
    const profilTabInfos = function(){
    const imgElement = document.querySelector(".head-pfp") ;
    const ratingsStarsElement = document.querySelector(".head-rating-stars") ;
    const ratingElement = document.querySelector(".head-rating-score") ;
    const nameElement = document.querySelector(".head-name-fullname") ;
    const pseudoElement = document.getElementById("pseudo") ;
    const phoneElement = document.getElementById("telephone");
    const emailElement = document.getElementById("email");
    const html = afficherEtoiles(userRating) ;

    imgElement.src = `../img/user/${userPic}` ;
    ratingsStarsElement.innerHTML = html ;
    ratingElement.textContent = userRating ;
    nameElement.textContent = userName ;
    pseudoElement.textContent = userPseudo ;
    phoneElement.textContent = userPhoneFormatted ;
    emailElement.textContent = userEmail ;
    }
    profilTabInfos() ;
    console.log(user);
})