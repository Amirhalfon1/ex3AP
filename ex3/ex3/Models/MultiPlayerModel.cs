using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MazeModel;
using MazeLib;
using Newtonsoft.Json;

namespace ex3.Models
{

    public class MultiPlayerModel
    {
        private static MultiPlayerModel singleInstance = null;
        IModel model;

        private MultiPlayerModel()
        {
            model = new MazeModel.MazeModel();
        }
        public static MultiPlayerModel GetInstance()
        {

            if (singleInstance == null)
            {
                singleInstance = new MultiPlayerModel();
            }
            return singleInstance;
        }
        public String Start(string name, int rows, int cols, string clientID)
        {
            Maze maze =  model.StartGame(name, rows, cols, clientID);
            return maze.ToJSON();
        }
        public String Join(string gameName, string joinsID)
        {
            Maze maze = model.Join(gameName, joinsID);
            return maze.ToJSON();
        }
        public String GetOtherPlayerID(string clientID)
        {
            return model.GetOtherPlayerClient(clientID);
        }

        public string[] GetListOfGames()
        {
            return model.GetListOfGames();
        }

    }
}