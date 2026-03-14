const ONLY_NUMBER = /^[0-9]+$/;

const state = {
    sizeGrid: 0,
    isDrawing: false,
    color: {
        red: 0,
        green: 0,
        blue: 0,
    },
    squares: new Map()
};

function getSquareId(x, y) {
    return `square-${x}-${y}`;
}

function toggleDrawing() {
    state.isDrawing = !state.isDrawing;
}

function setRandomColor() {
    state.color = {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256)
    };
}

function getSizeGrid() {
    let sizeGrid = 0;
    do {
        response = prompt("Choose the size of the grid! (Max 100)");
        if (!ONLY_NUMBER.test(response)) {
            continue;
        }
        sizeGrid = parseInt(response);
    } while (sizeGrid < 1 || sizeGrid > 100);

    state.sizeGrid = sizeGrid;
}

function initGrid() {
    state.squares = new Map();

    for (let i = 0; i < state.sizeGrid; i++) {
        for (let j = 0; j < state.sizeGrid; j++) {
            const square = {
                opacity: 0,
                color: {}
            };
            state.squares.set(getSquareId(i, j), square);            
        }
    }
}

function drawSquare(squareId) {
    const square = state.squares.get(squareId);
    if (square === undefined) {
        return;
    }

    square.color = state.color;

    if (square.opacity < 1) {
        square.opacity += 0.1;
    }
}

const ui = {
    html: document.querySelector('html'),
    start: document.querySelector('#start'),
    grid: document.querySelector('.grid'),
    squares: new Map()
};

function initGridUI() {
    ui.grid.innerHTML = '';
    ui.squares = new Map();

    for (let i = 0; i < state.sizeGrid; i++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        
        for (let j = 0; j < state.sizeGrid; j++) {
            const squareElement = document.createElement('div');
            squareElement.id = getSquareId(i, j);
            squareElement.classList.add('square');

            rowElement.appendChild(squareElement);
            ui.squares.set(squareElement.id, squareElement);
        }

        ui.grid.appendChild(rowElement);
    }
}

function getColorCSS(color) {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function drawSquareUI(squareId) {
    const square = state.squares.get(squareId);
    if (square === undefined) {
        return;
    }

    const squareUI = ui.squares.get(squareId);
    if (squareUI === undefined) {
        return;
    }

    squareUI.style.opacity = square.opacity;
    squareUI.style.backgroundColor = getColorCSS(square.color);
}

ui.start.addEventListener('click', () => {
    getSizeGrid();
    initGrid();
    initGridUI();
})

ui.html.addEventListener('pointerdown', (e) => {
    toggleDrawing();
    setRandomColor();
    e.preventDefault();
});

ui.grid.addEventListener('pointermove', (e) => {
    if (!state.isDrawing) {
        return;
    }

    drawSquare(e.target.id);
    drawSquareUI(e.target.id);
});

ui.html.addEventListener('pointerup', (e) => {
    toggleDrawing();
    e.preventDefault();
});