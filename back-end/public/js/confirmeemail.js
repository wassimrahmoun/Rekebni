// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".emailInput");
//   const btn = document.querySelector(".btn");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault(); // Empêche le comportement par défaut du formulaire

//     const email = document.getElementById("email").value; // Récupérer l'adresse e-mail depuis le champ e-mail

//     if (!email) {
//       alert("Veuillez entrer une adresse e-mail valide.");
//       return;
//     }

//     const donnees = {
//       email: email,
//     };

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v1/users/forgotPassword",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(donnees),
//         }
//       );

//       if (response.ok) {
//         console.log("Succès");
//         const data = await response.json();
//         const token = data.message;
//         console.log(token);
//         console.log(data);
//         window.localStorage.setItem("resetpass", JSON.stringify(data));
//         window.localStorage.setItem("resettoken", JSON.stringify(token));
//       } else {
//         console.log("Échec");
//         console.log(response);
//       }
//     } catch (error) {
//       // Une erreur s'est produite lors de l'envoi de la requête
//       console.error("Erreur lors de l'envoi de la requête POST :", error);
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".emailInput");
  const btn = document.querySelector(".btn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const email = document.getElementById("email").value; // Get the email address from the email input field
    console.log(email);
    window.localStorage.setItem("resetEmail", email);

    if (!email) {
      alert("Veuillez entrer une adresse e-mail valide."); // Display an alert if the email is empty
      return;
    }

    const donnees = {
      email: email,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donnees),
        }
      );

      if (response.ok) {
        console.log("Succès");
        const data = await response.json();
        const url = data.url; // Update to get the reset URL from the response
        const token = data.token; // Update to get the reset token from the response
        console.log(token);
        console.log(data);
        window.localStorage.setItem("resetpass", JSON.stringify({ url }));
        window.localStorage.setItem("resettoken", JSON.stringify(token));
      } else {
        console.log("Échec");
        console.log(response);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête POST :", error);
    }
  });
});
