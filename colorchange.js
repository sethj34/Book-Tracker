// JavaScript for handling color selection and background color change
const colorButtons = document.querySelectorAll('.color-container button');

// Function to handle color selection
const handleColorSelection = (selectedButton) => {
    colorButtons.forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
    // Call function to change background color based on selected color
    changeBackgroundColor(selectedButton);
};

// Function to change background color based on selected color
const changeBackgroundColor = (selectedButton) => {
    // Get the background color value from the selected button
    const color = window.getComputedStyle(selectedButton).getPropertyValue('background-color');
    // Change the background color of the body
    document.body.style.backgroundColor = color;
};

// Event listeners for color buttons
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleColorSelection(button);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const firstColorButton = document.querySelector('.color-container .green');
    if (firstColorButton) {
        firstColorButton.click();
    }
});