
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  burger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
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
          <div class="list-buttons">
              <button onclick="viewDetail(${index})">🔍 View detail</button>
              <button onclick="exportPDF(${index})">📄 Export PDF</button>
             <button onclick="deleteList(${index})">🗑 Deleted</button>
          </div>
          <div id="detail-${index}" class="detail-view" style="display: none;"></div>
      `;
        container.appendChild(div);
      });
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
});

function deleteList(index) {
  const saved = JSON.parse(localStorage.getItem("armyLists") || "[]");
  saved.splice(index, 1);
  localStorage.setItem("armyLists", JSON.stringify(saved));
  location.reload();
}

function viewDetail(index) {
  const allLists = JSON.parse(localStorage.getItem("armyLists") || "[]");
  const list = allLists[index];
  const container = document.getElementById(`detail-${index}`);

  if (container.style.display === "none") {
    container.style.display = "block";
    container.innerHTML = list.units.map(u => {
            const imageSrc = u.image || "img/default_unit.png"; // 🛡️ fallback
      return`
      <div class="unit-card">
        <img src="${u.image}" alt="${u.name}" class="unit-image">
        <h4>${u.name}</h4>
        <p>Type: ${u.type}</p>
        <p>Points: ${u.points} x ${u.quantity} = ${u.points * u.quantity} pts</p>
      </div>
    `}).join("");
  } else {
    container.style.display = "none";
  }
}

async function exportPDF(index) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const allLists = JSON.parse(localStorage.getItem("armyLists") || "[]");
  const list = allLists[index];

  let y = 10;
  doc.setFontSize(16);
  doc.text(`Army List: ${list.name}`, 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Date: ${new Date(list.createdAt).toLocaleString()}`, 10, y);
  y += 10;

  list.units.forEach(unit => {
    const text = `${unit.quantity} x ${unit.name} (${unit.points} pts) = ${unit.quantity * unit.points} pts`;
    doc.text(text, 10, y);
    y += 8;
  });

  y += 5;
  doc.setFont(undefined, "bold");
  doc.text(`Total: ${list.totalPoints} pts`, 10, y);

  doc.save(`${list.name.replace(/\s+/g, "_")}_army_list.pdf`);
}
