document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let firstName = document.getElementById("first-name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let verify = document.getElementById("verify").checked;

    if (firstName === "" || email === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
    }

    if (!verify) {
        alert("Please verify that you are human.");
        return;
    }

    alert("Your message has been sent successfully!");
});
