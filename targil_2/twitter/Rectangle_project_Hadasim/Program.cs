namespace Rectangle_project_Hadasim
{
    public class Program
    {
        private static int Initilaize(string s)
        {
            int ans = 0;
            do
            {
                Console.WriteLine(s);
                int.TryParse(Console.ReadLine(), out ans);
                if (ans == 0)
                {
                    Console.WriteLine("the value is not valid please try again");
                }
            } while (ans==0);
            return ans;
        }
        static void Main(string [] args)
        {
            Console.WriteLine("Hello, World!");
            //TriangleTower t = new TriangleTower(5,4);
            //t.Draw();
            string s1 = "please enter an height";
            string s2 = "please enter an width";
            string str3 = "Select an option:\n enter 1 to calcPerimeter\n enter 2 to draw the triangle";
            string s4 = "Select an option:\n 1. A rectangular tower\n 2.  A triangle tower\n 3. exit";
            int option;
            do
            {
                int width, height;
             
                option = Initilaize(s4);
                switch (option)
                {
                    case 1:
                        height=Initilaize(s1);
                        width=Initilaize(s2);
                        RectangleTower r=new RectangleTower(width, height);
                        if(Math.Abs(r.Height-r.Width)>5||r.Height==r.Width)
                        {
                            r.CalcArea();   
                        }
                        else
                        {
                            r.CalcPerimeter();
                        }
                        break;
                    case 2:
                        height = Initilaize(s1);
                        width = Initilaize(s2);
                        TriangleTower t=new TriangleTower(width,height);
                        int op2;
                        op2=Initilaize(str3);
                        switch(op2)
                        {
                            case 1:
                                t.CalcPerimeter();
                                break;
                            case 2:
                                t.Draw();
                                break;
                        }
                        break;
                    case 3:
                        Console.WriteLine("exit");
                        break;
                    default:
                        Console.WriteLine("not valid option please try again");
                        break;
                }
            } while (option != 3);
        }
    }
}