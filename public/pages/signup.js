export function initSignup(loadPage) {
  const nameInput = document.querySelector("#fullName");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirmPassword");
  const toggleBtn = document.querySelector("#togglePassword");
  const signupBtn = document.querySelector("#submitBtn"); // Added this to trigger the function
  const toLoginBtn = document.querySelector("#toLogin");

  toLoginBtn.addEventListener("click", () => {
    loadPage('login'); 
  });

  const users = [];
  // Toggle Password Visibility
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      this.textContent = isPassword ? "Hide" : "Show"; // Fixed typo: isPassord -> isPassword
      passwordInput.focus();
    });
  }

  // Handle Signup Logic
  const handleSignup = () => {
    // Note: Using nameInput here as defined above
    const data = {
      user: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    // Simple Validation
    if (
      !data.user ||
      !data.password ||
      !data.email ||
      !confirmPasswordInput.value.trim()
    ) {
      return alert("Please fill all fields");
    }

    if (data.password !== confirmPasswordInput.value.trim()) {
      confirmPasswordInput.value = "";
      confirmPasswordInput.focus();
      return alert("Mismatch Password");
    }

    console.log("Creating account for:", data.user);
    users.push(data);
    // Save to localStorage so home.html can read it
    localStorage.setItem("email", data.email);
    localStorage.setItem("users", JSON.stringify(users));
    // Redirect to home page
    loadPage("home");
  };

  // Attach the function to your button click
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSignup();
    });
  }
}
