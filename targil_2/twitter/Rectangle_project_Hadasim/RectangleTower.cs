using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rectangle_project_Hadasim
{
    public class RectangleTower:Tower
    {
        public RectangleTower(int width, int height) : base(width, height) { }

       
        public override void CalcPerimeter()
        {
            Console.WriteLine($"the perimeter of the rectangle is: {this.Height*2+this.Width*2}");
        }
        public void CalcArea()
        {
            Console.WriteLine( $"the area of the rectangle is:{Width*Height}");
        }

    }
}
