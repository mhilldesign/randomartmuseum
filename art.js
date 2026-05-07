async function loadRandomArt() {
    try {
        const response = await fetch(
            "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=100"
        );

        const data = await response.json();
        const artworks = data.data;

        const randomIndex = Math.floor(Math.random() * artworks.length);
        const art = artworks[randomIndex];

        document.getElementById("artImage").src = art.images.web.url;
        document.getElementById("artTitle").textContent = art.title || "Untitled";
        document.getElementById("artArtist").textContent =
            art.creators?.[0]?.description || "Unknown artist";

    } catch (error) {
        console.error("Error loading art:", error);
    }
}

window.addEventListener("DOMContentLoaded", loadRandomArt);