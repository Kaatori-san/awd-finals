document.addEventListener("DOMContentLoaded", function () {
    const faqSections = document.querySelectorAll(".section h2");

    faqSections.forEach((section) => {
        section.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("hidden");
        });
    });
});
