//LOGIN MODAL
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.querySelector('.login-modal');
const closeLogin = document.querySelector('.close-login');

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

if(closeLogin){
  closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
  });
}

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove('active');
  }
});

// Categories element
const productGrid = document.querySelector(".product-grid");

const title = document.getElementById("category-title");

// Breadcrumb
function setCategory(name){
  document.getElementById("current-cat").innerText = name;
}

// Search from URL
const params = new URLSearchParams(window.location.search);
const keyword = params.get("search");
const selectedCategory = params.get("category");

//Default Product
if (selectedCategory && products[selectedCategory]) {

  title.innerText = selectedCategory;
  document.getElementById("current-cat").innerText = selectedCategory;

  showProducts(selectedCategory);

} else {

  // default page load
  showProducts("Vegetables");

}

console.log("Keyword:", keyword);

const searchInputBox =
document.getElementById("searchInput");

if(searchInputBox){

  if(keyword){

  searchInputBox.value = keyword;

    searchProducts(keyword);

  }

  searchInputBox.addEventListener("input", function(){

    searchProducts(this.value);

  });

}


function searchProducts(text){

  if(!productGrid) return;  

  text = text.toLowerCase();

  productGrid.innerHTML = "";

  let found = false;

  Object.keys(products).forEach(category => {

  // Categories Search 

  if(category.toLowerCase().includes(text)){

    products[category].forEach(product => {

      found = true;

      productGrid.innerHTML += `
      <div class="card">
        <div class="wishlist-icon" data-id="${product.id}">
          <i class="fa-solid fa-heart"></i>
        </div>

        <img src="${product.image}">
        <h4>${product.name}</h4>
        <p>${product.price}</p>
        <p class="unit">${product.unit}</p>
        <button class="cart-btn"
        data-id="${product.id}">
        Add</button>
      </div>
      `;

    });

  }
    
    //Product Search

    products[category].forEach(product => {

      if(product.name.toLowerCase().includes(text)){

        found = true;

        productGrid.innerHTML += `

        <div class="card">

          <div class="wishlist-icon" data-id="${product.id}">
            <i class="fa-solid fa-heart"></i>
          </div>

          <img src="${product.image}">

          <h4>${product.name}</h4>

          <p>${product.price}</p>

          <p class="unit">${product.unit}</p>

          <button class="cart-btn"
          data-id="${product.id}">
          Add
          </button>
        </div>
        `;

      }

    });

  });

  if(!found){

    productGrid.innerHTML =
    "<h2>No Product Found 😔</h2>";

  }

}
// OPEN / CLOSE Sider

function openSidebar(){
  console.log("OPEN CLICKED");
  document.querySelector(".mobile-sidebar").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
}

function closeSidebar(){
  document.querySelector(".mobile-sidebar").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
}


// Show Products Function
function showProducts(category){

  productGrid.innerHTML = "";

  if (!products[category]) {
    productGrid.innerHTML = `<h2>No Products Found</h2>`;
    console.error("Category not found:", category);
    return;
  }

  products[category].forEach(product => {

    productGrid.innerHTML += `
      <div class="card">
        <div class="wishlist-icon" data-id="${product.id}">
          <i class="fa-solid fa-heart"></i>
        </div>

        <img src="${product.image}">
        <h4>${product.name}</h4>
        <p>${product.price}</p>
        <p class="unit">${product.unit ? product.unit : ""}</p>

        <button class="cart-btn" data-id="${product.id}">
          Add
        </button>
      </div>
    `;

  });

} 

// ADD To Cart + Quantity Button

document.addEventListener("click", function(e){

// ADD Button

if(e.target.classList.contains("cart-btn")){

  console.log("Product ID:", e.target.dataset.id);

  
  const productId = Number(
    e.target.dataset.id
  );

  let selectedProduct = null;

  //Product Find
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

  e.target.outerHTML = `
    <div class="quantity">
      <button class="minus">-</button>
      <span>1</span>
      <button class="plus">+</button>
    </div>
  `;
}

  // PLUS Button

  if(e.target.classList.contains("plus")){

    let count =
      e.target.parentElement.querySelector("span");

    count.innerText = Number(count.innerText) + 1;

  }

  // MINUS Button

  if(e.target.classList.contains("minus")){

    let count =
      e.target.parentElement.querySelector("span");

    let value = Number(count.innerText);

    if(value > 1){

      count.innerText = value - 1;

    }else{

      const productId =
    e.target.closest(".card")
    .querySelector(".wishlist-icon")
    .dataset.id;

    e.target.parentElement.outerHTML =
    `<button class="cart-btn" data-id="${productId}">
    Add
    </button>`;
    }

  }
});
 
// Pagination Click

const pages = document.querySelectorAll(".pagination button");

pages.forEach(btn => {

  btn.addEventListener("click", () => {

    pages.forEach(p => {
      p.classList.remove("active-page");
    });

    if(
      btn.innerText !== "" &&
      btn.innerText !== "" &&
      btn.innerText !== ""
    ){
      btn.classList.add("active-page");
    }

  });

});


// Cart Count Update 

function updateCartCount(){

  let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

  let count = cart.reduce(
    (total,item) => total + item.quantity,
    0
  );

  const cartCount =
    document.querySelector(".cart-count");

  if(cartCount){
    cartCount.innerText = count;
  }
}

// Page Load Count
updateCartCount();

//wishlist page

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

  if(exists){

    wishlist = wishlist.filter(
      item => item.id !== productId
    );

    wishlistBtn.innerHTML =
      '<i class="fa-solid fa-heart" style="color:#999"></i>';

  }else{

    wishlist.push(product);

    wishlistBtn.innerHTML =
      '<i class="fa-solid fa-heart" style="color:#ff5252"></i>';

  }

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

});

//change categories
function changeCategory(element) {

  const category = element.innerText.trim();

  document.getElementById("category-title").innerText = category;
  document.getElementById("current-cat").innerText = category;

  showProducts(category);

  closeSidebar();
}

