var user = JSON.parse(window.localStorage.getItem("userJson"));
var userId;
if (user) userId = user.id;

document.addEventListener("DOMContentLoaded", async function () {
  const url = "http://localhost:8000/api/v1/reviews";
  const conducteurId = 20;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review: "",
      rating: "",
      conducteur: "",
      user: userId,
    }),
  });
});
