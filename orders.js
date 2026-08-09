const ordersList = document.getElementById("ordersList");

// current user
const user = localStorage.getItem("loggedInUser");

// all user orders database
let allOrders = JSON.parse(localStorage.getItem("allOrders")) || {};

// only this user orders
let orders = allOrders[user] || [];


// NO Login
if (!user) {
  ordersList.innerHTML = `
    <h2>Please login first</h2>
  `;
}

// Empty Order
else if (orders.length === 0) {
  ordersList.innerHTML = `
    <div class="empty-orders">
      <i class="fa-solid fa-box-open"></i>
      <h2>No Orders Yet</h2>
      <p>You haven't placed any orders yet.</p>
      <a href="categories.html" class="shop-btn">Start Shopping</a>
    </div>
  `;
}

// Show Orders
else {

  ordersList.innerHTML = orders.map(order => {

    let total = 0;

    let itemsHTML = order.items.map(item => {

      const price = Number(String(item.price).replace("₹", ""));
      total += price * item.quantity;

      return `
    <p>
      <img src="${item.image}" width="40"
        style="vertical-align:middle; margin-right:8px; border-radius:6px;">
      ${item.name} × ${item.quantity}
      (₹${price * item.quantity})
      </p>
    `;
    }).join("");

    return `
      <div class="order-card">
        <h3>Order ID: ${order.id}</h3>
        <small>${order.date}</small>

        <div class="order-items">
          ${itemsHTML}
        </div>

        <h4>Total: ₹${total}</h4>
      </div>
    `;
  }).join("");
}