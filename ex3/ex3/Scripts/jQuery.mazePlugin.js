var myCanvas = document.getElementById("mazeCanvas");
var player = document.getElementById("playerImage");
var goal = document.getElementById("goalImage");
var context = mazeCanvas.getContext("2d");
var mazeObject;
var currentPos;
var cellWidth, cellHeight;
var rows, cols;
(function ($) {

    
    $.fn.mazePlugin = function (maze) {
        var offset = -1;
        rows = maze.Rows;
        cols = maze.Cols;
        cellWidth = myCanvas.width / cols;
        cellHeight = myCanvas.height / rows;
        currentPos = maze.Start;
        mazeObject = maze;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (maze.Maze.charAt(++offset) == 1) {
                    context.fillRect(cellWidth * j, cellHeight * i,
                        cellWidth, cellHeight);
                }

            }
        }
        context.drawImage(player, maze.Start.Col * cellWidth, maze.Start.Row * cellHeight,
            cellWidth, cellHeight);
        context.drawImage(goal, maze.Goal.Col * cellWidth, maze.Goal.Row * cellHeight,
            cellWidth, cellHeight);
        return this;
    }


})(jQuery);function move(e) {
    
    var keyPressed;
    keyPressed = e.keyCode;
    if (window.event) {
        switch (keyPressed) {
            case 37:
                e.preventDefault();
                moveLeft();
                break;
            case 38:
                e.preventDefault();
                moveUp();
                break;
            case 39:
                e.preventDefault();
                moveRight();
                break;
            case 40:
                e.preventDefault();
                moveDown();
                break;
            default:
                break;
        }
        if ((currentPos.Row == mazeObject.Goal.Row) && (currentPos.Col == mazeObject.Goal.Col)) {
            alert("Tou Won!");
        }
    }
}

function moveLeft() {
    console.log(mazeObject);
    var requiredCell = mazeObject.Maze.charAt((currentPos.Row * cols) + currentPos.Col - 1);
    console.log(requiredCell);
    if (requiredCell === '0') {
        context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
        currentPos.Col = currentPos.Col - 1;
        context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
    }
}

function moveRight() {
    var requiredCell = mazeObject.Maze.charAt((currentPos.Row * cols) + currentPos.Col + 1);
    console.log(requiredCell);
    if (requiredCell === '0') {
        context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
        currentPos.Col = currentPos.Col + 1;
        context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
    }
}

function moveUp() {
    var requiredCell = mazeObject.Maze.charAt(((currentPos.Row - 1) * cols) + currentPos.Col);
    console.log(requiredCell);
    if (requiredCell === '0') {
        context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
        currentPos.Row = currentPos.Row - 1;
        context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
    }
}

function moveDown() {
    var requiredCell = mazeObject.Maze.charAt(((currentPos.Row + 1) * cols) + currentPos.Col);
    console.log(requiredCell);
    if (requiredCell === '0') {
        context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
        currentPos.Row = currentPos.Row + 1;
        context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
            cellWidth, cellHeight);
    }
}