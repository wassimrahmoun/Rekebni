window.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".passwordrest");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newPassword = document.getElementById("passwords").value;
    const confirmPassword = document.getElementById("password").value;

    const resetDataString = window.localStorage.getItem("resetpass");
    const resetData = JSON.parse(resetDataString);
    const resetEmail = window.localStorage.getItem("resetEmail");
    console.log(resetEmail);
    const resetToken = window.localStorage.getItem("resettoken");

    const url = resetData.url;

    const donnees = {
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetToken}`,
        },
        body: JSON.stringify(donnees),
      });

      if (response.ok) {
        console.log("Changement de mot de passe confirmé avec succès.");
      } else {
        const invalide = document.querySelector(".invalid");
        invalide.style.display = "flex";
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête PATCH :", error);
    }
  });
});
