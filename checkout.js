let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Grand Total
let subtotal = 0;

cart.forEach(item => {
  const price = Number(String(item.price).replace("₹", ""));
  subtotal += price * item.quantity;
});

const grandTotal = cart.length > 0 ? subtotal + 20 - 15 : 0;

document.getElementById("grandTotal").innerText = `₹${grandTotal}`;


// Place order
function placeOrder() {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  const paymentMethod =
    document.querySelector('input[name="payment"]:checked').value;

  // Validation
  if (!name || !address || !city) {
    alert("Please fill all details");
    return;
  }

  if (name.length < 3) {
    alert("Enter valid name");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Invalid mobile number");
    return;
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    alert("Invalid pincode");
    return;
  }

  // Cart check
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart empty hai!");
    return;
  }

  // User check
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    alert("Please login first");
    return;
  }

  // All Orders
  let allOrders = JSON.parse(localStorage.getItem("allOrders")) || {};

  const newOrder = {
    id: Date.now(),
    items: cart,
    total: grandTotal,
    paymentMethod: paymentMethod,
    date: new Date().toLocaleString(),
    status: "Placed"
  };

  if (!allOrders[user]) {
    allOrders[user] = [];
  }

  allOrders[user].push(newOrder);

  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // Last order (for success page)
  localStorage.setItem("lastOrder", JSON.stringify(newOrder));

  // Clear cart
  localStorage.removeItem("cart");

  // Redirect
  window.location.href = "success.html";
}