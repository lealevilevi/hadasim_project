using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rectangle_project_Hadasim
{
    public class TriangleTower:Tower
    {
        public TriangleTower(int width, int height) : base(width, height) { }
        public override void CalcPerimeter()
        {
            double side=Math.Sqrt(Math.Pow(Height,2)+Math.Pow(Width/2,2)); 
            Console.WriteLine($"the perimeter of the triangle is:{Width+side*2}");
        }
        public void Draw()
        {
            if(Width%2==0||Width>Height*2)
            {
                Console.WriteLine("we cannot draw the rectangle please try again");
                return;
            }
            if(Width%2==1&&Width<=Height*2)
            {
                int count = 3;
                int helpcounter = 1;
                int countDifferent = (Width - 2) / 2;
                int countDifferentRow = 0;
                int rest = 0;
                if (countDifferent != 0)
                {
                    countDifferentRow = (Height - 2) / countDifferent;
                    rest = (Height - 2) % countDifferent;
                }
                Console.WriteLine("countRow: " + countDifferent+"  "+ " countNum :" + countDifferentRow+ " rest : " + rest);
                string row = "";
                if (Width == 1)
                {
                    for (int i = 0; i < Height;i++)
                    {
                        row += "*" + "\n";

                    }
                    Console.WriteLine(row);
                    return;
                }
                for (int k = 0; k < ((Width - count + 2) / 2) + 1; k++)
                {
                    row += " ";
                }
                if (Width==3)
                {
                    count = 1;
                    countDifferentRow = Height-2;

                }
                row += "*" + "\n";
                for (int i = 0; i < Height-1; i++)
                {
                    for(int k=0;k< (Width-count+2)/2;k++)
                    {
                        row += " ";
                    }
                    for (int j=0;j<count;j++)
                    {
                        row += "*";
                    }
                    row += "\n";
                    if (count == 3)
                    {
                        if(helpcounter==countDifferentRow+rest)
                        {
                            count += 2;
                            helpcounter = 0;
                        }
                    }
                    else
                    {
                        if(helpcounter==countDifferentRow)
                        {
                            count += 2;
                            helpcounter = 0;
                        }
                  
                    }
                        helpcounter++;
 

                }
                Console.WriteLine(row);
            }

        }
    }
}
