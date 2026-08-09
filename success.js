const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderId = "#" + Math.floor(10000 + Math.random() * 90000);

document.getElementById("orderId").innerText = orderId;

let orders = JSON.parse(localStorage.getItem("orders")) || [];

const newOrder = {
  id: orderId,
  items: cart,
  date: new Date().toLocaleString(),
  status: "Placed"
};

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));

// clear cart
localStorage.removeItem("cart");

// optional redirect
setTimeout(() => {
  window.location.href = "orders.html";
}, 2000);