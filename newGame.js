// Function to initialize the new game grid
function newGame() {
    // Clear the content of the page except for the essential UI elements
    document.body.innerHTML = '';

    // Re-add the top-row buttons (Main Function and Dark/Light Mode Toggle)
    const topRow = document.createElement('div');
    topRow.style.display = 'flex';
    topRow.style.justifyContent = 'space-between';
    topRow.style.padding = '10px';

    // Main Function button
    const mainButton = document.createElement('button');
    mainButton.textContent = 'Main Function';
    mainButton.className = 'button';
    mainButton.onclick = function () {
        alert('Main Function Called!');
    };

    // Dark/Light Mode Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark/Light Mode';
    toggleButton.className = 'button';
    toggleButton.onclick = toggleDarkMode;

    topRow.appendChild(mainButton);
    topRow.appendChild(toggleButton);
    document.body.appendChild(topRow);

    // Create a container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateRows = 'repeat(4, 1fr)';
    gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gridContainer.style.gap = '10px';
    gridContainer.style.width = '80%';
    gridContainer.style.margin = '50px auto';
    gridContainer.style.padding = '10px';

    // Fetch the 4 sets from the Java backend
    fetch('http://localhost:8080/api/subjectMatchwords') // Adjust the API endpoint as needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from backend');
            }
            return response.json();
        })
        .then(data => {
            // Ensure we have 4 sets with 4 match words each
            if (data.length !== 4 || !data.every(set => set.matchwords.length === 4)) {
                throw new Error('Invalid data format received');
            }

            // Populate the 16 buttons using the data
            const allWords = data.flatMap(set => set.matchwords); // Flatten the matchwords into a single array
            allWords.forEach((word, index) => {
                const gridButton = document.createElement('button');
                gridButton.textContent = word;
                gridButton.style.padding = '20px';
                gridButton.style.fontSize = '16px';
                gridButton.style.border = '1px solid #ccc';
                gridButton.style.borderRadius = '5px';
                gridButton.style.cursor = 'pointer';

                // Add a click event to the button (customize as needed)
                gridButton.onclick = function () {
                    alert(`Button ${index + 1} clicked! Word: ${word}`);
                };

                gridContainer.appendChild(gridButton);
            });

            // Append the grid container to the body
            document.body.appendChild(gridContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load game data. Please try again later.');
        });

    // Create the Save Game button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Game';
    saveButton.style.position = 'fixed';
    saveButton.style.bottom = '20px';
    saveButton.style.right = '20px';
    saveButton.style.padding = '15px 30px';
    saveButton.style.fontSize = '16px';
    saveButton.style.backgroundColor = '#007BFF';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '5px';
    saveButton.style.cursor = 'pointer';

    // Save Game functionality
    saveButton.onclick = function () {
        const gameState = {
            buttons: Array.from(gridContainer.children).map((btn, index) => ({
                id: index + 1,
                text: btn.textContent,
            })),
        };

        const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'gameState.json';
        a.click();

        URL.revokeObjectURL(url);
        alert('Game saved successfully!');
    };

    // Append the Save Game button to the body
    document.body.appendChild(saveButton);
}

// Function to toggle dark mode and light mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
}
