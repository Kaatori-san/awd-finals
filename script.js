// navbar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//show more
document.addEventListener("DOMContentLoaded", function(){
  const showMoreBtn = document.getElementById("show-more-btn");
  const extraCards = document.querySelectorAll(".extra-card");

  showMoreBtn.addEventListener("click", function(){
    const isHidden = extraCards[0].classList.contains("d-none");

    extraCards.forEach(card => {
      card.classList.toggle("d-none");
    });

    showMoreBtn.textContent =isHidden ? "Show Less" : "Show More"
  });
});

// show login
function showLogin() {
  document.getElementById("login").style.display = "block";
}

function closeLogin() {
  document.getElementById("login").style.display = "none";
}