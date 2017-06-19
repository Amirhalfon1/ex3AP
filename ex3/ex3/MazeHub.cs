using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using MazeModel;
using ex3.Models;
using MazeLib;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace ex3
{
    public class MazeHub : Hub
    {
        

        public JObject Start(string gameName, int rows , int cols)
        {
            //Clients.All.hello();
            MultiPlayerModel model = MultiPlayerModel.GetInstance();
            string clientID = Context.ConnectionId;
            string mazeAsString = model.Start(gameName, rows, cols, clientID);
            Maze maze = Maze.FromJSON(mazeAsString);
            JObject obj = JObject.Parse(maze.ToJSON());
            return obj;
        }
        public JObject Join(string gameName)
        {
            MultiPlayerModel model = MultiPlayerModel.GetInstance();
            string clientID = Context.ConnectionId;
            string mazeAsString = model.Join(gameName, clientID);
            Maze maze = Maze.FromJSON(mazeAsString);
            string otherPlayerID = model.GetOtherPlayerID(clientID);

            JObject obj = JObject.Parse(maze.ToJSON());

            //TODO: Call to function to draw the mazes on other player client(by notify to otherPlayerID ).
            Clients.Client(clientID).drawMazes(obj);
            Clients.Client(otherPlayerID).drawMazes(obj);
            return obj;
        }
        public void Play(string direction)
        {
            MultiPlayerModel model = MultiPlayerModel.GetInstance();
            string clientID = Context.ConnectionId;
            string otherPlayerID = model.GetOtherPlayerID(clientID);
            //TODO: Call to function to draw this move on the other client canvas.
             Clients.Client(otherPlayerID).otherMoving(direction);
        }

        //TODOBOOM
        public void Close(string gameName)
        {

        }


        public string[] List()
        {
            MultiPlayerModel model = MultiPlayerModel.GetInstance();
            string[] gamesArray = model.GetListOfGames();
            return gamesArray;
            //JObject gamesArray = JObject.Parse(gamesArrayJsonStr);
            //string[] gamesArray = JsonConvert.DeserializeObject<string[]>(gamesArrayJsonStr);
            //return gamesArray;

        }

    }
}