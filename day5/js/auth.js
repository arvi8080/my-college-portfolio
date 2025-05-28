// Utility: Get stored users from localStorage
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Utility: Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register user
function registerUser(username, password) {
  const users = getUsers();

  // Check if user already exists
  if (users.find(user => user.username === username)) {
    alert("User already exists!");
    return false;
  }

  users.push({ username, password });
  saveUsers(users);
  alert("Registration successful! You can now login.");
  window.location.href = "login.html";
  return true;
}

// Login user
function loginUser(username, password) {
  const users = getUsers();

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Save session info
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    window.location.href = "shop.html"; // redirect to shop
  } else {
    alert("Invalid username or password!");
  }
}

// Handle register form submit
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    registerUser(username, password);
  });
}

// Handle login form submit
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    loginUser(username, password);
  });
}
