
(function ($) {


    $.fn.mazePlugin = function (maze, playerImage, exitImage, canMove, notifyOtherPlayer) {
        var myCanvas;
        this.canMove = canMove;
        var player;
        var goal;
        var context;
        var mazeObject;

        var cellWidth, cellHeight;
        var rows, cols;
        var notifyOther = notifyOtherPlayer;

        player = playerImage;
        goal = exitImage;
        myCanvas = this[0];
        context = myCanvas.getContext("2d");
        var offset = -1;
        rows = maze.Rows;
        cols = maze.Cols;
        cellWidth = myCanvas.width / cols;
        cellHeight = myCanvas.height / rows;
        //Deep copy of start (backup of start cause it will change)
        var startBackup = jQuery.extend(true, {}, maze.Start);
        myCanvas.currentPos = maze.Start;
        mazeObject = maze;

        var moveLeft = function (oldRow,oldCol) {
            if ((oldRow != null) && (oldCol != null)) {
                context.clearRect(oldCol * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
                context.drawImage(player, (oldCol - 1) * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
            } else {
                //console.log(mazeObject);
                var requiredCell = mazeObject.Maze.charAt((myCanvas.currentPos.Row * cols) + myCanvas.currentPos.Col - 1);
                if ((requiredCell === '0') && ((myCanvas.currentPos.Col - 1) >= 0)) {
                    context.clearRect(myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    myCanvas.currentPos.Col = myCanvas.currentPos.Col - 1;
                    context.drawImage(player, myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    if (notifyOther != null) {
                        notifyOther("left", myCanvas.currentPos.Row, myCanvas.currentPos.Col + 1);
                    }
                }
            }

        };
        var moveRight = function (oldRow, oldCol) {
            if ((oldRow != null) && (oldCol != null)) {
                context.clearRect(oldCol * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
                context.drawImage(player, (oldCol+1) * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
            } else {
                var requiredCell = mazeObject.Maze.charAt((myCanvas.currentPos.Row * cols) + myCanvas.currentPos.Col + 1);
                if ((requiredCell === '0') && ((myCanvas.currentPos.Col + 1) < cols)) {
                    context.clearRect(myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    myCanvas.currentPos.Col = myCanvas.currentPos.Col + 1;
                    context.drawImage(player, myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    if (notifyOther != null) {
                        notifyOther("right", myCanvas.currentPos.Row, myCanvas.currentPos.Col - 1);
                    }
                }
            }

        };
        var moveUp = function (oldRow,oldCol) {
            if ((oldRow != null) && (oldCol != null)) {
                context.clearRect(oldCol * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
                context.drawImage(player, oldCol * cellWidth, (oldRow - 1) * cellHeight,
                    cellWidth, cellHeight);
            } else {
                var requiredCell = mazeObject.Maze.charAt(((myCanvas.currentPos.Row - 1) * cols) + myCanvas.currentPos.Col);
                if ((requiredCell === '0') && ((myCanvas.currentPos.Row - 1) >= 0)) {
                    context.clearRect(myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    myCanvas.currentPos.Row = myCanvas.currentPos.Row - 1;
                    context.drawImage(player, myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    if (notifyOther != null) {
                        notifyOther("up", myCanvas.currentPos.Row + 1, myCanvas.currentPos.Col);
                    }
                }
            }

        };
        var moveDown = function (oldRow,oldCol) {

            if ((oldRow != null) && (oldCol != null)) {
                context.clearRect(oldCol * cellWidth, oldRow * cellHeight,
                    cellWidth, cellHeight);
                context.drawImage(player, oldCol * cellWidth, (oldRow+1) * cellHeight,
                    cellWidth, cellHeight);
            } else {
                var requiredCell = mazeObject.Maze.charAt(((myCanvas.currentPos.Row + 1) * cols) + myCanvas.currentPos.Col);
                if ((requiredCell === '0') && ((myCanvas.currentPos.Row + 1) < rows)) {
                    context.clearRect(myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    myCanvas.currentPos.Row = myCanvas.currentPos.Row + 1;
                    context.drawImage(player, myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                        cellWidth, cellHeight);
                    if (notifyOther != null) {
                        notifyOther("down", myCanvas.currentPos.Row - 1, myCanvas.currentPos.Col);
                    }
                }
            }
        };

        if (notifyOtherPlayer != null) {

            this.notifyOther = notifyOtherPlayer;
        }

        //clear the old one
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);

        //context.strokeRect(0, 0, myCanvas.height, myCanvas.width);
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

        //function to invoke after each move
        this.movePlayer = function move(e) {
            var directionKey = false;
            var keyPressed;
            e.stopPropagation();
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
                    if ((myCanvas.currentPos.Row == mazeObject.Goal.Row) && (myCanvas.currentPos.Col == mazeObject.Goal.Col)) {
                        $("body").off("keydown", this.movePlayer);
                        if (notifyOther != null) {
                            notifyOther("won", 0, 0);
                        }
                        //alert("You Won!");
                    }
                }
            }
        }
        if (this.canMove) {
            $("body").keydown(this.movePlayer);
        }

        this.moveOther = function (direction,oldRow,oldCol) {
            switch (direction) {
                case "up":
                    moveUp(oldRow, oldCol);
                    break;
                case "down":
                    moveDown(oldRow, oldCol);
                    break;
                case "left":
                    moveLeft(oldRow, oldCol);
                    break;
                case "right":
                    moveRight(oldRow, oldCol);
                    break;
                case "won":
                    //alert("You Lost!");
                    break;
                default:
                    break;
            }

        }


        this.solveMaze = function (solution) {
            //Turning off the function occured when key event.
            $("body").off("keydown", this.movePlayer);
            context.clearRect(myCanvas.currentPos.Col * cellWidth, myCanvas.currentPos.Row * cellHeight,
                cellWidth, cellHeight);
            myCanvas.currentPos.Row = startBackup.Row;
            myCanvas.currentPos.Col = startBackup.Col;
            var frameActivator = window.setInterval(frame, 450);
            var i = 0;
            function frame() {

                if (i < solution.Solution.length) {
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
        }
        return this;
    }



})(jQuery);

