// get art

async function getRandomMetArt() {
    const objectsRes = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
    const objectsData = await objectsRes.json();

    const randomID = objectsData.objectIDs[Math.floor(Math.random() * objectsData.objectIDs.length)];
    const objectRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`);
    const objectData = await objectRes.json();

    return {
        title: objectData.title || "Unknown",
        image: objectData.primaryImageSmall || "",
        artist: objectData.artistDisplayName || "Unknown",
        year: objectData.objectDate || "Unknown",
        medium: objectData.medium || "Unknown",
        museum: "The Met",
        link: objectData.objectURL || "#"
    };
}

async function getRandomCMAArt() {
    const randomOffset = Math.floor(Math.random() * 10000);

    const res = await fetch(
        `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=100&skip=${randomOffset}`
    );

    const data = await res.json();

    const artworks = data.data.filter(item =>
        item.images && item.images.web && item.images.web.url
    );

    if (artworks.length === 0) return getRandomCMAArt();

    const randomArt = artworks[Math.floor(Math.random() * artworks.length)];

    return {
        title: randomArt.title || "Unknown",
        image: randomArt.images.web.url,
        artist: randomArt.creators?.[0]?.description || "Unknown",
        year: randomArt.creation_date || "Unknown",
        medium: randomArt.technique || "Unknown",
        museum: "Cleveland Museum of Art",
        link: randomArt.url || "#"
    };
}

async function getRandomAICArt() {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=100&fields=id,title,artist_display,date_display,image_id`
    );

    const data = await res.json();

    const artworks = data.data.filter(item => item.image_id);

    if (artworks.length === 0) return getRandomAICArt();

    const art = artworks[Math.floor(Math.random() * artworks.length)];

    const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;

    return {
        title: art.title || "Unknown",
        image: imageUrl,
        artist: art.artist_display || "Unknown",
        year: art.date_display || "Unknown",
        medium: art.medium_display || "Unknown",
        museum: "Art Institute of Chicago",
        link: `https://www.artic.edu/artworks/${art.id}`
    };
}


async function getRandomArt() {
    const museums = [getRandomMetArt, getRandomCMAArt, getRandomAICArt];
    const randomMuseumFunc = museums[Math.floor(Math.random() * museums.length)];
    return await randomMuseumFunc();
}



//button

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("randomArtBtn").addEventListener("click", async () => {
        const spinner = document.getElementById("spinner");
        const artImage = document.getElementById("artImage");

        loader.style.display = "block";
        artImage.style.display = "none";

        const artwork = await getRandomArt();

        artImage.src = artwork.image;

        artImage.style.transform = "scale(1)";
        enlarged = false;

        //timer

        let timeoutId;


        timeoutId = setTimeout(() => {
            console.log("Image taking too long, loading a new artwork...");
            document.getElementById("randomArtBtn").click();
        }, 10000);


        artImage.onload = () => {
            clearTimeout(timeoutId);
            loader.style.display = "none";
            artImage.style.display = "block";

        };

        artImage.onerror = () => {
            clearTimeout(timeoutId);
            console.log("Failed to load image, trying another one...");
            document.getElementById("randomArtBtn").click();
        };

        document.getElementById("artTitle").textContent = artwork.title;
        document.getElementById("artArtist").textContent = artwork.artist;
        document.getElementById("artYear").textContent = artwork.year;
        document.getElementById("artMuseum").textContent = artwork.museum;
        document.getElementById("artMedium").textContent = artwork.medium;
        document.getElementById("artLink").href = artwork.link;
        document.getElementById("artLink").textContent = "More info about this piece";

        const artLink = document.getElementById("artLink");
        artLink.href = artwork.link;
        artLink.style.display = "inline";
    });

    let retryCount = 0;
    const maxRetries = 5;

    function loadNewArtwork() {
        if (retryCount >= maxRetries) {
            console.log("Could not load artwork after several attempts.");
            spinner.style.display = "none";
            return;
        }
        retryCount++;
        document.getElementById("randomArtBtn").click();
    }

});

const artImage = document.getElementById("artImage");
let enlarged = false;

artImage.addEventListener("click", () => {
    if (!enlarged) {
        artImage.style.transform = "scale(1.5)";
        enlarged = true;
    } else {
        artImage.style.transform = "scale(1)";
        enlarged = false;
    }

    artImage.addEventListener("click", () => {
        enlarged = !enlarged;
        artImage.style.transform = enlarged ? "scale(1.5)" : "scale(1)";
        artImage.classList.toggle("enlarged", enlarged);
    });
});


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






