import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockMath, InlineMath } from "react-katex";

const problems = [
  {
    id: 1,
    title: "Solve for x",
    equation: "2x + 5 = 15",
    asker: "__.Sanikaaa.__",
  },
  {
    id: 2,
    title: "Solve for y",
    equation: "3y + 7 = 22",
    asker: "MathLover123",
  },
  {
    id: 3,
    title: "Find z",
    equation: "4z + 10 = 30",
    asker: "AlgebraFan",
  },
];

const ProblemsPage = () => {
  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {problems.map((problem) => (
        <Card key={problem.id}>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">{problem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-xs sm:text-sm text-gray-500">Asked by: {problem.asker}</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">
              Solve for <InlineMath math={problem.title.split(" ")[2]} />:
            </p>
            <BlockMath math={problem.equation} />
            <Button variant="outline" className="mt-4 text-xs sm:text-sm">
              View Problem
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProblemsPage;
