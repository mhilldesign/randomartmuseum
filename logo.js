const logoImages = [
    "logo-variant-1.png",
    "logo-variant-2.png",
    "logo-variant-3.png"
];

let currentLogoIndex = 0;

const logo = document.getElementById("logo");

logo.style.backgroundImage = `url(${logoImages[currentLogoIndex]})`;

document.getElementById("randomArtBtn").addEventListener("click", () => {
    currentLogoIndex = (currentLogoIndex + 1) % logoImages.length;
    logo.style.backgroundImage = `url(${logoImages[currentLogoIndex]})`;
});