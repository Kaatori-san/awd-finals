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
            cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
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
                            <img src="${item.image}" class="card-img" alt="${item.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text"><strong>Price: ₱${item.price.toFixed(2)}</strong></p>
                                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        subtotalElement.innerHTML = `<strong>Subtotal: ₱${subtotal.toFixed(2)}</strong>`;
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
