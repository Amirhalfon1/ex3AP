using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using MazeLib;

namespace MazeModel
{
    public interface IModel
    {
        Maze GenerateMaze(string name, int rows, int cols);
        Game StartGame(string name, int rows, int cols, TcpClient firstPlayer);
        string Join(string gameName, System.Net.Sockets.TcpClient otherPlayer);
        string Play(string direction, TcpClient otherPlayer);
        void Close(TcpClient firstPlayer, TcpClient secondPlayer);
        string[] GetListOfGames();
        string Solve(string name, int algo);

    }
}
