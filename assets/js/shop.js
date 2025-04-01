document.addEventListener("DOMContentLoaded", function () {
  let originalProducts = [];

  function initializeProducts() {
    const productGrid = document.querySelector(".product-grid");
    if (!productGrid) return;
    
    originalProducts = Array.from(document.querySelectorAll(".product-card"));
  }

  function sortByBestSelling() {
    const productGrid = document.querySelector(".product-grid");
    if (!productGrid) return;
    
    const products = Array.from(document.querySelectorAll(".product-card"));
    if (products.length === 0) return;

    const bestSellerProducts = products.filter(product => 
      product.querySelector(".best-selling") !== null
    );
    
    products.forEach((product) => product.remove());

    bestSellerProducts.forEach((product) => {
      productGrid.appendChild(product);
    });
  }

  initializeProducts();

  sortByBestSelling();

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = "best-selling";
    
    sortSelect.addEventListener("change", function () {
      const selectedOption = this.value;
      const productGrid = document.querySelector(".product-grid");
      
      Array.from(productGrid.children).forEach(child => child.remove());
      
      let productsToProcess = [...originalProducts];
      
      productsToProcess = productsToProcess.filter(product => {
        return !product.classList.contains("hidden-by-availability") &&
               !product.classList.contains("hidden-by-price") &&
               !product.classList.contains("hidden-by-search");
      });
      
      let displayProducts = [];

      switch (selectedOption) {
        case "all":
          displayProducts = [...productsToProcess];
          break;

        case "price-low":
          displayProducts = [...productsToProcess].sort((a, b) => {
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
          displayProducts = [...productsToProcess].sort((a, b) => {
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
          displayProducts = productsToProcess.filter(product => 
            product.querySelector(".newest-arrival") !== null
          );
          break;
        case "best-selling":
          displayProducts = productsToProcess.filter(product => 
            product.querySelector(".best-selling") !== null
          );
          break;
        default:
          displayProducts = [...productsToProcess];
          break;
      }

      displayProducts.forEach(product => {
        productGrid.appendChild(product);
      });
    });
  }

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
  const rangeMin = document.querySelector('.range-min');
  const rangeMax = document.querySelector('.range-max');
  const minPriceInput = document.querySelectorAll('.price-input input')[0];
  const maxPriceInput = document.querySelectorAll('.price-input input')[1];

  if (rangeMin && rangeMax && minPriceInput && maxPriceInput) {
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
       document.querySelector('.slider-track').style.background = 
           `linear-gradient(to right, #ddd ${percent1}%, #000 ${percent1}%, #000 ${percent2}%, #ddd ${percent2}%)`;
    }

    // Update track initially
    updateSliderTrack();

    // Range slider events
    rangeMin.addEventListener('input', function() {
       const minValue = parseInt(rangeMin.value);
       const maxValue = parseInt(rangeMax.value);
       
       if (minValue > maxValue - 1000) {
           rangeMin.value = maxValue - 1000;
       }
       
       minPriceInput.value = Math.round((minValue / 200000) * 200000);
       updateSliderTrack();
       filterProductsByPrice();
    });

    rangeMax.addEventListener('input', function() {
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
    minPriceInput.addEventListener('input', function() {
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

    maxPriceInput.addEventListener('input', function() {
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
  }

  // Function to filter products by price
  function filterProductsByPrice() {
     const minPrice = parseInt(minPriceInput.value);
     const maxPrice = parseInt(maxPriceInput.value);
     
     const productCards = document.querySelectorAll('.product-card');
     productCards.forEach(card => {
         const priceText = card.querySelector('.price').textContent;
         // Remove peso sign and commas, then parse to integer
         const price = parseInt(priceText.replace('₱', '').replace(/,/g, ''));
         
         if (price >= minPrice && price <= maxPrice) {
             if (!card.classList.contains('hidden-by-availability') && 
                 !card.classList.contains('hidden-by-search')) {
                 card.style.display = '';
             }
             card.classList.remove('hidden-by-price');
         } else {
             card.classList.add('hidden-by-price');
             card.style.display = 'none';
         }
     });
  }

  // View buttons
  const listViewBtn = document.querySelector(".list-view");
  const gridViewBtn = document.querySelector(".grid-view");
  const productGrid = document.querySelector(".product-grid");

  if (listViewBtn && gridViewBtn && productGrid) {
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
          card.classList.contains("hidden-by-price") ||
          card.classList.contains("hidden-by-search")
        ) {
          card.style.display = "none";
        }
        const productImage = card.querySelector(".product-image");
        const productDetails = card.querySelector(".product-details");
        if (productImage) productImage.style.width = "200px";
        if (productImage) productImage.style.height = "150px";
        if (productDetails) productDetails.style.flex = "1";
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
          card.classList.contains("hidden-by-price") ||
          card.classList.contains("hidden-by-search")
        ) {
          card.style.display = "none";
        }
        const productImage = card.querySelector(".product-image");
        const productDetails = card.querySelector(".product-details");
        if (productImage) productImage.style.width = "100%";
        if (productImage) productImage.style.height = "200px";
        if (productDetails) productDetails.style.flex = "none";
      });
    });
  }

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
        if (!card.classList.contains("hidden-by-price") && 
            !card.classList.contains("hidden-by-search")) {
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
        if (!card.classList.contains("hidden-by-price") && 
            !card.classList.contains("hidden-by-search")) {
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
  let cartCount = 0; 
  
  // Check if there are items in the cart already
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount = storedCart.length;
  
  // Update cart count display
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = cartCount;
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      productCard.style.transform = "translateY(-10px)";
      setTimeout(() => {
        productCard.style.transform = "translateY(-5px)";
      }, 300);
    });
  });

  // Newsletter subscription
  const newsletterForm = document.querySelector(".newsletter");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector("input");
      const email = emailInput.value;

      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.value = "";
        alert("Thank you for subscribing to our newsletter!");
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});

// search function
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".search-btn");

if (searchInput) {
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchProducts();
    }
  });
}

if (searchButton) {
  searchButton.addEventListener("click", searchProducts);
}

function searchProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card
      .querySelector("h3")
      .textContent.trim()
      .toLowerCase();

    if (productName.includes(searchTerm)) {
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