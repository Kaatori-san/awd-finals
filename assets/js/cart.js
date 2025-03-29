document.addEventListener("DOMContentLoaded", function () {
  const toggleSummary = document.querySelector(".toggle-summary");
  const orderSummary = document.querySelector(".order-summary");

  toggleSummary.addEventListener("click", function () {
    orderSummary.classList.toggle("active");
  });

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cartContainer");
    let subtotalElement = document.getElementById("subtotal");
    let totalElement = document.getElementById("total");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML =
        "<p class='text-center'>Your cart is empty.</p>";
      subtotalElement.innerHTML = "<strong>Subtotal: ₱0.00</strong>";
      totalElement.innerHTML = "<strong>Total: ₱0.00</strong>";
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += item.price;
      cartContainer.innerHTML += `
                <div id="order-item" class="cart-item card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${item.image}" class="card-img" alt="${
        item.name
      }">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text"><strong>Price: ₱${item.price.toFixed(
                                  2
                                )}</strong></p>
                                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    subtotalElement.innerHTML = `<strong>Subtotal: ₱${subtotal.toFixed(
      2
    )}</strong>`;
    totalElement.innerHTML = `<strong>Total: ₱${subtotal.toFixed(2)}</strong>`;
  }

  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }

    alert("Successfully checked out!");
    localStorage.removeItem("cart");
    loadCart();
  }

  window.removeFromCart = removeFromCart;
  window.proceedToCheckout = proceedToCheckout;
  loadCart();

  AOS.init();
});

function toggleDropdown(id, show) {
  const element = document.getElementById(id);
  if (!element) return;

  if (show) {
    element.style.display = "block";
    element.style.opacity = 0;
    element.style.maxHeight = "0px"; // Start collapsed
    setTimeout(() => {
      element.style.opacity = 1;
      element.style.maxHeight = "500px"; // Expand smoothly
      element.style.transition =
        "opacity 0.3s ease, max-height 0.5s ease-in-out";
    }, 10);
  } else {
    element.style.opacity = 0;
    element.style.maxHeight = "0px"; // Collapse smoothly
    element.style.transition = "opacity 0.3s ease, max-height 0.3s ease-out";
    setTimeout(() => {
      element.style.display = "none";
    }, 300);
  }
}
// Order Summary
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggle-summary");
    const orderSummary = document.querySelector(".order-summary");
  
    orderSummary.style.overflow = "hidden";
    orderSummary.style.transition = "max-height 0.4s ease, opacity 0.4s ease";
    orderSummary.style.opacity = "0";
    orderSummary.style.maxHeight = "0px";
  
    toggleButton.addEventListener("click", function () {
      const isCollapsed = orderSummary.style.maxHeight === "0px";
  
      if (isCollapsed) {
        orderSummary.style.display = "block";
        requestAnimationFrame(() => {
          orderSummary.style.maxHeight = `${orderSummary.scrollHeight}px`;
          orderSummary.style.opacity = "1";
        });
      } else {
        orderSummary.style.maxHeight = "0px";
        orderSummary.style.opacity = "0";
        setTimeout(() => {
          if (orderSummary.style.maxHeight === "0px") {
            orderSummary.style.display = "none";
          }
        }, 400);
      }
      toggleButton.innerHTML = isCollapsed
        ? "Order Summary &#9652;"
        : "Order Summary &#9662;";
    });
  });
  