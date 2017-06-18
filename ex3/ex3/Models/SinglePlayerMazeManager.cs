using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MazeGeneratorLib;
using MazeLib;
using SearchAlgorithmsLib;
using MazeModel;

namespace ex3.Models
{
    public class SinglePlayerMazeManager
    {
        private static SinglePlayerMazeManager singleInstance = null;
        IModel model;



        private SinglePlayerMazeManager()
        {
            model = new MazeModel.MazeModel();
        }

        public static SinglePlayerMazeManager GetInstance()
        {
            if (singleInstance == null)
            {
                singleInstance = new SinglePlayerMazeManager();
            }
            return singleInstance;
        }

        /// <summary>
        /// Generates the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns>maze</returns>
        public string GenerateMaze(string name, int rows, int cols)
        {
            Maze maze = model.GenerateMaze(name, rows, cols);
            return maze.ToJSON();
        }


        /// <summary>
        /// Solves the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="algo">The algo.</param>
        /// <returns>the solution by the desired algo</returns>
        public string SolveMaze(string name, int algorithm)
        {
            return model.Solve(name, algorithm);
        }

    }
}