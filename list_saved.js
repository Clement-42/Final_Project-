
    document.getElementById("burger").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("hidden");
      document.querySelector(".main-content").classList.toggle("shifted");
    });

    const saved = JSON.parse(localStorage.getItem("armyLists") || "[]");
    const container = document.getElementById("saved-lists");

    if (saved.length === 0) {
      container.innerHTML = "<p>No lists saved.</p>";
    } else {
      saved.forEach((list, index) => {
        const div = document.createElement("div");
        div.className = "unit-card";
        div.innerHTML = `
          <h3>${list.name}</h3>
          <p>Date : ${new Date(list.createdAt).toLocaleString()}</p>
          <ul>
            ${list.units.map(u => `<li>${u.quantity} x ${u.name} = ${u.quantity * u.points} pts</li>`).join("")}
          </ul>
          <p><strong>Total :</strong> ${list.totalPoints} pts</p>
          <button onclick="deleteList(${index})">🗑 Deleted</button>
        `;
        container.appendChild(div);
      });
    }

    function deleteList(index) {
      const saved = JSON.parse(localStorage.getItem("armyLists") || "[]");
      saved.splice(index, 1);
      localStorage.setItem("armyLists", JSON.stringify(saved));
      location.reload();
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  alert("You must be logged in to access this page.");
  window.location.href = "login.html";
}

const allLists = JSON.parse(localStorage.getItem("armyLists") || "[]");
const save = allLists.filter(list => list.user === user.username);

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