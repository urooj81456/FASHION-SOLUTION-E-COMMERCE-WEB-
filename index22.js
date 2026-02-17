// ================= GLOBAL =================
const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

let allProducts = [];
let cart = {};

cartCount.textContent = 0;

// ================= FETCH PRODUCTS =================
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    allProducts = data.filter(p =>
      ["men's clothing", "women's clothing", "jewelery", "electronics"]
      .includes(p.category)
    );

    renderProducts(allProducts);

  } catch (err) {
    console.error(err);
  }
}

// ================= RENDER PRODUCTS =================
function renderProducts(products) {
  productsGrid.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");
    card.className = "col-lg-3 col-md-4 col-sm-6";

    card.innerHTML = `
      <div class="product-card">
        <div class="card-img">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-category">${product.category}</div>
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
        <div class="product-buttons">
          <button class="btn btn-primary add-cart">Add to Cart</button>
          <button class="btn btn-secondary view-detail" data-id="${product.id}">
            Details
          </button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);

    // ADD TO CART
    card.querySelector(".add-cart")
        .addEventListener("click", () => addToCart(product));
  });
}

// ================= CATEGORY FILTER =================
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".category-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "all") {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === category);
      renderProducts(filtered);
    }
  });
});

// ================= ADD TO CART =================
function addToCart(product) {

  if (cart[product.id]) {
    cart[product.id].quantity++;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }

  updateCartUI();
}

// ================= UPDATE CART =================
function updateCartUI() {

  cartItems.innerHTML = "";
  let totalQty = 0;

  Object.values(cart).forEach(item => {

    totalQty += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item mb-3 p-2";

    div.innerHTML = `
      <strong>${item.title}</strong>
      <div>$${item.price} x ${item.quantity}</div>
      <button class="increase">+</button>
      <button class="decrease">-</button>
    `;

    cartItems.appendChild(div);

    div.querySelector(".increase").onclick = () => {
      cart[item.id].quantity++;
      updateCartUI();
    };

    div.querySelector(".decrease").onclick = () => {
      if (cart[item.id].quantity > 1) {
        cart[item.id].quantity--;
      } else {
        delete cart[item.id];
      }
      updateCartUI();
    };
  });

  cartCount.textContent = totalQty;
}

// ================= PRODUCT DETAIL MODAL =================
document.addEventListener("click", function (e) {

  if (e.target.classList.contains("view-detail")) {

    const id = e.target.dataset.id;
    const product = allProducts.find(p => p.id == id);

    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalCategory").innerText = product.category;
    document.getElementById("modalPrice").innerText = "$" + product.price;
    document.getElementById("modalDescription").innerText = product.description;
    document.getElementById("modalRating").innerText =
      product.rating.rate + " ⭐ (" + product.rating.count + " reviews)";

    new bootstrap.Modal(
      document.getElementById("productDetailModal")
    ).show();
  }
});

// ================= INIT =================
fetchProducts();
