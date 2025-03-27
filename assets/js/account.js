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