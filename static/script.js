const baseURL = "http://127.0.0.1:5000";
const image = document.getElementById("myImage");
const boxesContainer = document.getElementById("boxes-container");

function createBox(data) {
  // Create a new box element
  const box = document.createElement("div");
  box.classList.add("highlightBox");

  // Set box styles and position based on data (from Flask)
  box.style.left = data.x + "px";
  box.style.top = data.y + "px";
  box.style.width = data.width + "px";
  box.style.height = data.height + "px";

  // Optional: Add event listeners or content to the box

  // Add the box to the container
  boxesContainer.appendChild(box);
}

function fetchBoxData() {
  fetch("http://127.0.0.1:5000/a") // Replace with your actual server URL
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of objects with x, y, width, height
      for (const boxData of data) {
        createBox(boxData);
      }
    })
    .catch((error) => console.error(error));
}

// Fetch box data on page load or button click (adjust as needed)
fetchBoxData();
