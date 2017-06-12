using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MazeGeneratorLib;
using MazeLib;

namespace ex3.Models
{
    public class SinglePlayerMazeManager
    {
        DFSMazeGenerator mazeGenerator;
        private Dictionary<string, Maze> singleplayerMazesDictionary;

        public SinglePlayerMazeManager()
        {
            singleplayerMazesDictionary = new Dictionary<string, Maze>();
            mazeGenerator = new DFSMazeGenerator();
        }
        /// <summary>
        /// Generates the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns>maze</returns>
        public Maze GenerateMaze(string name, int rows, int cols)
        {
            Maze maze = mazeGenerator.Generate(rows, cols);
            maze.Name = name;
            singleplayerMazesDictionary.Add(name , maze);
            return maze;
        }

        public Dictionary<string, Maze> GetMazes()
        {
            Maze maze = new Maze(10, 10);
            maze.Name = "BLABLABLA";
            singleplayerMazesDictionary.Add("MazeNAMEEE", maze);
            return singleplayerMazesDictionary;
        }
    }
}