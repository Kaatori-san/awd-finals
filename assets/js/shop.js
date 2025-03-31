// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // New function to sort by best selling
  function sortByBestSelling() {
    const productGrid = document.querySelector(".product-grid");
    const products = Array.from(document.querySelectorAll(".product-card"));

    // Prioritize products with 'Best Seller' badge
    products.sort((a, b) => {
      const aIsBestSeller = a.querySelector(".best-selling") !== null;
      const bIsBestSeller = b.querySelector(".best-selling") !== null;

      if (aIsBestSeller && !bIsBestSeller) return -1;
      if (!aIsBestSeller && bIsBestSeller) return 1;
      return 0;
    });

    // Remove all products
    products.forEach((product) => product.remove());

    // Add sorted products back
    products.forEach((product) => {
      productGrid.appendChild(product);
    });
  }

  // Call sort by best selling when page loads
  sortByBestSelling();

  // Filter groups toggle
  const filterGroups = document.querySelectorAll(".filter-group h3");
  filterGroups.forEach((group) => {
    group.addEventListener("click", function () {
      const filterOptions = this.nextElementSibling;
      const icon = this.querySelector("i");

      if (filterOptions.style.display === "none") {
        filterOptions.style.display = "block";
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      } else {
        filterOptions.style.display = "none";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    });
  });

  // Price range slider
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const minPriceInput = document.querySelectorAll(".price-input input")[0];
  const maxPriceInput = document.querySelectorAll(".price-input input")[1];

  // Initialize price range values
  minPriceInput.value = 0;
  maxPriceInput.value = 200000;

  // Set initial positions of slider thumbs
  rangeMin.value = 0;
  rangeMax.value = 200000;

  // Function to update slider track
  function updateSliderTrack() {
    const percent1 = (rangeMin.value / rangeMin.max) * 100;
    const percent2 = (rangeMax.value / rangeMax.max) * 100;
    document.querySelector(
      ".slider-track"
    ).style.background = `linear-gradient(to right, #ddd ${percent1}%, #000 ${percent1}%, #000 ${percent2}%, #ddd ${percent2}%)`;
  }

  // Update track initially
  updateSliderTrack();

  // Range slider events
  rangeMin.addEventListener("input", function () {
    const minValue = parseInt(rangeMin.value);
    const maxValue = parseInt(rangeMax.value);

    if (minValue > maxValue - 1000) {
      rangeMin.value = maxValue - 1000;
    }

    minPriceInput.value = Math.round((minValue / 200000) * 200000);
    updateSliderTrack();
    filterProductsByPrice();
  });

  rangeMax.addEventListener("input", function () {
    const minValue = parseInt(rangeMin.value);
    const maxValue = parseInt(rangeMax.value);

    if (maxValue < minValue + 1000) {
      rangeMax.value = minValue + 1000;
    }

    maxPriceInput.value = Math.round((maxValue / 200000) * 200000);
    updateSliderTrack();
    filterProductsByPrice();
  });

  // Price input events
  minPriceInput.addEventListener("input", function () {
    const minValue = parseInt(minPriceInput.value) || 0;
    const maxValue = parseInt(maxPriceInput.value) || 200000;

    if (minValue > maxValue - 1000) {
      minPriceInput.value = maxValue - 1000;
    }

    // Convert price to slider range
    rangeMin.value = Math.round((minValue / 200000) * 200000);
    updateSliderTrack();
    filterProductsByPrice();
  });

  maxPriceInput.addEventListener("input", function () {
    const minValue = parseInt(minPriceInput.value) || 0;
    const maxValue = parseInt(maxPriceInput.value) || 200000;

    if (maxValue < minValue + 1000) {
      maxPriceInput.value = minValue + 1000;
    }

    // Convert price to slider range
    rangeMax.value = Math.round((maxValue / 200000) * 200000);
    updateSliderTrack();
    filterProductsByPrice();
  });

  // Function to filter products by price
  function filterProductsByPrice() {
    const minPrice = parseInt(minPriceInput.value);
    const maxPrice = parseInt(maxPriceInput.value);

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      const priceText = card.querySelector(".price").textContent;
      // Remove peso sign and commas, then parse to integer
      const price = parseInt(priceText.replace("₱", "").replace(/,/g, ""));

      if (price >= minPrice && price <= maxPrice) {
        if (!card.classList.contains("hidden-by-availability")) {
          card.style.display = "";
        }
      } else {
        card.style.display = "none";
      }
    });
  }
  // View buttons
  const listViewBtn = document.querySelector(".list-view");
  const gridViewBtn = document.querySelector(".grid-view");
  const productGrid = document.querySelector(".product-grid");

  listViewBtn.addEventListener("click", function () {
    productGrid.style.gridTemplateColumns = "1fr";
    this.classList.add("active");
    gridViewBtn.classList.remove("active");

    // Adjust product cards for list view
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      card.style.display = "flex";
      if (
        card.classList.contains("hidden-by-availability") ||
        card.classList.contains("hidden-by-price")
      ) {
        card.style.display = "none";
      }
      card.querySelector(".product-image").style.width = "200px";
      card.querySelector(".product-image").style.height = "150px";
      card.querySelector(".product-details").style.flex = "1";
    });
  });

  gridViewBtn.addEventListener("click", function () {
    productGrid.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(260px, 1fr))";
    this.classList.add("active");
    listViewBtn.classList.remove("active");

    // Reset product cards to grid view
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      card.style.display = "block";
      if (
        card.classList.contains("hidden-by-availability") ||
        card.classList.contains("hidden-by-price")
      ) {
        card.style.display = "none";
      }
      card.querySelector(".product-image").style.width = "100%";
      card.querySelector(".product-image").style.height = "200px";
      card.querySelector(".product-details").style.flex = "none";
    });
  });

  // Availability filtering
  const availabilityCheckboxes = document.querySelectorAll(
    ".availability-filter"
  );
  availabilityCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      filterProductsByAvailability();
    });
  });

  // Function to filter products by availability
  function filterProductsByAvailability() {
    const inStockChecked = document.querySelector(
      '.availability-filter[value="in-stock"]'
    ).checked;
    const outOfStockChecked = document.querySelector(
      '.availability-filter[value="out-of-stock"]'
    ).checked;

    const productCards = document.querySelectorAll(".product-card");

    // If both or none are checked, show all products
    if (
      (inStockChecked && outOfStockChecked) ||
      (!inStockChecked && !outOfStockChecked)
    ) {
      productCards.forEach((card) => {
        card.classList.remove("hidden-by-availability");
        if (!card.classList.contains("hidden-by-price")) {
          card.style.display = "";
        }
      });
      return;
    }

    // Filter based on selected availability
    productCards.forEach((card) => {
      const availability = card.getAttribute("data-availability");

      if (
        (inStockChecked && availability === "in-stock") ||
        (outOfStockChecked && availability === "out-of-stock")
      ) {
        card.classList.remove("hidden-by-availability");
        if (!card.classList.contains("hidden-by-price")) {
          card.style.display = "";
        }
      } else {
        card.classList.add("hidden-by-availability");
        card.style.display = "none";
      }
    });
  }

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  let cartCount = 0; // Starting with 1 item already in cart

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      cartCount++;
      document.querySelector(".cart-count").textContent = cartCount;

      // Show add to cart animation
      const productCard = this.closest(".product-card");
      productCard.style.transform = "translateY(-10px)";
      setTimeout(() => {
        productCard.style.transform = "translateY(-5px)";
      }, 300);

      // Change button text temporarily
      const originalText = this.textContent;
      this.textContent = "Added!";
      this.style.backgroundColor = "#333"; // Changed to dark gray

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "#000"; // Changed to black
      }, 1000);
    });
  });

  // Sort by select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const selectedOption = this.value;
      const productGrid = document.querySelector(".product-grid");
      const products = Array.from(document.querySelectorAll(".product-card"));

      // Sort products based on selection
      switch (selectedOption) {
        case "price-low":
          products.sort((a, b) => {
            const priceA = parseInt(
              a.querySelector(".price").textContent.replace(/[^\d]/g, "")
            );
            const priceB = parseInt(
              b.querySelector(".price").textContent.replace(/[^\d]/g, "")
            );
            return priceA - priceB;
          });
          break;
        case "price-high":
          products.sort((a, b) => {
            const priceA = parseInt(
              a.querySelector(".price").textContent.replace(/[^\d]/g, "")
            );
            const priceB = parseInt(
              b.querySelector(".price").textContent.replace(/[^\d]/g, "")
            );
            return priceB - priceA;
          });
          break;
        case "newest":
          // Prioritize products with 'Newest Arrival' badge
          products.sort((a, b) => {
            const aIsNew = a.querySelector(".newest-arrival") !== null;
            const bIsNew = b.querySelector(".newest-arrival") !== null;

            if (aIsNew && !bIsNew) return -1;
            if (!aIsNew && bIsNew) return 1;
            return 0;
          });
          break;
        case "best-selling":
          // Prioritize products with 'Best Seller' badge
          products.sort((a, b) => {
            const aIsBestSeller = a.querySelector(".best-selling") !== null;
            const bIsBestSeller = b.querySelector(".best-selling") !== null;

            if (aIsBestSeller && !bIsBestSeller) return -1;
            if (!aIsBestSeller && bIsBestSeller) return 1;
            return 0;
          });
          break;
        default:
          // Return to original order
          products.sort((a, b) => {
            return (
              Array.from(productGrid.children).indexOf(a) -
              Array.from(productGrid.children).indexOf(b)
            );
          });
          break;
      }

      // Remove all products
      products.forEach((product) => product.remove());

      // Add sorted products back
      products.forEach((product) => {
        productGrid.appendChild(product);
      });
    });
  }

  // Search functionality
  const searchInput = document.querySelector(".search-container input");
  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        searchProducts();
      }
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector(".newsletter");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector("input");
      const email = emailInput.value;

      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Success case
        emailInput.value = "";
        alert("Thank you for subscribing to our newsletter!");
      } else {
        // Error case
        alert("Please enter a valid email address.");
      }
    });
  }
});

// Function to search products
function searchProducts() {
  const searchInput = document.querySelector(".search-container input");
  const searchTerm = searchInput.value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      // Only show if not hidden by other filters
      if (
        !card.classList.contains("hidden-by-availability") &&
        !card.classList.contains("hidden-by-price")
      ) {
        card.style.display = "";
      }
      card.classList.remove("hidden-by-search");
    } else {
      card.classList.add("hidden-by-search");
      card.style.display = "none";
    }
  });
}
