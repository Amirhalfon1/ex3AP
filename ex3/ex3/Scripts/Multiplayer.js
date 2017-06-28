        //The id of the interval to kill when pressing on start
        var intervalId;

        if (localStorage.getItem("mazeRows") != null) {
                $('#rows').val(localStorage.getItem("mazeRows"));
            }
        if (localStorage.getItem("mazeCols") != null) {
                $('#cols').val(localStorage.getItem("mazeCols"));
            }

        var myMazeBoard, otherMazeBoard;
        var multiPlayer = $.connection.mazeHub;

        var notifyOtherFunc = function (direction, oldRow, oldCol) {
                //direction == "won" Im the winner
            if (direction == "won") {
                multiPlayer.server.play(direction, oldRow, oldCol);
                var name = sessionStorage.Name;
                var apiUrl = "../api/UserDetailsModels/RealGet";
                $.get(apiUrl, { userName: name }).done(function (data) {
                    data.Wins++;
                    apiUrl = "../api/UserDetailsModels/UpdateWon/" + name;
                    $.get(apiUrl).done(function () {
                        alert("You Won!");
                       // window.location.replace("HomePage.html");
                    });
                });
            } else {
                multiPlayer.server.play(direction, oldRow, oldCol);
            }

        }
        // Create a function that the hub can call to broadcast messages
        multiPlayer.client.drawMazes = function (mazeFeedback) {
                $('.waitingImages').fadeOut("slow", function () {
                    $('.showWithConnection').fadeIn("slow", function () { });
                });
            //$('.titleOfPage').empty();
            //$('.titleOfPage').append(mazeFeedback.Name);
            document.title = mazeFeedback.Name;
            //$('.waitingImages').hide();

            //alert('Starting to draw the mazes');
            maze = {"Name": mazeFeedback.Name, "Maze": mazeFeedback.Maze, "Rows": mazeFeedback.Rows, "Cols": mazeFeedback.Cols, "Start": mazeFeedback.Start, "Goal": mazeFeedback.End }
            playerImage = document.getElementById("playerImage");
            exitImage = document.getElementById("goalImage");
            this.otherMazeBoard = $('#otherCanvas').mazePlugin(maze, playerImage, exitImage, false);
            this.myMazeBoard = $('#playerCanvas').mazePlugin(maze, playerImage, exitImage, true, notifyOtherFunc);


        };

        multiPlayer.client.otherMoving = function (direction,oldRow,oldCol) {
            //this.otherMazeBoard.moveByString(direction);
            console.log(direction);
            //Direction == "won" -> other won
            //if (direction == "won") {
                //var name = sessionStorage.Name;
                //var apiUrl = "../api/UserDetailsModels/RealGet";
                //$.get(apiUrl, { userName: name }).done(function (data) {
                //    data.Loses++;
                //    apiUrl = "../api/UserDetailsModels/UpdateLost/" + name;
                //    $.get(apiUrl).done(function () {
                //        alert("You Lost!");
                //       // window.location.replace("HomePage.html");
                //    });
                //});
            //} else {
                this.otherMazeBoard.moveOther(direction, oldRow, oldCol);
            //}

                
        };

        multiPlayer.client.otherWon = function () {
            var name = sessionStorage.Name;
            var apiUrl = "../api/UserDetailsModels/RealGet";
            $.get(apiUrl, { userName: name }).done(function (data) {
                data.Loses++;
                apiUrl = "../api/UserDetailsModels/UpdateLost/" + name;
                $.get(apiUrl).done(function () {
                    alert("You Lost!");
                    // window.location.replace("HomePage.html");
                });
            });
        };

        // Start the connection
        $.connection.hub.start().done(function () {

                $('#btnStart').click(function () {

                    //Cancelling the games list refreshing.
                    clearInterval(intervalId);
                    //$('.showWithConnection').fadeOut("slow", function () { });
                    $('.waitingImages').fadeIn("slow", function () { });
                    var gameName = $('#name').val();
                    var mazeRows = $('#rows').val();
                    var mazeCols = $('#cols').val();

                    // Call the Send method on the hub
                    multiPlayer.server.start(gameName, mazeRows, mazeCols);

                    //Show something that indicate we are waiting to other player...
                });


            intervalId = setInterval(function () {


                multiPlayer.server.list().done(function (result) {
                    if (result) {
                        if (result.length != $('#gamesSelect').children('option').length) {
                            $('#gamesSelect').empty();
                            $.each(result, function (i, item) {
                                $('#gamesSelect').append($('<option>', {
                                    value: item,
                                    text: item
                                }));
                            });
                        }
                    }
                });
            }, 1000);


            $('#btnJoin').click(function () {
                //$('.showWithConnection').fadeOut("slow", function () { });
                $('.waitingImages').show();
            var gameName = $('#gamesSelect').val();
                // Call the Send method on the hub
                multiPlayer.server.join(gameName);

                //Show something that indicate we are waiting to other player...
            });

            // Call the Send method on the hub
            multiPlayer.server.list().done(function (result) {
                if (result) {

                $.each(result, function (i, item) {
                    $('#gamesSelect').append($('<option>', {
                        value: item,
                        text: item
                    }));
                });

            }
            });


        });



