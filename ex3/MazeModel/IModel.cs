using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using MazeLib;
using Newtonsoft.Json.Linq;

namespace MazeModel
{
    public interface IModel
    {
        Maze GenerateMaze(string name, int rows, int cols);
        Maze StartGame(string name, int rows, int cols, string firstPlayerID);
        Maze Join(string gameName, string joinsID);
        string Play(string direction, string otherPlayerID);
        string GetOtherPlayerClient(string clientID);
        void Close(string firstPlayerID, string secondPlayerID);
        string[] GetListOfGames();
        string Solve(string name, int algo);

    }
}
