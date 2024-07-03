const baseURL = "http://127.0.0.1:5000";
const image = document.getElementById("myImage");
const boxesContainer = document.getElementById("boxes-container");
const cursorInfo = document.getElementById("cursor-Info");

function createBox(data) {
  // Create a new box element
  const box = document.createElement("div");
  box.classList.add("highlightBox");

  // Create the hint box element
  const hintBox = document.createElement("div");
  hintBox.classList.add("hintBox");

  // Set box styles and position based on data (from Flask)
  box.style.left = data.x + "px";
  box.style.top = data.y + "px";
  box.style.width = data.width + "px";
  box.style.height = data.height + "px";

  // Set hint box content (replace with your actual content)
  hintBox.textContent = `This is a box with details (X: ${data.x}, Y: ${data.y})`;

  // Add the hint box to the box element
  box.appendChild(hintBox);

  // Event listener for hover effect
  box.addEventListener("mouseover", () => {
    hintBox.style.display = "block"; // Show the hint box
    box.style.opacity = 0.5; // Reduce opacity on hover
  });

  box.addEventListener("mouseout", () => {
    box.style.opacity = 1; // Restore opacity on mouseout
    hintBox.style.display = "none"; // Hide the hint box
  });

  // Add the box with hint box to the container
  boxesContainer.appendChild(box);
}
// Event listener for cursor movement
document.addEventListener("mousemove", (event) => {
  cursorInfo.textContent = `Cursor X: ${event.clientX}, Cursor Y: ${event.clientY}`;
});

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
