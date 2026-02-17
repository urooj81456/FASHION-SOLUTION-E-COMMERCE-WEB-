// ---------------- B LOG PAGE JS -------------------//
// PRODUCT CAROUSEL
const images = [
    "https://images.unsplash.com/photo-1572009283538-2fce2d2a1909?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=862&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1626818590202-813076dd8a7b?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

let index = 0;
const carouselImage = document.getElementById("carouselImage");
carouselImage.src = images[index];


function next() {
    index++;
    if (index >= images.length) index = 0;
    carouselImage.src = images[index];

}

function prev() {
    index--;
    if (index < 0) index = images.length - 1;
    carouselImage.src = images[index];

}

const slides = [
    {
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Premium Winter Collection",
        text: "Discover our latest winter collection made with luxury fabrics and modern cuts."
    },
    {
        image: "https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Street Style Redefined",
        text: "Urban fashion meets premium design in our newest streetwear drop."
    },
    {
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Elegant Everyday Wear",
        text: "Comfortable yet stylish outfits for daily elegance."
    }
];

let CAROUSEL = 0;

function showSlide() {
    document.getElementById("carouselImage").src = slides[index].image;
    document.getElementById("carouselTitle").innerText = slides[index].title;
    document.getElementById("carouselText").innerText = slides[index].text;
}

function next() {
    index++;
    if (index >= slides.length) index = 0;
    showSlide();
}

function prev() {
    index--;
    if (index < 0) index = slides.length - 1;
    showSlide();
}

// Auto Slide
setInterval(next, 4000);

window.onload = showSlide;


// ------------------- FOOTER ----------------------- //
// ================= FOOTER NEWSLETTER =================
document.addEventListener("DOMContentLoaded", () => {

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterStatus = document.querySelector(".newsletter-status");

    // Safety check (NO console error)
    if (!newsletterForm || !newsletterStatus) {
        console.warn("Newsletter elements not found");
        return;
    }

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector("input");
        const email = emailInput.value.trim();

        if (email === "") return;

        // Save to LocalStorage
        let emails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];

        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem("newsletterEmails", JSON.stringify(emails));
        }

        // UI feedback
        newsletterStatus.textContent = "Subscribed successfully ✨";
        newsletterStatus.style.opacity = "1";

        newsletterForm.reset();
    });

});


