// User 
let user = localStorage.getItem("loggedInUser");

// Mobile
document.getElementById("userMobile").textContent =
  user ? "+91 " + user : "Not Logged In";

// Address System
let allAddresses = JSON.parse(localStorage.getItem("addresses")) || {};

// Load Address
function loadAddress() {
  const address = allAddresses[user];
  document.getElementById("userAddress").innerText =
    address ? address : "Not added";
}

loadAddress();

// Toggle Form
function toggleAddressForm() {
  const box = document.getElementById("addressBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// Save Address
function saveAddress() {
  const input = document.getElementById("addressInput").value.trim();

  if (!input) {
    alert("Please enter address");
    return;
  }

  allAddresses[user] = input;

  localStorage.setItem("addresses", JSON.stringify(allAddresses));

  loadAddress();

  document.getElementById("addressBox").style.display = "none";

  alert("Address saved successfully!");
}

// Logout 
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

//Edit Profile Function
function editProfile() {
  const oldUser = user;
  const newMobile = prompt("Enter new mobile number:");

  if (!newMobile) return;

  // move old address to new key
  if (allAddresses[oldUser]) {
    allAddresses[newMobile] = allAddresses[oldUser];
    delete allAddresses[oldUser];
  }

  localStorage.setItem("loggedInUser", newMobile);
  localStorage.setItem("addresses", JSON.stringify(allAddresses));

  user = newMobile;

  document.getElementById("userMobile").textContent =
    "+91 " + newMobile;

  loadAddress();

  alert("Profile updated successfully!");
}
