using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MazeLib;
using ex3.Models;

namespace ex3.Controllers
{
    public class SinglePlayerMazeController : ApiController
    {
        SinglePlayerMazeManager spMazeManager = new SinglePlayerMazeManager();

        //// GET: api/SinglePlayerMaze
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/SinglePlayerMaze/5
        [HttpGet]
        public Maze GenerateMaze(string name, int rows , int cols)
        {
           Maze mazeToRet = spMazeManager.GenerateMaze(name, rows, cols);
            return mazeToRet;
        }

        // POST: api/SinglePlayerMaze
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SinglePlayerMaze/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SinglePlayerMaze/5
        public void Delete(int id)
        {
        }
    }
}
