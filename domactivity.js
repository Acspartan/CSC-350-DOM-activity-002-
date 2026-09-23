document.addEventListener("DOMContentLoaded", function () {

    // Convert the JSON string from paintings.json into a JavaScript array
    const paintings = JSON.parse(content);

    // Get the elements needed
    const paintingList = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");
    const title = document.querySelector("#title");
    const artist = document.querySelector("#artist");
    const description = document.querySelector("#description");

    // Create all thumbnail images
    paintings.forEach(function (painting) {

        const li = document.createElement("li");
        const img = document.createElement("img");

        img.src = "images/small/" + painting.id + ".jpg";
        img.alt = painting.title;
        img.dataset.id = painting.id;

        li.appendChild(img);
        paintingList.appendChild(li);
    });


    // ONE click handler for the entire painting list
    //  event delegation
    paintingList.addEventListener("click", function (event) {

        // Only continue if an image was clicked
        if (event.target.tagName !== "IMG") {
            return;
        }

        const paintingID = event.target.dataset.id;

        // Find the painting matching the clicked thumbnail
        const painting = paintings.find(function (item) {
            return item.id === paintingID;
        });

        if (!painting) {
            return;
        }

        // Remove previous large image and feature boxes
        figure.innerHTML = "";

        // Clear old description
        description.textContent = "";

        // Display title and artist
        title.textContent = painting.title;
        artist.textContent = "By " + painting.artist;

        // Create the large painting
        const fullImage = document.createElement("img");

        fullImage.src = "images/large/" + painting.id + ".jpg";
        fullImage.alt = painting.title;
        fullImage.id = "full";

        figure.appendChild(fullImage);


        // Create a rectangle for every feature
        painting.features.forEach(function (feature) {

            const box = document.createElement("div");

            box.className = "box";

            box.style.position = "absolute";
            box.style.left = feature.upperLeft[0] + "px";
            box.style.top = feature.upperLeft[1] + "px";

            box.style.width =
                (feature.lowerRight[0] - feature.upperLeft[0]) + "px";

            box.style.height =
                (feature.lowerRight[1] - feature.upperLeft[1]) + "px";


            // Show description when mouse is over the rectangle
            box.addEventListener("mouseover", function () {
                description.textContent = feature.description;
            });

            // Remove description when mouse leaves
            box.addEventListener("mouseout", function () {
                description.textContent = "";
            });

            figure.appendChild(box);
        });
    });

});
