// Price range slider
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const minPriceInput = document.querySelectorAll('.price-input input')[0];
    const maxPriceInput = document.querySelectorAll('.price-input input')[1];
    
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
               if (!card.classList.contains('hidden-by-availability')) {
                   card.style.display = '';
               }
           } else {
               card.style.display = 'none';
           }
       });
   }