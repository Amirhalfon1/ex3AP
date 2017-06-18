using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MazeLib;
using ex3.Models;
using Newtonsoft.Json.Linq;

namespace ex3.Controllers
{
    public class SinglePlayerMazeController : ApiController
    {
        //SinglePlayerMazeManager spMazeManager = new SinglePlayerMazeManager();
        SinglePlayerMazeManager spMazeManager = SinglePlayerMazeManager.GetInstance();

        //// GET: api/SinglePlayerMaze
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/SinglePlayerMaze/5
        [HttpGet]
        [Route("api/SinglePlayerMaze/{name}/{rows}/{cols}")]
        public JObject GenerateMaze(string name, int rows , int cols)
        {
            //Maze mazeToRet = spMazeManager.GenerateMaze(name, rows, cols);
            // return mazeToRet;
            Maze maze = Maze.FromJSON(spMazeManager.GenerateMaze(name, rows, cols));
            JObject obj = JObject.Parse(maze.ToJSON());
            return obj;
        }

        [HttpGet]
        [Route("api/SinglePlayerMaze/Solve/{name}/{algorithm}")]
        public JObject Solve(string name, int algorithm)
        {
            //model.GenerateMaze(name, 12, 12);
            string solution = spMazeManager.SolveMaze(name, algorithm);
            JObject obj = JObject.Parse(solution);
            return obj;
        }



        //// PUT: api/SinglePlayerMaze/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/SinglePlayerMaze/5
        //public void Delete(int id)
        //{
        //}
    }
}
