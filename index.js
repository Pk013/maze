var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
const playerElement = document.getElementById("kratos")
const mazeDiv = document.getElementById("maze")
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

for (let rowIndex = 0; rowIndex < map.length; rowIndex++){ 
    const rowString = map[rowIndex]
    const rowDiv = document.createElement("div")
    rowDiv.classList.add("row")
    mazeDiv.appendChild(rowDiv)

    for (let cellIndex = 0; cellIndex < rowString.length; cellIndex++){
        const cell = rowString[cellIndex]
        switch (cell) {
            case "W":
                rowDiv.appendChild(createCell("wall", rowIndex, cellIndex))
                break
            case " ":
                rowDiv.appendChild(createCell("space", rowIndex, cellIndex))
                break
            case "S":
                const startCell = createCell("start", rowIndex, cellIndex)
                rowDiv.appendChild(startCell)
                startCell.appendChild(playerElement)
                break
            case "F":
                rowDiv.appendChild(createCell("finish", rowIndex, cellIndex))
                break
        }
    }
}

function createCell(type, rowIndex, cellIndex) {
    let cellElement = document.createElement("div")
    cellElement.classList.add("cell", type)
    cellElement.dataset.rowIndex = rowIndex
    cellElement.dataset.cellIndex = cellIndex
    return cellElement
}

document.addEventListener('keydown', (event) => {
    let currentCellElement = playerElement.parentElement
    let currentRowIndex = currentCellElement.dataset.rowIndex
    let currentCellIndex = currentCellElement.dataset.cellIndex
    let nextRowIndex = currentRowIndex + 0
    let nextCellIndex = currentCellIndex + 1
    let keyName = event.key;
    switch(keyName){
        case "ArrowDown":
        downPressed = true
        currentRowIndex += 1
        document.getElementById("kratos").style.top = nextRowIndex + "px"
        break

        case "ArrowUp":
        upPressed = true
        currentRowIndex += 1
        document.getElementById("kratos").style.top = nextRowIndex + "px"
        break

        case "ArrowLeft":
        leftPressed = true
        currentCellIndex += 0
        document.getElementById("kratos").style.top = nextCellIndex = "px"
        break

        case "ArrowRight":
        rightPressed = true
        currentCellIndex += 0
        document.getElementById("kratos").style.top = nextCellIndex = "px"
    }
    console.log('keydown event\n\n' + 'key: ' + keyName);

})