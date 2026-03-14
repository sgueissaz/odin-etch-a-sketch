const ONLY_NUMBER = /^[0-9]+$/;

const state = {
    sizeGrid: 0,
    isDrawing: false
};

function getSizeGrid() {
    let sizeGrid = 0;
    do {
        response = prompt("Choose the size of the grid! (Max 100)");
        if (!ONLY_NUMBER.test(response)) {
            continue;
        }
        sizeGrid = parseInt(response);
    } while (sizeGrid < 1 || sizeGrid > 100);
    return sizeGrid;
}

const ui = {
    html: document.querySelector('html'),
    grid: document.querySelector('.grid'),
    squares: new Map()
};

function paintSquare(squareId) {
    ui.squares.get(squareId).classList.add('black');
}

function initGrid(sizeGrid) {
    for (let i = 0; i < sizeGrid; i++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        
        for (let j = 0; j < sizeGrid; j++) {
            const squareElement = document.createElement('div');
            squareElement.id = `square-${i}-${j}`;
            squareElement.classList.add('square');

            rowElement.appendChild(squareElement);
            ui.squares.set(squareElement.id, squareElement);
        }

        ui.grid.appendChild(rowElement);
    }
}

ui.html.addEventListener('pointerdown', (e) => {
    state.isDrawing = true;
    e.preventDefault();
});
ui.grid.addEventListener('pointermove', (e) => {
    if (!state.isDrawing) {
        return;
    }
    paintSquare(e.target.id);
});
ui.html.addEventListener('pointerup', (e) => {
    state.isDrawing = false;
    e.preventDefault();
});

state.sizeGrid = getSizeGrid();
initGrid(state.sizeGrid);
