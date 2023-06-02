document.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/v1/users";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
