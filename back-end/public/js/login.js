document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".logInCard");

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
        console.log("Token :", token);
        console.log("Données de l'utilisateur :", user);
        window.localStorage.setItem("userid", user.id);
        console.log(user) ;
        window.localStorage.setItem("userSlug",user.pseudo) ;
        window.localStorage.setItem("userPic",user.photo) ;
        // Connexion réussie, rediriger l'utilisateur vers la page suivante
       window.location.href = "/";
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
});
