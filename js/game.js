document.addEventListener(`DOMContentLoaded`, init)

let board;
function init() {
    board = new Board(updateBoard);
    buttons = document.querySelectorAll(`button`);

    let i = 0;
    for (const btn of document.querySelectorAll(`button`)) {
        const x = i % 3;
        const y = Math.floor(i / 3);
        btn.addEventListener(`click`, function () {
            board.move(x, y);
        })
        i++
    }
}

function updateBoard() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const cell = board.getAt(x, y);
            if (typeof cell === `undefined`) continue;
            buttons[y * 3 + x].innerText = cell;
        }
    }
}
