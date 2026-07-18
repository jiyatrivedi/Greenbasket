document.addEventListener("DOMContentLoaded", () => {
  
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

// Gift Card Section Slider
const slider = document.getElementById("giftSlider");

if (slider) {
  let currentIndex = 0;

  const cards = slider.querySelectorAll(".gift-card");

setInterval(() => {

    currentIndex++;

    if(currentIndex > cards.length - 3){
        currentIndex = 0;
    }

    slider.scrollTo({
        left: cards[currentIndex].offsetLeft,
        behavior: "smooth"
    });

},3000);

}

//Search Place Holder
console.log("SCRIPT JS LOADED");
const input = document.getElementById("searchInput");
const box = document.getElementById("searchResults");

if (input && box && typeof products !== "undefined") {

  const allProducts = Object.values(products).flat();

  input.addEventListener("input", function () {

    console.log("Typed:", this.value);

    const val = this.value.toLowerCase().trim();

    box.innerHTML = "";

    if (val === "") {
      box.style.display = "none";
      return;
    }

    const filtered = allProducts.filter(product => {

      const name = (product.name || "").toLowerCase();
      const category = (product.category || "").toLowerCase();

      return (
        name.includes(val) ||
        category.includes(val)
      );
    });
    
    console.log("Filtered:", filtered);
    console.log("Count:", filtered.length);
  
    if (filtered.length === 0) {
      box.innerHTML = `<div class="result-item">No products found</div>`;
      box.style.display = "block";
      return;
    }

    filtered.forEach(product => {

       box.innerHTML += `
    <div class="result-item"
      onclick="window.location.href='categories.html?search=${encodeURIComponent(product.name)}'">

      <img src="${product.image}" alt="${product.name}">

      <div>
        <div class="name">${product.name}</div>
        <div class="sub">${product.category}</div>
      </div>

    </div>
    `;
    });

    box.style.display = "block";
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-box")) {
      box.style.display = "none";
    }
  });
}

});

// Home Page Add to cart

document.addEventListener("click", function(e){

  // ADD Button
  const btn = e.target.closest(".add-btn");

  if(btn){

    const productId = Number(btn.dataset.id);

    let selectedProduct = null;

    Object.keys(products).forEach(category => {

      const found = products[category].find(
        p => p.id === productId
      );

      if(found){
        selectedProduct = found;
      }

    });

    if(selectedProduct){

      let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];

      const existing =
        cart.find(item =>
          item.id === selectedProduct.id
        );

      if(existing){

        existing.quantity += 1;

      }else{

        cart.push({
          ...selectedProduct,
          quantity: 1
        });

      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      updateCartCount();
    }

    btn.outerHTML = `
      <div class="quantity" data-id="${productId}">
        <button class="minus">-</button>
        <span>1</span>
        <button class="plus">+</button>
      </div>
    `;
  }

  // PLUS Button
  if(e.target.classList.contains("plus")){

    const quantityBox =
      e.target.parentElement;

    const productId =
      Number(quantityBox.dataset.id);

    let count =
      quantityBox.querySelector("span");

    count.innerText =
      Number(count.innerText) + 1;

    let cart =
      JSON.parse(localStorage.getItem("cart"))
      || [];

    const item =
      cart.find(p => p.id === productId);

    if(item){
      item.quantity += 1;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();
  }

  // MINUS Button
  if(e.target.classList.contains("minus")){

    const quantityBox =
      e.target.parentElement;

    const productId =
      Number(quantityBox.dataset.id);

    let count =
      quantityBox.querySelector("span");

    let value =
      Number(count.innerText);

    let cart =
      JSON.parse(localStorage.getItem("cart"))
      || [];

    const item =
      cart.find(p => p.id === productId);

    if(value > 1){

      count.innerText = value - 1;

      if(item){
        item.quantity -= 1;
      }

    }else{

      cart = cart.filter(
        p => p.id !== productId
      );

      quantityBox.outerHTML = `
        <button class="add-btn"
          data-id="${productId}">
          Add <i class="fa-solid fa-plus"></i>
        </button>
      `;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();
  }

});

function updateCartCount(){

  let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

  let count = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartCount =
    document.querySelector(".cart-count");

  if(cartCount){
    cartCount.innerText = count;
  }
}

updateCartCount();

// Wishlist
document.addEventListener("click", (e) => {

  const wishlistBtn = e.target.closest(".wishlist-icon");

  if (!wishlistBtn) return;

  const productId = Number(wishlistBtn.dataset.id);

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const product = Object.values(products)
    .flat()
    .find(p => p.id === productId);

  if (!product) return;

  const exists = wishlist.find(item => item.id === productId);

  if (exists) {

    // Remove from wishlist
    wishlist = wishlist.filter(item => item.id !== productId);

    wishlistBtn.innerHTML =
      '<i class="fa-solid fa-heart" style="color:#999"></i>';

  } else {

    // Add to wishlist
    wishlist.push(product);

    wishlistBtn.innerHTML =
      '<i class="fa-solid fa-heart" style="color:#ff3b6b"></i>';

  }

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

});

// Login to account 

const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", () => {

    const mobile = document.getElementById("mobileNumber").value;

    if(mobile.length !== 10){
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    localStorage.setItem("loggedInUser", mobile);

    window.location.href = "account.html";

});

