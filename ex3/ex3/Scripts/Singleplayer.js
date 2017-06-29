


var maze;
var myMazeBoard;

$("#startBtn").on("click", function () {
    if (singleGameValidation()) {

        if (localStorage.getItem("mazeRows") != null) {
            $('#rows').val(localStorage.getItem("mazeRows"));
        }
        if (localStorage.getItem("mazeCols") != null) {
            $('#cols').val(localStorage.getItem("mazeCols"));
        }
        if (localStorage.getItem("mazeAlg") != null) {
            $('#algoSelect').val(localStorage.getItem("mazeAlg"));
        }

        var trackMoves = function (direction, oldRow, oldCol) {
            if (direction == "won") {
                alert("You Won!");
                $('.showWhenReady').fadeOut("slow", function () { });
                $('#solveBtn').attr('disabled', 'disabled');
            }
        };

        $('.showWhenWait').fadeIn("slow", function () { });
        var name = $('#mazeName').val();
        var rows = $('#rows').val();
        var cols = $('#cols').val();
        url = "../api/SinglePlayerMaze/" + name + "/" + rows + "/" + cols;
        $.getJSON(url).done(function (mazeFeedback) {
            //$('.showWhenWait').fadeOut("fast", function () { });
            $('.showWhenWait').hide();

            $('#solveBtn').removeAttr('disabled');
            //document.getElementById("solveBtn").setAttribute('enabled', 'enabled');
            maze = { "Name": mazeFeedback.Name, "Maze": mazeFeedback.Maze, "Rows": mazeFeedback.Rows, "Cols": mazeFeedback.Cols, "Start": mazeFeedback.Start, "Goal": mazeFeedback.End }
            //$('#bla').append(mazeFeedback.Maze);
            document.title = mazeFeedback.Name;
            playerImage = document.getElementById("playerImage");
            exitImage = document.getElementById("goalImage");
            myMazeBoard = $('#mazeCanvas').mazePlugin(maze, playerImage, exitImage, true, trackMoves);
            $('.showWhenReady').fadeIn("slow", function () { });
        }).fail(function (jqXHR, textStatus, err) {
            alert('error ');
        });
    }

});

$("#solveBtn").on("click", function () {
    var name = maze.Name;
    var algo = $('#algoSelect').val();
    url = "../api/SinglePlayerMaze/Solve/" + name + "/" + algo;
    $.getJSON(url).done(function (solveFeedback) {
        //console.log(solveFeedback["Solution"]);
        solution = { "Solution": solveFeedback["Solution"] };
        myMazeBoard.solveMaze(solution);
        //$('#mazeCanvas').solveMaze(solution);

    }).fail(function (jqXHR, textStatus, err) {
        alert('error ');
    });

});

