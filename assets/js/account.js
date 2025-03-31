$(function () {
  $("#login-modal").load("./assets/login.html");
});

function showLogin() {
  $("#login").css({ display: "block" }).hide().fadeIn(250);
  $("#login-btn").prop("disabled", true);
}

function closeLogin() {
  $("#login").fadeOut(250, function () {
    $(this).css({ display: "none" });
    $("#login-btn").prop("disabled", false);
  });
}

$(document).mouseup(function (e) {
  var $loginModal = $("#login");
  if (
    !$loginModal.is(e.target) &&
    $loginModal.has(e.target).length === 0 &&
    $loginModal.is(":visible")
  ) {
    closeLogin();
  }
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

function validateLoginForm(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email === '' || password === '') {
      alert('All fields are required.');
      return false;
  }

  if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
  }

  const storedUser = JSON.parse(localStorage.getItem(email));

  if (!storedUser || storedUser.password !== password) {
      alert('Invalid email or password.');
      return false;
  }

  alert('Login successful!');
  window.location.href = "./index.html";

  return true;
}
function validateSignupForm(event) {
  event.preventDefault(); // Prevent form submission
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (email === '' || password === '' || confirmPassword === '') {
      alert('All fields are required.');
      return false;
  }

  if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
  }

  if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
  }

  const user = {
      email: email,
      password: password
  };
  localStorage.setItem(email, JSON.stringify(user));

  alert('Signup successful!');
  document.getElementById('check').checked = false;

  return true;
}