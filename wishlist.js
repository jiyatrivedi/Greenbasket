const wishlistItems =
document.getElementById("wishlistItems");

let wishlist =
JSON.parse(localStorage.getItem("wishlist"))
|| [];

function renderWishlist() {

  if (wishlist.length === 0) {
    wishlistItems.innerHTML =
      "<h3>Your wishlist is empty ❤️</h3>";
    return;
  }

  wishlistItems.innerHTML = "";

  wishlist.forEach((item, index) => {

    wishlistItems.innerHTML += `

      <div class="card">

        <img src="${item.image}" width="120">

        <h3>${item.name}</h3>

        <p>${item.price}</p>

        <button onclick="removeItem(${index})">
          Remove
        </button>

      </div>

    `;
  });
}

function removeItem(index) {

  wishlist.splice(index, 1);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  renderWishlist();
}

renderWishlist();