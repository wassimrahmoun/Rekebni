// login page
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".logInCard");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
    const data = await response.json();
    // gérer la réponse du serveur
    if (response.ok) {
      // connexion réussie, rediriger l'utilisateur vers la page suivante
      window.location.href = "/";
    } else {
      // connexion échouée, afficher un message d'erreur
      const errorMessage = data.message;
      const errorElement = document.createElement("erreur");
      errorElement.textContent = errorMessage;
      form.appendChild(errorElement);
    }
  });
});
