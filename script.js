const WHATSAPP = "526632959379";

const productsData = [
  {
    id: 1,
    category: "Cortes",
    name: "Rib Eye Prime",
    short: "400 g · mantequilla de ajo negro",
    price: 685,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90",
    description: "Un corte con marmoleo excepcional, sellado sobre carbón de encino y terminado con mantequilla de ajo negro.",
    ingredients: "Rib eye prime de 400 g, mantequilla de ajo negro, romero, sal de mar y papas rostizadas."
  },
  {
    id: 2,
    category: "Cortes",
    name: "New York USDA",
    short: "350 g · salsa de vino tinto",
    price: 565,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=90",
    description: "Clásico, elegante y lleno de sabor. Una pieza de gran textura cocinada al punto que prefieras.",
    ingredients: "New York USDA de 350 g, reducción de vino tinto, tomillo, sal de mar y vegetales a la brasa."
  },
  {
    id: 3,
    category: "Cortes",
    name: "Tomahawk para compartir",
    short: "1.1 kg · dos guarniciones",
    price: 1480,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=90",
    description: "El gran protagonista de la mesa: un tomahawk espectacular, reposado y cortado para compartir.",
    ingredients: "Tomahawk de 1.1 kg, mantequilla de hierbas, espárragos, papas baby y sal ahumada."
  },
  {
    id: 4,
    category: "Entradas",
    name: "Tuétano al carbón",
    short: "Tortillas de maíz · chimichurri",
    price: 225,
    image: "https://images.unsplash.com/photo-1600891963935-c1c31b5a2eb9?auto=format&fit=crop&w=1000&q=90",
    description: "Tuétano rostizado lentamente sobre las brasas, servido para armar tacos inolvidables.",
    ingredients: "Tuétano de res, tortillas de maíz, chimichurri, cebolla asada y limón."
  },
  {
    id: 5,
    category: "Especialidades",
    name: "Enchiladas suizas verdes",
    short: "Pollo · salsa verde cremosa · queso gratinado",
    price: 245,
    image: "https://images.unsplash.com/photo-1584208632869-8f937b818d0d?auto=format&fit=crop&w=1000&q=90",
    description: "Tres tortillas rellenas de pollo, bañadas en salsa verde cremosa de tomatillo y gratinadas al momento.",
    ingredients: "Tortillas de maíz, pollo deshebrado, tomatillo, chile serrano, crema, queso manchego y cebolla morada."
  },
  {
    id: 6,
    category: "Guarniciones",
    name: "Papas trufadas",
    short: "Parmigiano · aceite de trufa",
    price: 145,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=90",
    description: "Papas crujientes por fuera y suaves al centro, terminadas con queso y aceite de trufa.",
    ingredients: "Papas russet, aceite de trufa, parmigiano reggiano, perejil y sal de mar."
  },
  {
    id: 7,
    category: "Bebidas",
    name: "Old Fashioned ahumado",
    short: "Bourbon · naranja · bitters",
    price: 220,
    image: "https://images.unsplash.com/photo-1473973916745-60839aebf06e?auto=format&fit=crop&w=1000&q=90",
    description: "Un clásico de barra con carácter, perfumado con humo de encino para acompañar los cortes.",
    ingredients: "Bourbon, azúcar demerara, bitters aromáticos, naranja y humo de encino."
  }
];

let category = "Todo";
let currentProduct = null;
let cart = [];

const money = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(amount);
};

function renderMenu() {
  const categories = ["Todo", ...new Set(productsData.map(item => item.category))];

  document.getElementById("categories").innerHTML = categories
    .map(item => `
      <button
        class="category ${item === category ? "active" : ""}"
        onclick="changeCategory('${item}')"
      >
        ${item}
      </button>
    `)
    .join("");

  const visibleProducts = category === "Todo"
    ? productsData
    : productsData.filter(item => item.category === category);

  document.getElementById("products").innerHTML = visibleProducts
    .map(item => `
      <button class="product" onclick="openProduct(${item.id})">
        <img src="${item.image}" alt="${item.name}">
        <div class="product-copy">
          <div>
            <h3>${item.name}</h3>
            <p>${item.short}</p>
          </div>
          <span class="price">${money(item.price)}</span>
        </div>
      </button>
    `)
    .join("");
}

function changeCategory(newCategory) {
  category = newCategory;
  renderMenu();
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active");
  });

  document.getElementById(viewId).classList.add("active");

  if (viewId === "cart") {
    renderCart();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProduct(productId) {
  currentProduct = productsData.find(item => item.id === productId);

  document.getElementById("detailImg").style.backgroundImage =
    `url("${currentProduct.image}")`;

  document.getElementById("detailCategory").textContent = currentProduct.category;
  document.getElementById("detailName").textContent = currentProduct.name;
  document.getElementById("detailDescription").textContent = currentProduct.description;
  document.getElementById("detailIngredients").textContent = currentProduct.ingredients;
  document.getElementById("detailPrice").textContent = money(currentProduct.price);
  document.getElementById("addPrice").textContent = money(currentProduct.price);

  showView("detail");
}

function addCurrentProduct() {
  const existing = cart.find(item => item.id === currentProduct.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...currentProduct,
      quantity: 1
    });
  }

  updateCartCounter();
  showView("cart");
}

function updateCartCounter() {
  const totalProducts = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  document.getElementById("counter").textContent = totalProducts;
}

function changeQuantity(productId, amount) {
  const product = cart.find(item => item.id === productId);

  product.quantity += amount;

  if (product.quantity < 1) {
    cart = cart.filter(item => item.id !== productId);
  }

  updateCartCounter();
  renderCart();
}

function removeProduct(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCounter();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartContent");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        Tu orden está vacía.<br><br>
        <button class="category" onclick="showView('menu')">
          Ver la carta
        </button>
      </div>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  container.innerHTML = `
    <div class="cart-list">
      ${cart.map(item => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}">

          <div>
            <h3>${item.name}</h3>
            <p>
              ${money(item.price)}
              ·
              <button class="remove" onclick="removeProduct(${item.id})">
                Eliminar
              </button>
            </p>
          </div>

          <div class="quantity">
            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </article>
      `).join("")}
    </div>

    <div class="summary">
      <span>Total</span>
      <span>${money(total)}</span>
    </div>

    <button class="primary full" onclick="showView('checkout')">
      Continuar
    </button>
  `;
}

function placeOrder(event) {
  event.preventDefault();

  const customerName = document.getElementById("customerName").value.trim();
  const tableNumber = document.getElementById("tableNumber").value.trim();
  const orderNumber = `IV-${Math.floor(1000 + Math.random() * 9000)}`;

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const orderItems = cart
    .map(item => {
      return `• ${item.quantity} x ${item.name} — ${money(item.price * item.quantity)}`;
    })
    .join("\n");

  const message = `*Nueva orden ${orderNumber}*

*Cliente:* ${customerName}
*Mesa:* ${tableNumber}

*Pedido:*
${orderItems}

*Total:* ${money(total)}`;

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  document.getElementById("confirmedOrder").textContent =
    `Orden ${orderNumber} · Mesa ${tableNumber}`;

  cart = [];
  updateCartCounter();
  showView("confirmation");
}

renderMenu();
