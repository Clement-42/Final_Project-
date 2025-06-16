
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  burger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const div = document.getElementById("already-connected");

  if (user) {
    div.innerHTML = `
      <p>Already Connected as <strong>${user.username}</strong></p>
      <button onclick="logout()">Logout</button>
    `;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    alert("Logout");
    location.reload();
  }

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

    
function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  if (!username || !email || !password) {
    return alert("All fields are required");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?.,;:/]).{6,}$/;

  if (!passwordRegex.test(password)) {
    return alert(
      "Password must contain at least:\n- 1 lowercase\n- 1 uppercase\n- 1 digit\n- 1 special character (! ? . , ; : /)"
    );
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(u => u.username === username || u.email === email)) {
    return alert("Username or email already used");
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Successful registration !");

  document.getElementById("register-username").value = "";
  document.getElementById("register-email").value = "";
  document.getElementById("register-password").value = "";
}

function login() {
  const input = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(u =>
    (u.username === input || u.email === input) && u.password === password
  );

  if (!user) {
    return alert("Incorrect username/email or password");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("Successful connection !");
  window.location.href = "create.html";

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}
