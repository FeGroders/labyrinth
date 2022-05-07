var matrix;

function createMatrix(rows, cols) {
    matrix = [];
    for (var i = 0; i < rows; i++) {
        matrix[i] = [];
        for (var j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function getMatrix() {
    return matrix;
}

// export { createMatrix, getMatrix };

class Game {
    constructor() {
        this.matrix = createMatrix(10, 10);
    }
    getMatrix() {
        return this.matrix;
    }
}
export default Game;