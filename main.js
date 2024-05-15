const addBtn = document.getElementById("add-button");
const newBookArea = document.getElementById("output-area");

const addBook = () => {
    // CREATE A NEW CONTAINER FOR THE BOOK INPUT AREA
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("book-div");

    // CALCULATE THE POSITION OF THE NEW CONTAINER BASED ON THE EXISTING ONES
    const existingContainers = document.querySelectorAll('.book-div');
    const newPosition = 120 + existingContainers.length * 100;

    // SET THE POSITION OF THE NEW CONTAINER
    inputContainer.style.top = `${newPosition}px`;

    // CLOSE BUTTON
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
        inputContainer.remove();
        updateBookPositions();
    });
    inputContainer.appendChild(closeButton);

    // CREATE AND APPEND INPUT FOR BOOK NAME
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Book Name");
    nameInput.classList.add("input-element", "book-name");
    inputContainer.appendChild(nameInput);

    // CREATE AND APPEND INPUT FOR CURRENT PAGE NUMBER
    const currentPageInput = document.createElement("input");
    currentPageInput.setAttribute("type", "number");
    currentPageInput.setAttribute("placeholder", "Current Page");
    currentPageInput.classList.add("input-element", "page-input", "current-page");
    inputContainer.appendChild(currentPageInput);

    // CREATE AND APPEND INPUT FOR TOTAL PAGES
    const totalPagesInput = document.createElement("input");
    totalPagesInput.setAttribute("type", "number");
    totalPagesInput.setAttribute("placeholder", "Total Pages");
    totalPagesInput.classList.add("input-element", "page-input", "total-pages");
    inputContainer.appendChild(totalPagesInput);

    // CREATE AND APPEND SUBMIT BUTTON
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("submit-button");

    // ADD EVENT LISTENER TO SUBMIT BUTTON
    submitButton.addEventListener("click", () => {
        // RETRIEVE INPUT VALUES
        const bookName = nameInput.value;
        const currentPage = currentPageInput.value;
        const totalPages = totalPagesInput.value;

        // PERFORM VALIDATION CHECKS
        if (bookName.trim() === '' || currentPage.trim() === '' || totalPages.trim() === '') {
            alert("Please fill in all fields.");
            return;
        }

        if (isNaN(currentPage) || isNaN(totalPages) || currentPage <= 0 || totalPages <= 0) {
            alert("Page number and total pages must be positive integers.");
            return;
        }

        if (parseInt(currentPage) > parseInt(totalPages)) {
            alert("Current page number cannot be greater than total pages.");
            return;
        }

        // ALL CONDITIONS MET, PROCEED WITH SUBMISSION
        displayBookInfo();
    });

    inputContainer.appendChild(submitButton);

    // FUNCTION TO DISPLAY BOOK INFORMATION
    const displayBookInfo = () => {
        const bookName = nameInput.value;
        const currentPage = currentPageInput.value;
        const totalPages = totalPagesInput.value;

        // CREATE AND APPEND BOOK INFO
        const bookInfo = document.createElement("h1");
        bookInfo.textContent = `${bookName} (${currentPage}/${totalPages})`;
        bookInfo.classList.add("book-info");
        inputContainer.innerHTML = '';
        inputContainer.appendChild(closeButton);
        inputContainer.appendChild(bookInfo);
        inputContainer.appendChild(minusButton);
        inputContainer.appendChild(plusButton);
        inputContainer.appendChild(editButton);
    };

    // PLUS BUTTON
    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.classList.add("plus-button");
    plusButton.addEventListener("click", () => {
        if (parseInt(currentPageInput.value) < parseInt(totalPagesInput.value)) {
            currentPageInput.value = parseInt(currentPageInput.value) + 1;
            updateBookInfo();
        }
    });

    // MINUS BUTTON
    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.classList.add("minus-button");
    minusButton.addEventListener("click", () => {
        if (parseInt(currentPageInput.value) > 1) {
            currentPageInput.value = parseInt(currentPageInput.value) - 1;
            updateBookInfo();
        }
    });

    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.textContent = "⋮";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
        if (editButton.textContent === "⋮") {
            inputContainer.innerHTML = '';
            inputContainer.appendChild(closeButton);
            inputContainer.appendChild(nameInput);
            inputContainer.appendChild(currentPageInput);
            inputContainer.appendChild(totalPagesInput);
            inputContainer.appendChild(submitButton);
        } else {
            displayBookInfo();
            editButton.textContent = "⋮";
        }
    });

    // FUNCTION TO UPDATE BOOK INFORMATION
    const updateBookInfo = () => {
        const bookName = nameInput.value;
        const currentPage = currentPageInput.value;
        const totalPages = totalPagesInput.value;
        const existingBookInfo = inputContainer.querySelector(".book-info");
    
        if (existingBookInfo) {
            existingBookInfo.textContent = `${bookName} (${currentPage}/${totalPages})`;
        } else {
            const bookInfo = document.createElement("h1");
            bookInfo.textContent = `${bookName} (${currentPage}/${totalPages})`;
            bookInfo.classList.add("book-info");
            inputContainer.appendChild(bookInfo);
        }
    };

    // APPEND THE NEW CONTAINER WITH INPUT ELEMENTS TO THE OUTPUT AREA 
    newBookArea.appendChild(inputContainer);
    
};

// FUNCTION TO UPDATE BOOK POSITIONS
const updateBookPositions = () => {
    const existingContainers = document.querySelectorAll('.book-div');
    existingContainers.forEach((container, index) => {
        const newPosition = 120 + index * 100;
        container.style.top = `${newPosition}px`;
    });
};

addBtn.addEventListener("click", addBook);