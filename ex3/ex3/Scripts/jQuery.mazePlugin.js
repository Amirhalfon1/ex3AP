
(function ($) {

    var myCanvas = document.getElementById("mazeCanvas");
    var player = document.getElementById("playerImage");
    var goal = document.getElementById("goalImage");
    var context = mazeCanvas.getContext("2d");
    var mazeObject;
    var currentPos;
    var cellWidth, cellHeight;
    var rows, cols;

    var moveLeft = function () {
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
    };
    var moveRight = function () {
        var requiredCell = mazeObject.Maze.charAt((currentPos.Row * cols) + currentPos.Col + 1);
        console.log(requiredCell);
        if (requiredCell === '0') {
            context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
            currentPos.Col = currentPos.Col + 1;
            context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
        }
    };
    var moveUp = function () {
        var requiredCell = mazeObject.Maze.charAt(((currentPos.Row - 1) * cols) + currentPos.Col);
        console.log(requiredCell);
        if (requiredCell === '0') {
            context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
            currentPos.Row = currentPos.Row - 1;
            context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
        }
    };
    var moveDown = function () {
        var requiredCell = mazeObject.Maze.charAt(((currentPos.Row + 1) * cols) + currentPos.Col);
        console.log(requiredCell);
        if (requiredCell === '0') {
            context.clearRect(currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
            currentPos.Row = currentPos.Row + 1;
            context.drawImage(player, currentPos.Col * cellWidth, currentPos.Row * cellHeight,
                cellWidth, cellHeight);
        }
    };
    //function to invoke after each move
    var movePlayer = function move(e) {
        var directionKey = false;
        var keyPressed;
        keyPressed = e.keyCode;
        if (window.event) {
            switch (keyPressed) {
                case 37:
                    directionKey = true;
                    e.preventDefault();
                    moveLeft();
                    break;
                case 38:
                    directionKey = true;
                    e.preventDefault();
                    moveUp();
                    break;
                case 39:
                    directionKey = true;
                    e.preventDefault();
                    moveRight();
                    break;
                case 40:
                    directionKey = true;
                    e.preventDefault();
                    moveDown();
                    break;
                default:
                    break;
            }
            if (directionKey) {
                if ((currentPos.Row == mazeObject.Goal.Row) && (currentPos.Col == mazeObject.Goal.Col)) {
                    $("body").off("keydown", movePlayer);
                    alert("You Won!");
                }
            }
        }
    }



    
    $.fn.mazePlugin = function (maze, canMove) {
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
        if (canMove) {
            $("body").keydown(movePlayer);
        }
        return this;
    }


    $.fn.solveMaze = function (solution) {
        //Turning off the function occured when key event.
        $("body").off("keydown", movePlayer);
        currentPos.Row = mazeObject.Start.Row;
        currentPos.Col = mazeObject.Start.Col;
        var frameActivator = window.setInterval(frame, 600);
        var i = 0;
        function frame() {

             if(i < solution.Solution.length){
                switch (solution.Solution.charAt(i)) {
                    //left
                    case '0':
                        moveLeft();
                        break;

                    //right
                    case '1':
                        moveRight();
                        break;

                    //up
                    case '2':
                        moveUp();
                        break;

                    //down
                    case '3':
                        moveDown();
                        break;
                 }
                i++;
            }
             if (i == solution.Solution.length) {
                 alert("Solve finished !");
                 clearInterval(frameActivator);
             }
            
        }

        return this;
    }


})(jQuery);

