export function initHome(loadPage) {
  
  const email = localStorage.getItem("loggedInEmail");
  const logoutBtn = document.querySelector("#logoutBtn");

  
  if (!email) {
    loadPage("login")
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const currentUser = users.find((user) => user.email === email);

    if (currentUser) {
      document.getElementById("displayUser").innerText = currentUser.user;
    } else {
      // User not found in storage (corrupted state)
      loadPage("login")
    }
  }

  logoutBtn.addEventListener("click",logout);


  function logout() {
    localStorage.removeItem("loggedInEmail");
    loadPage("login");
  }
}
