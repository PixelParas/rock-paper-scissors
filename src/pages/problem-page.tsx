import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockMath, InlineMath } from "react-katex";

const ProblemPage = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-6 h-screen">
      {/* Left Column (80%) */}
      <div className="col-span-4 flex flex-col gap-4">
        {/* Problem Card */}
        <Card>
          <CardHeader>
            <CardTitle>Problem Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCANrMO54saVeRfFy8Vbu3cg1cRShi7yFMQ&s"
                alt="Asker Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <p className="text-sm text-gray-500">Asked by: __.Sanikaaa.__</p>
            </div>
            <p className="text-gray-700">
              Solve for <InlineMath math="x" />:  
            </p>
            <BlockMath math="2x + 5 = 15" />
          </CardContent>
        </Card>

        {/* Solution Card */}
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://raw.githubusercontent.com/laynH/Anime-Girls-Holding-Programming-Books/master/C%2B%2B/Sakura_Nene_CPP.jpg"
                alt="Solver Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <p className="text-sm text-gray-500">Solution by: PixelParas</p>
            </div>
            <p className="text-gray-700">
              Subtract <InlineMath math="5" /> from both sides:
            </p>
            <BlockMath math="2x = 10" />
            <p className="text-gray-700">Now divide by 2:</p>
            <BlockMath math="x = 5" />
          </CardContent>
        </Card>
      </div>

      {/* Right Column (20%) */}
      <div className="col-span-1 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Similar Problems</h2>
        <Button variant="outline">
          Solve for <InlineMath math="y" />: <BlockMath math="3y + 7 = 22" />
        </Button>
        <Button variant="outline">
          Find <InlineMath math="x" />: <BlockMath math="5x - 2 = 18" />
        </Button>
        <Button variant="outline">
          Equation: <BlockMath math="4z + 10 = 30" />
        </Button>
      </div>
    </div>
  );
};

export default ProblemPage;
