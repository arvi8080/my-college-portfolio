// Utility: Get stored users
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Utility: Save users
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Password strength check
function isPasswordStrong(password) {
  // At least 6 characters, 1 number, 1 lowercase, 1 uppercase
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return regex.test(password);
}

// Register user
function registerUser(username, password, confirmPassword) {
  const users = getUsers();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  if (!isPasswordStrong(password)) {
    alert("Password must be at least 6 characters and include uppercase, lowercase, and a number.");
    return false;
  }

  if (users.find(user => user.username === username)) {
    alert("User already exists!");
    return false;
  }

  users.push({ username, password });
  saveUsers(users);
  alert("Registration successful!");
  window.location.href = "login.html";
  return true;
}

// Login user
function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    window.location.href = "shop.html";
  } else {
    alert("Invalid credentials!");
  }
}

// Logout user
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out!");
  window.location.href = "index.html";
}

// Check login for protected pages
function requireLogin() {
  if (!localStorage.getItem("loggedInUser")) {
    alert("Please login first!");
    window.location.href = "login.html";
  }
}

// Handle registration form
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;
    registerUser(username, password, confirmPassword);
  });
}

// Handle login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    loginUser(username, password);
  });
}

// Handle logout button (if present)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}
// Cart toggle for mobile
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartPanel = document.getElementById('cartPanel');

if (cartToggleBtn && cartPanel) {
  cartToggleBtn.addEventListener('click', () => {
    cartPanel.classList.toggle('cart-hidden');
    cartPanel.classList.toggle('cart-visible');
  });
}

