// LOGIN MODAL
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.querySelector('.login-modal');
const closeLogin = document.querySelector('.close-login');

if (loginBtn && loginModal && closeLogin) {

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {

    loginBtn.innerHTML = '<i class="fa-solid fa-user"></i>';

    loginBtn.addEventListener('click', () => {
      window.location.href = "account.html";
    });

  } else {

    loginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
    });

  }

  closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
    }
  });

}

//Add to cart product
const cartItems = document.getElementById("cartItems");

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

function renderCart(){

  if(cart.length === 0){

    cartItems.innerHTML = `

      <div class="empty-cart">

        <img src="icons/cart.png" class="empty-cart-icon">

        <h2>Your Cart is Empty</h2>

        <p>Add some products to continue shopping.</p>

      </div>

    `;

    document.getElementById("subtotal").innerText = "₹0";
    document.getElementById("grandTotal").innerText = "₹0";
    document.getElementById("itemCount").innerText = "0";

    updateCartCount();
    return;
  }


cartItems.innerHTML = "";

let subtotal = 0;

const deliveryCharge = 20;
const discount = 15;

cart.forEach((item,index)=>{

const price =
Number(String(item.price).replace("₹",""));

const total =
price * item.quantity;

subtotal += total;

cartItems.innerHTML += `

<div class="cart-item">

<div class="product-info">
<img src="${item.image}">
<span>${item.name}</span>
</div>

<div>₹${price}</div>

<div class="qty-box">

<button onclick="changeQty(${index},-1)">
−
</button>

<span>${item.quantity}</span>

<button onclick="changeQty(${index},1)">
+
</button>

</div>

<div>Total: ₹${total}</div>

</div>

`;

});

document.getElementById("subtotal").innerText =
`₹${subtotal}`;

document.getElementById("deliveryFee").innerText =
`₹${deliveryCharge}`;

document.getElementById("discount").innerText =
`- ₹${discount}`;

document.getElementById("grandTotal").innerText =
`₹${subtotal + deliveryCharge - discount}`;

document.getElementById("itemCount").innerText =
cart.reduce((a,b)=>a+b.quantity,0);

updateCartCount();
}

function changeQty(index,value){

cart[index].quantity += value;

if(cart[index].quantity <= 0){
cart.splice(index,1);
showToast("✓ Item removed from cart");
}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();
}

function updateCartCount(){

const count =
cart.reduce((a,b)=>a+b.quantity,0);

const badge =
document.querySelector(".cart-count");

if(badge){
badge.innerText = count;
}
}

renderCart();

//product added popup
function showToast(message){

  const toast =
  document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);

}

// PLACE ORDER BUTTON
const placeOrderBtn = document.getElementById("placeOrderBtn");

if(placeOrderBtn){

  placeOrderBtn.addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
      alert("Cart is empty!");
      return;
    }

    // old orders get karo
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // new order create karo
    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
      total: document.getElementById("grandTotal").innerText
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    // cart clear
    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href = "orders.html";

  });

}