// get art
async function getRandomAICArtwork() {

    const res = await fetch("https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_display,date_display&limit=100");
    const data = await res.json();


    const randomArt = data.data[Math.floor(Math.random() * data.data.length)];

    if (!randomArt.image_id) return getRandomAICArtwork(); 

    return {
        title: randomArt.title || "Unknown",
        image: `https://www.artic.edu/iiif/2/${randomArt.image_id}/full/843,/0/default.jpg`,
        artist: randomArt.artist_display || "Unknown",
        year: randomArt.date_display || "Unknown",
        museum: "Art Institute of Chicago"
    };
}

const museumFunctions = [getRandomMetArtwork, getRandomAICArtwork];

async function getRandomArtworkFromAnyMuseum() {
    const randomFunc = museumFunctions[Math.floor(Math.random() * museumFunctions.length)];
    return await randomFunc();
}

document.getElementById("randomArtBtn").addEventListener("click", async () => {
    const artwork = await getRandomArtworkFromAnyMuseum();

    document.getElementById("artImage").src = artwork.image;
    document.getElementById("artTitle").textContent = artwork.title;
    document.getElementById("artArtist").textContent = artwork.artist;
    document.getElementById("artYear").textContent = artwork.year;
    document.getElementById("artMuseum").textContent = artwork.museum;
});

//button

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("randomArtBtn").addEventListener("click", async () => {
        const spinner = document.getElementById("spinner");
        const artImage = document.getElementById("artImage");

        spinner.style.display = "block";
        artImage.style.display = "none";

        const artwork = await getRandomArt();

        artImage.src = artwork.image;

//timer

let timeoutId;


timeoutId = setTimeout(() => {
    console.log("Image taking too long, loading a new artwork...");
    document.getElementById("randomArtBtn").click(); 
}, 7000);


artImage.onload = () => {
    clearTimeout(timeoutId);
    spinner.style.display = "none";
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