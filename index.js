const playerElement = document.getElementById("kratos")
const mazeDiv = document.getElementById("maze")
const currentPosition = {
    top: 0,
    left: 0,
}
const currentIndex = {
    row: 0,
    cell: 0,
}

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];

for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const rowString = map[rowIndex]
    const rowDiv = document.createElement("div")
    rowDiv.classList.add("row")
    mazeDiv.appendChild(rowDiv)

    for (let cellIndex = 0; cellIndex < rowString.length; cellIndex++) {
        const cell = rowString[cellIndex]
        switch (cell) {
            case "W":
                const wallCell = createCell("wall", rowIndex, cellIndex)
                wallCell.dataset.type = "wall"
                rowDiv.appendChild(wallCell)

                break
            case " ":
                rowDiv.appendChild(createCell("space", rowIndex, cellIndex))
                break
            case "S":
                const startCell = createCell("start", rowIndex, cellIndex)
                rowDiv.appendChild(startCell)
                startCell.appendChild(playerElement)
                movePlayerToStart(startCell)
                break
            case "F":
                const finishCell = createCell("finish", rowIndex, cellIndex)
                finishCell.dataset.type = "finish"
                rowDiv.appendChild(finishCell)
                break
        }
    }
}

function getCoords(element) {
    const box = element.getBoundingClientRect();

    return {
        top: box.top + window.pageXOffset,
        left: box.left + window.pageYOffset
    };
}

function movePlayerToStart(startCell) {
    const startPosition = getCoords(startCell)
    playerElement.style.top = startPosition.top + "px"
    playerElement.style.left = startPosition.left + "px"

    currentPosition.top = startPosition.top
    currentPosition.left = startPosition.left
    currentIndex.row = parseInt(startCell.dataset.rowIndex)
    currentIndex.cell = parseInt(startCell.dataset.cellIndex)
}

function createCell(type, rowIndex, cellIndex) {
    let cellElement = document.createElement("div")
    cellElement.classList.add("cell", type)
    cellElement.dataset.rowIndex = rowIndex
    cellElement.dataset.cellIndex = cellIndex
    return cellElement
}

document.addEventListener('keydown', event => {
    if (!event.key.includes("Arrow")) return false

    const directionOffsets = {
        "ArrowDown": {
            vertical: +1,
            horizontal: +0,
        },
        "ArrowUp": {
            vertical: -1,
            horizontal: +0,
        },
        "ArrowLeft": {
            vertical: +0,
            horizontal: -1,
        },
        "ArrowRight": {
            vertical: +0,
            horizontal: +1,
        },
    }

    const nextCurrentPositionTop = currentPosition.top + directionOffsets[event.key].vertical * 20
    const nextCurrentPositionLeft = currentPosition.left + directionOffsets[event.key].horizontal * 20
    const nextRowIndex = currentIndex.row + directionOffsets[event.key].vertical
    const nextCellIndex = currentIndex.cell + directionOffsets[event.key].horizontal
    const selector = "[data-row-index='" + nextRowIndex + "'][data-cell-index='" + nextCellIndex + "']"
    const nextCellElement = document.querySelector(selector)
    if (nextCellElement.dataset.type === "wall") return false

    currentIndex.row = nextRowIndex
    currentIndex.cell = nextCellIndex
    currentPosition.top = nextCurrentPositionTop
    currentPosition.left = nextCurrentPositionLeft
    console.log(currentPosition)
    playerElement.style.top = nextCurrentPositionTop + "px"
    playerElement.style.left = nextCurrentPositionLeft + "px"
    console.log('keydown event\n\n' + 'key: ' + event.key);
    checkWin(nextCellElement)
})
function checkWin(nextCellElement){
    if (nextCellElement.dataset.type === "finish") {
        alert("You Win!")
    }
}