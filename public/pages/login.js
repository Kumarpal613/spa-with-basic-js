export function initLogin(loadPage) {
  console.log("login  Script run");

  const userIdInput = document.querySelector("#userId");
  const passwordInput = document.querySelector("#password");
  const toggleBtn = document.querySelector("#toggleBtn");
  // Tip: If you have a physical 'Log in' button in HTML, select it here too
  const loginBtn = document.querySelector("#loginBtn");
  const toSignupBtn = document.querySelector("#toSignup");

  // Handle the "Sign up here" click
  if (toSignupBtn) {
    toSignupBtn.addEventListener("click", () => {
      // This calls the loadPage function from app.js without refreshing
      loadPage("signup");
    });
  }

  // 1. Toggle Password Visibility
  toggleBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    this.textContent = isPassword ? "Hide" : "Show";
    passwordInput.focus();
  });

  // 2. Handle Login Logic
  const handleLogin = () => {
    let email = userIdInput.value.trim();
    let password = passwordInput.value;

    if (!email || !password) return alert("Please fill fields");

    // FIX: Changed 'user' to 'data.user'
    const user = findUser(email, password);
    if (!user) {
      return alert("Username or password is wrong");
    }

    localStorage.setItem("loggedInEmail", email);

    // Redirect to home page
    loadPage("home");
  };

  function findUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      return alert("user not exist");
    }
    return users.find(
      (user) => user.email === email && user.password === password,
    );
  }

  // 3. Navigation Shortcuts (Enter Key)
  userIdInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  });

  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogin();
    });
  }
}
