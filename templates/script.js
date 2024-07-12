const baseURL = "http://127.0.0.1:5000";
const image = document.getElementById("myImage");
const boxesContainer = document.getElementById("boxes-container");

const cursorInfo = document.getElementById("cursor-Info");
const elementInfo = document.getElementById("element-Info");
const cursorOffsetInfo = document.getElementById("cursorOffset-Info");
let selectedBox = null; // Variable to track the currently selected box



const yAxisFollower = document.createElement("div"); // Create the follower element
yAxisFollower.classList.add("y-axis-follower"); // Add the styling class
document.body.appendChild(yAxisFollower); // Append the follower to the body (adjust if needed)
const xAxisFollower = document.createElement("div"); // Create the follower element
xAxisFollower.classList.add("x-axis-follower"); // Add the styling class
document.body.appendChild(xAxisFollower); // Append the follower to the body (adjust if needed)


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

  // Event listener for click selection
  box.addEventListener("click", () => {
    if (selectedBox === box) {
      // Deselect "box" if already selected
      updateSelectionLines(null);
      elementInfo.textContent = `(X: 0, Y: 0) - (Width: 0, Height: 0)`;
      box.classList.remove("selected");
      selectedBox = null;
      clearSpacingGuides();
    } else {
      // Select "box" and deselect previously selected one
      if (selectedBox) {
        selectedBox.classList.remove("selected");
      }
      box.classList.add("selected");
      selectedBox = box;
      elementInfo.textContent = `(X: ${data.x}, Y: ${data.y}) - (Width: ${data.width}, Height: ${data.height})`;
      updateSelectionLines(data);
      showSpacingGuides(box, data);
    }
  });

  // Event listener for cursor movement
  document.addEventListener("mousemove", (event) => {
    cursorInfo.textContent = `Cursor X: ${event.clientX}, Cursor Y: ${event.clientY}`;
  });

  // Add the box with hint box to the container
  boxesContainer.appendChild(box);
}

function updateSelectionLines(boxData) {
  // Update selection lines or any additional details here
}

function clearSpacingGuides() {
  const guides = document.querySelectorAll('.spacing-guide');
  guides.forEach(guide => guide.remove());
}

function showSpacingGuides(selectedBox, selectedData) {
  clearSpacingGuides(); // Clear existing guides
  
  const containerRect = boxesContainer.getBoundingClientRect();
  const selectedRect = selectedBox.getBoundingClientRect();

  const margTop = image.getBoundingClientRect().top;
  const margLeft = image.getBoundingClientRect().left;

  const _h = 'horizontal';
  const _v = 'vertical';
  const _leading = selectedData.x; // 0;
  const _trailing = selectedData.width + selectedData.x; // 0;
  const _top = selectedData.y; // 0;
  const _bottom =  selectedData.height + selectedData.y;// 0;

  // Create horizontal guides on the left and right sides of the selected box
  //  (type, offset, start, length)
  createGuide(`${_h}`, selectedRect.top, 0, selectedRect.left - containerRect.left);
  createGuide(`${_h}`, selectedRect.top, selectedRect.right, containerRect.right - selectedRect.right);
  createGuide(`${_h}`, selectedRect.bottom, 0, selectedRect.left - containerRect.left);
  createGuide(`${_h}`, selectedRect.bottom, selectedRect.right, containerRect.right - selectedRect.right);

  // Create vertical guides on the top and bottom sides of the selected box
  createGuide(`${_v}`, selectedRect.left, 0, selectedRect.top); //not showing
  createGuide(`${_v}`, selectedRect.left, selectedRect.bottom, containerRect.bottom - selectedRect.bottom);
  createGuide(`${_v}`, selectedRect.right, 0, selectedRect.top); //not showing
  createGuide(`${_v}`, selectedRect.right, selectedRect.bottom, containerRect.bottom - selectedRect.bottom);

  // createGuide('horizontal', selectedRect.top, containerRect.left, selectedRect.left - containerRect.left);
  // createGuide('horizontal', selectedRect.top, selectedRect.right, containerRect.right - selectedRect.right);
  // createGuide('horizontal', selectedRect.bottom, containerRect.left, selectedRect.left - containerRect.left);
  // createGuide('horizontal', selectedRect.bottom, selectedRect.right, containerRect.right - selectedRect.right);

  // createGuide('vertical', selectedRect.left, selectedData.y, selectedRect.top - containerRect.top); //not showing
  // createGuide('vertical', selectedRect.left, selectedRect.bottom, containerRect.bottom - selectedRect.bottom);
  // createGuide('vertical', selectedRect.right, containerRect.top, selectedRect.top - containerRect.top); //not showing
  // createGuide('vertical', selectedRect.right, selectedRect.bottom, containerRect.bottom - selectedRect.bottom);
  console.log("s------", selectedRect.left, "c------", containerRect.left, selectedData.x) // 458 ----- 8
  console.log("s------", selectedRect.right, "------", containerRect.right, selectedData.width+selectedData.x) // 522 ----- 1912
  console.log("s------", selectedRect.top, "------", containerRect.top, selectedData.y)      // 178 ----- 713.59
  console.log("s------", selectedRect.bottom, "------", containerRect.bottom, selectedData.height+selectedData.y) // 222 ----- 713.59
  console.log("s------", selectedRect.height,"------", containerRect.height) // 44 ------ 0
  //{'x': 450, 'y': 170, 'width': 50, 'height': 30}
}

function createGuide(type, offset, start, length) {
  const guide = document.createElement('div');
  guide.classList.add('spacing-guide');

  if (type === 'horizontal') {
    guide.style.width = `${length}px`;
    guide.style.left = `${start}px`;
    guide.style.top = `${offset}px`;
    guide.style.height = '1px';
    guide.style.borderTop = '1px dashed #f90';
  } else {
    guide.style.height = `${length}px`;
    guide.style.top = `${start}px`;
    guide.style.left = `${offset}px`;
    guide.style.width = '1px';
    guide.style.borderLeft = '1px dashed #f90';
  }

  boxesContainer.appendChild(guide); // Append guide to the container instead of body
}

function fetchBoxData() {
  fetch(`${baseURL}/a`) // Replace with your actual server URL
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




document.addEventListener("mousemove", (event) => {
  // Update cursor info (unchanged)
  // ...

  const margTop = image.getBoundingClientRect().top;
  const margLeft = image.getBoundingClientRect().left;
  // const margRight = image.getBoundingClientRect().right;
  // const margBottom = image.getBoundingClientRect().bottom;

  // Update Y-axis follower position
  const containerHeight = image.clientHeight + image.getBoundingClientRect().top;
  const relativeY = event.clientY; // - image.getBoundingClientRect().top; // Get relative Y position within the container
  const followerPositionY = Math.min(containerHeight + 0, Math.max(margTop, relativeY)); // Clamp the follower position within container bounds
  yAxisFollower.style.top = `${followerPositionY}px`;

  // Update Y-axis follower position
  const containerWidth = image.clientWidth + image.getBoundingClientRect().left;
  const relativeX = event.clientX; //- image.getBoundingClientRect().left; // Get relative Y position within the container
  const followerPositionX = Math.min(containerWidth + 0, Math.max(margLeft, relativeX)); // Clamp the follower position within container bounds
  xAxisFollower.style.left = `${followerPositionX}px`;
});