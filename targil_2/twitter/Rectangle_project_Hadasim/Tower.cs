using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rectangle_project_Hadasim
{
    public abstract class Tower
    {
        public int Width { get; set; }
        public int Height { get; set; }

        public Tower(int width, int height)
        {
            Width = width;
            Height = height;
        }

        public abstract void CalcPerimeter();
    }
}
