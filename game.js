let isArtMode = false;
document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("createButton").addEventListener("click", function () {
    const informationBlock = document.getElementById("informationBlock");
    const artContainer = document.getElementById("artContainer");

    if (!isArtMode) {
        informationBlock.style.display = "none";

        artContainer.innerHTML = "";
        artContainer.style.display = "block";

        const images = [
            "sticker1.png",
            "sticker2.png",
            "sticker3.png",
            "sticker4.png",
            "sticker5.png",
            "sticker6.png",
            "sticker7.png",
            "sticker8.png",
            "sticker9.png",
            "sticker10.png",
            "sticker11.png",
            "sticker12.png",
            "sticker13.png",
            "sticker14.png",
            "sticker15.png",
            "sticker16.png",
        ];

        images.forEach(src => {
            const wrapper = document.createElement("div");
            wrapper.style.position = "absolute";
            wrapper.style.width = "120px";
            wrapper.style.left = Math.random() * 300 + "px";
            wrapper.style.top = Math.random() * 300 + "px";
            wrapper.style.zIndex = "100";

            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100%";
            img.style.pointerEvents = "none";
            img.style.zIndex = "100";

            const handle = document.createElement("div");
            handle.style.width = "20px";
            handle.style.height = "20px";
            handle.style.backgroundImage = "url('resize.png')";
            handle.style.backgroundSize = "cover";
            handle.style.zIndex = "101";
            handle.style.position = "absolute";
            handle.style.right = "0";
            handle.style.bottom = "0";
            handle.style.cursor = "nwse-resize";

            wrapper.appendChild(img);
            wrapper.appendChild(handle);

            makeDraggable(wrapper);
            makeResizable(wrapper, handle);

            artContainer.appendChild(wrapper);
        });

        isArtMode = true;

    } else {
        artContainer.innerHTML = "";
        artContainer.style.display = "none";

        informationBlock.style.display = "block";

        isArtMode = false;
    }
});
    });

function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    element.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        element.style.left = (e.clientX - offsetX) + "px";
        element.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.cursor = "grab";
    });
}

function makeResizable(wrapper, handle) {
    let isResizing = false;

    handle.addEventListener("mousedown", (e) => {
        e.stopPropagation(); 
        isResizing = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;

        const rect = wrapper.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;

        if (newWidth > 30) { 
            wrapper.style.width = newWidth + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isResizing = false;
    });
}





