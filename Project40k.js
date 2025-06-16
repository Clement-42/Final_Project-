
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  burger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  const content = document.querySelector(".main-content");

  window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userInfoDiv = document.getElementById("user-info");

    if (user && userInfoDiv) {
      userInfoDiv.innerHTML = `Connected as <strong>${user.username}</strong> 
      <button id="logout">Logout</button>`;
      
      document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        alert("Logout");
        window.location.href = "login.html";
      });
    }
  });
});
