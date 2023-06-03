// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".logInCard");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("http://localhost:8000/api/v1/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token; // Récupérer le token depuis la réponse JSON
//         const user = data.date.user; // Récupérer les données de l'utilisateur depuis la réponse JSON
//         window.localStorage.setItem("userToken",token) ;
//         window.localStorage.setItem("userJson",JSON.stringify(user)) ;
//         // Connexion réussie, rediriger l'utilisateur vers la page suivante
//        window.location.href = "/";
//       } else {
//         // Afficher un message d'erreur
//         const errorMessage = await response.text();
//         console.log("Erreur de connexion :", errorMessage);
//         const invalide = document.querySelector(".invalid");
//         invalide.style.display = "flex";
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".logInCard");
  const lienChangerPassword = document.getElementById("changepassword");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Récupérer le token depuis la réponse JSON
        const user = data.date.user; // Récupérer les données de l'utilisateur depuis la réponse JSON
        window.localStorage.setItem("userToken", token);
        window.localStorage.setItem("userJson", JSON.stringify(user));

        // Vérifier si l'e-mail est celui de l'administrateur
        if (email === "admin@gmail.com") {
          const currentUrl = window.location.href;
          const currentPathname = window.location.pathname;
          const detailsUrl = currentUrl.replace(
            currentPathname,
            "/html/admin.html"
          );
          window.location.href = detailsUrl;
        } else {
          // Rediriger vers la page d'accueil
          window.location.href = "/";
        }
      } else {
        // Afficher un message d'erreur
        const errorMessage = await response.text();
        console.log("Erreur de connexion :", errorMessage);
        const invalide = document.querySelector(".invalid");
        invalide.style.display = "flex";
      }
    } catch (error) {
      console.error(error);
    }
  });

  lienChangerPassword.addEventListener("click", envoyerRequete);

  function envoyerRequete(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien

    const email = document.getElementById("email").value; // Récupérer l'adresse e-mail depuis le champ e-mail

    if (!email) {
      alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    const donnees = {
      email: email,
    };

    fetch("http://localhost:8000/api/v1/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donnees),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Succès");
          console.log(response);
        } else {
          console.log("Échec");
          console.log(response);
        }
      })
      .catch((error) => {
        // Une erreur s'est produite lors de l'envoi de la requête
        console.error("Erreur lors de l'envoi de la requête POST :", error);
      });
  }
});
