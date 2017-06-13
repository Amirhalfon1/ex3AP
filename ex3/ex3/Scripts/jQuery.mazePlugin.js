(function ($) {
    $.fn.mazePlugin = function (maze) {
        console.log(maze);
        var myCanvas = document.getElementById("mazeCanvas");
        var offset = -1;
        var context = mazeCanvas.getContext("2d"); 
        var rows = maze.Rows;
        var cols = maze.Cols;
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (maze.Maze.charAt(++offset) == 1) {
                    context.fillRect(cellWidth * j, cellHeight * i,
                                    cellWidth, cellHeight);
                }
                
            }
        }
        return this;
    }

})(jQuery);