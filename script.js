const SIZE_GRID = 64;

const state = {
    isDrawing: false
}

const ui = {
    html: document.querySelector('html'),
    grid: document.querySelector('.grid'),
    squares: new Map()
};

function paintSquare(squareId) {
    ui.squares.get(squareId).classList.add('black');
}

function initGrid() {
    for (let i = 0; i < SIZE_GRID; i++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        
        for (let j = 0; j < SIZE_GRID; j++) {
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

initGrid();
