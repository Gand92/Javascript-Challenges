// Slider variables setup
const widthSlider = document.getElementById('width-slider');
const heightSlider = document.getElementById('height-slider');
let widthValue = document.getElementById('width-value');
let heightValue = document.getElementById('height-value');
widthValue.textContent = widthSlider.value;
heightValue.textContent = heightSlider.value;

widthSlider.addEventListener('input', () => {
    widthValue.textContent = widthSlider.value;
});

heightSlider.addEventListener('input', () => {
    heightValue.textContent = heightSlider.value;
});

// Color Picker setup
let colorPicker = document.getElementById('color');
let color = colorPicker.value;

colorPicker.addEventListener('input', function () {
    color = colorPicker.value;
});

// Events setup
let events = {
    mouse: {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
    },
    touch: {
        down: 'touchstart',
        mobe: 'touchmove',
        up: 'touchend',
    },
};

let deviceType = '';

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (e) {
        deviceType = 'mouse';
        return false;
    }
};

isTouchDevice();

// Drawing Grid
const createGridBtn = document.getElementById('create-grid-btn');
drawingGrid(heightSlider.value, widthSlider.value);

createGridBtn.addEventListener('click', function () {
    drawingGrid(heightSlider.value, widthSlider.value);
});

function drawingGrid(rows, cols) {
    const drawingGrid = document.querySelector('.drawing-grid');
    // Remove previous grid
    let table = document.querySelector('table');
    table.draggable = false;
    table.innerHTML = '';

    // Create new grid
    for (let row = 0; row < rows; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < cols; col++) {
            let td = document.createElement('td');
            td.draggable = false;
            td.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    td.style.backgroundColor = 'transparent';
                } else {
                    td.style.backgroundColor = color;
                }
            });

            td.addEventListener(events[deviceType].move, (e) => {
                if (draw && !erase) {
                    td.style.backgroundColor = color;
                } else if (draw && erase) {
                    td.style.backgroundColor = 'transparent';
                }
            });

            td.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            td.classList.add('cell');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    drawingGrid.appendChild(table);
}

// Clear Grid
const clearGridBtn = document.getElementById('clear-grid-btn');

clearGridBtn.addEventListener('click', function () {
    //Set all cells to white
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
    });
});

// Erase
const eraseBtn = document.getElementById('erase-btn');

eraseBtn.addEventListener('click', function () {
    erase = true;
});

// Paint
const paintBtn = document.getElementById('paint-btn');

paintBtn.addEventListener('click', function () {
    erase = false;
});

// Download
const downloadBtn = document.getElementById('download-btn');

document.querySelector('#download-btn').addEventListener('click', function () {
    let drawingGrid = document.querySelector('.drawing-grid');
    removeBorders();

    html2canvas(drawingGrid).then(function (canvas) {
        let link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    addBorders();
});

function removeBorders() {
    //Remove borders from cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.border = 'none';
    });

    //Remove borders from table
    let table = document.querySelector('table');
    table.style.border = 'none';
}

function addBorders() {
    //Add borders to cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.border = 'rgba(0, 0, 0, 0.1) 1px solid';
    });

    //Add borders to table
    let table = document.querySelector('table');
    table.style.border = '2px solid rgba(0, 0, 0, 0.5)';
}
