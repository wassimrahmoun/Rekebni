// Page d'inscription
const emptyOutInputs = function () {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password-confirmation").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("first-name").value = "";
  document.getElementById("date").value = "";
};
document.addEventListener("DOMContentLoaded", (e) => {
  let form = document.querySelector(".sign-up-card");
  e.preventDefault();
  // Create acc btn
  const createBtn = document.querySelector(".btn-signup");
  createBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      // Necessary input data
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById(
        "password-confirmation"
      ).value;
      const phoneNumber = document.getElementById("num-tel").value;
      const lastName = document.getElementById("last-name").value;
      const firstName = document.getElementById("first-name").value;
      const birthDate = document.getElementById("date").value;

      // Checking inputs
      if (
        phoneNumber.charAt(0) !== "0" ||
        !["5", "6", "7"].includes(phoneNumber.charAt(1)) ||
        phoneNumber.length !== 10
      ) {
        throw new Error("Phone number doesn't exist ❌");
      }

      if (
        !email ||
        !password ||
        !passwordConfirm ||
        !phoneNumber ||
        !firstName ||
        !lastName ||
        !birthDate
      ) {
        throw new Error(`Check your inputs ❌`);
      }
      if (passwordConfirm != password)
        throw new Error(`password fields unmatching ❌`);

      const res = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          slug: "pseudo du user",
          password: password,
          passwordConfirm: passwordConfirm,
          name: `${lastName} ${firstName}`,
          phone: phoneNumber,

          // lastName: lastName,
          // firstName: firstName,
          // birthDate:  birthDate,
        }),
      });
      if (!res.ok)
        throw new Error("Something is wrong ❌ , please try again later !");
      data = await res.json();
      window.location.href = "/login";
    } catch (err) {
      document.querySelectorAll(".erreur").forEach((txt) => txt.remove());
      const html = `<div class="invalid erreur" style="display: flex;" >
      <p class="invalid-text">
      ${err.message}
      </p>
      <ion-icon
        class="invalid-icon"
        name="alert-circle-outline"
      ></ion-icon>
    </div>`;
      form.firstElementChild.insertAdjacentHTML("beforeend", html);
    }
  });
});
