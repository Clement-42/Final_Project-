
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) 
  {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
    return;
  }

document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("hidden");
});

const categorySelect = document.getElementById("category");
const factionSelect = document.getElementById("faction");
const unitsContainer = document.getElementById("units");
const armyList = document.getElementById("army-list");
const totalPointsDisplay = document.getElementById("total-points");

const factions = {
  Chaos: ["World Eater", "Nurgle"],
  Xenos: ["Nécron", "Ork", "Eldar"],
  Imperium: ["Space Marine", "Adeptus Mechanicus", "Battle Sister", "Astra Militarum"]
};

const unitsData = {
  "World Eater": [{ name: "Berzerkers", points: 90, stats: "M: 6'  T: 4  SV: 3+  W: 2  CD: 6+  CO: 2" }],
  "Nurgle": [{ name: "Plague Marines", points: 80, stats: "M: 5'  T: 5  SV: 3+  W: 2  CD: 6+  CO: 2" }],
  "Nécron": [{ name: "Immortals", points: 70, stats: "M: 5'  T: 5  SV: 3+  W: 1  CD: 7+  CO: 2" }],
  "Ork": [{ name: "Boyz", points: 60, stats: "M: 6'  T: 5  SV: 5+  W: 1  CD: 7+  CO: 2" }],
  "Eldar": [{ name: "Howling Banshees", points: 85, stats: "M: 8'  T: 3  SV: 4+  W: 1  CD: 6+  CO: 1" }],
  "Space Marine": [{ name: "Intercessors", points: 100, stats: "M: 6'  T: 4  SV: 3+  W: 2  CD: 6+  CO: 2" }],
  "Adeptus Mechanicus": [{ name: "Skitarii Rangers", points: 90, stats: "M: 6'  T: 3  SV: 5+  W: 1  CD: 7+  CO: 2" }],
  "Battle Sister": [{ name: "Sister Superior", points: 95, stats: "M: 6'  T: 3  SV: 3+  W: 1  CD: 7+  CO: 2" }],
  "Astra Militarum": [{ name: "Infantry Squad", points: 50, stats: "M: 6'  T: 3  SV: 5+  W: 1  CD: 7+  CO: 2" }]
};

const army = [];

categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  factionSelect.innerHTML = '<option value="">-- Choose --</option>';
  factionSelect.disabled = !selected;

  if (selected) 
  {
    factions[selected].forEach(faction => {
      const option = document.createElement("option");
      option.value = faction;
      option.textContent = faction;
      factionSelect.appendChild(option);
    });
  }
  unitsContainer.innerHTML = "";
});

factionSelect.addEventListener("change", () => {
  const faction = factionSelect.value;
  unitsContainer.innerHTML = "";

  if (unitsData[faction]) {
    unitsData[faction].forEach(unit => {
      const card = document.createElement("div");
      card.className = "unit-card";
      card.innerHTML = `
        <h3>${unit.name}</h3>
        <p><strong>Points :</strong> ${unit.points}</p>
        <p><strong>Characteristics :</strong> ${unit.stats}</p>
        <input type="number" min="1" value="1" />
        <button>Add to list</button>
        `;

      const button = card.querySelector("button");
      const qtyInput = card.querySelector("input");

      button.addEventListener("click", () => {
        const quantity = parseInt(qtyInput.value) || 1;

        const existing = army.find(u => u.name === unit.name);
        if (existing) {
          existing.quantity += quantity;
        } else {
          army.push({ name: unit.name, points: unit.points, quantity });
        }
        renderArmyList();
      });

      unitsContainer.appendChild(card);
    });
  }
});

function renderArmyList() {
  armyList.innerHTML = "";
  let total = 0;

  army.forEach((unit, index) => {
    const cost = unit.points * unit.quantity;
    total += cost;

    const item = document.createElement("div");
    item.className = "unit-list-item";
    item.innerHTML = `
      <span>${unit.name} : </span>
      <input type="number" min="1" value="${unit.quantity}" data-index="${index}" />
      x ${unit.points} pts = <strong>${cost}</strong> pts
      <button data-remove="${index}">❌</button>
    `;

    item.querySelector("input").addEventListener("change", e => {
      const newQty = parseInt(e.target.value) || 1;
      army[index].quantity = newQty;
      renderArmyList();
    });

    item.querySelector("button").addEventListener("click", e => {
      army.splice(index, 1);
      renderArmyList();
    });

    armyList.appendChild(item);
  });

  totalPointsDisplay.textContent = total;
}

document.getElementById("save-list").addEventListener("click", () => {
  const listName = prompt("Name of your list ?");
  if (!listName) return;

  const saved = JSON.parse(localStorage.getItem("armyLists") || "[]");

  saved.push({
    name: listName,
    units: army,
    totalPoints: army.reduce((sum, u) => sum + u.points * u.quantity, 0),
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("armyLists", JSON.stringify(saved));
  alert("✅ List saved !");
});

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