// Terrible docs but it's 10:00 and i'm tired

class Board {
    constructor (cb) {
        this._board = new Array(3).fill(0).map(r => new Array(3).fill(undefined));
        this.updateBoard = cb;
    }

    get board () {
        return this._board;
    }

    /**
     * Sets the character at x, y on the board.
     * @param {int} x 
     * @param {int} y 
     * @param {int} char 
     */
    setAt (x, y, char = 'X') {
        this._board[ y ][ x ] = char;
        this.updateBoard();
    }

    /**
     * Gets the character at x, y on the board.
     * @param {*} x 
     * @param {*} y 
     */
    getAt (x, y) {
        console.log(this._board, x, y);
        return this._board[ y ][ x ];
    }

    /**
     * Checks if either the computer or the player has won.
     */
    checkWin () {

        let winner = '';

        // Horizontal
        for (let y = 0; y < 3; y++) {
            if (this.getAt(0, y) === undefined) continue;
            if (this.getAt(0, y) === this.getAt(1, y) && this.getAt(1, y) === this.getAt(2, y)) {
                winner = this.getAt(0, y);
                return setTimeout(alert, 100, `${ winner } is the winner!`);
            }
        }

        // Vertical
        for (let x = 0; x < 3; x++) {
            if (this.getAt(x, 0) === undefined) continue;
            if (this.getAt(x, 0) === this.getAt(x, 1) && this.getAt(x, 1) === this.getAt(x, 2)) {
                winner = this.getAt(x, 0);
                return setTimeout(alert, 100, `${ winner } is the winner!`);
            }
        }

        // Diagonals
        const tl = this.getAt(0, 0);
        if (tl !== undefined && tl === this.getAt(1, 1) && tl === this.getAt(2, 2)) {
            winner = tl;
            return setTimeout(alert, 100, `${ winner } is the winner!`);
        }

        const tr = this.getAt(2, 0);
        if (tr !== undefined && tr === this.getAt(1, 1) && tr === this.getAt(0, 2)) {
            winner = tr;
            return setTimeout(alert, 100, `${ winner } is the winner!`);
        }

        return false;
    }

    /**
     * Makes a random move. 
     */
    aiMove () {
        const potential = [];
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (typeof this.getAt(x, y) === 'undefined') {
                    // console.log(this.board);
                    potential.push([ x, y ]);
                }
            }
        }

        if (!potential.length) return setTimeout(alert, 100, 'It was a tie.');

        const [ x, y ] = potential[ Math.floor(Math.random() * potential.length) ];
        this.setAt(x, y, 'O');
    }

    /**
     * Player makes a move.
     * @param {int} x 
     * @param {int} y 
     */
    move (x, y) {
        if (typeof this.getAt(x, y) !== 'undefined') return;
        this.setAt(x, y);
        if (this.checkWin()) return;
        this.aiMove();
        this.checkWin();
    }


    _loadAll (collection, cb) {
        this.cb = cb;

        let i = 0;
        for (const el of collection) {
            const x = i % 3;
            const y = Math.floor(i / 3);
            el.addEventListener('click', () => {
                this.move(x, y);
            });
            i++;
        }
    }

}