
// ===== Select Elements =====
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartTableBody = document.querySelector('.cart-table tbody');
const totalElement = document.querySelector('.total');

// ===== Cart Data =====
let cart = [];

// ===== Functions =====

// Render the cart table
function renderCart() {
  cartTableBody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <input type="number" class="qty-input" data-index="${index}" value="${item.quantity}" min="1">
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
    `;

    cartTableBody.appendChild(row);
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  attachRemoveEvents();
  attachQuantityEvents();
}

// Attach remove button events
function attachRemoveEvents() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      cart.splice(index, 1);
      renderCart();
    });
  });
}

// Attach quantity input events
function attachQuantityEvents() {
  const qtyInputs = document.querySelectorAll('.qty-input');
  qtyInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      const newQty = parseInt(e.currentTarget.value);
      if (newQty < 1) {
        e.currentTarget.value = cart[index].quantity; // revert if invalid
        return;
      }
      cart[index].quantity = newQty;
      renderCart();
    });
  });
}

// Add product to cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.currentTarget.closest('.product-card');
    const name = card.querySelector('h4').textContent;
    const priceText = card.querySelector('p').textContent;
    const price = parseFloat(priceText.replace('$',''));

    // Check if item is already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();
  });
});

// Handle order form submission
const orderForm = document.querySelector('.order-form');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  // Here you can send the order data to your server or display a confirmation
  console.log('Order Submitted:', { name, phone, address, cart });

  alert(`Thank you ${name}! Your order has been placed.`);

  // Clear cart and form
  cart = [];
  renderCart();
  orderForm.reset();
});
// Show/hide back-to-top button on scroll
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Smooth scroll to top
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
