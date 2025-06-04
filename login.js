
    
    document.getElementById("burger").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("hidden");
      document.querySelector(".main-content").classList.toggle("shifted");
    });

    function register() {
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;

      if (!username || !password) return alert("Fields required");

      let users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find(u => u.username === username)) {
        return alert("Login already used");
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Successful registration !");
    }

    function login() {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        return alert("Incorrect login");
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Successful connection !");
      window.location.href = "create.html";
    }

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